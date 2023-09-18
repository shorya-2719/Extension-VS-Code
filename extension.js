// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path')
const fs = require('fs')
const { activate: customViewActivate } = require('./customView');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	let disposable = vscode.commands.registerCommand('fetch-file-name-and-map.myCommand', function () {
		//Get the base name of active file
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
		
		if (vscode.window.activeTextEditor) {
			currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		}

		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) {
				currentlyOpenTabfilePath = editor.document.fileName;
				currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath)
				// You can also update currentlyOpenTabfileName here if needed
			}
		});

		let i = vscode.window.createOutputChannel("Orange");
		const jsonFilePath = './cluster.json'; 
		i.appendLine("We are here in the func");
		let currString = "";

		const data = fs.readFileSync(jsonFilePath, 'utf8');
			currString = "";
			i.appendLine("No error");
			let jsonData = JSON.parse(data);
			console.log(jsonData); // This is the JSON data
			// Convert jsonData to a key-value pair string
			for (let key in jsonData[currentlyOpenTabfileName]){
				i.appendLine(jsonData[currentlyOpenTabfileName][key].toString());
				currString+= `<h2>${key}</h2>\n`;
				for(let s in jsonData[currentlyOpenTabfileName][key]){
					currString+=`<li>${jsonData[currentlyOpenTabfileName][key][s]}</li>\n`;
				}
			}
			i.appendLine("Inside: read file " + currString);
			// return currString;
		i.appendLine("Type of data:" + typeof(currString))
		i.appendLine("Outside read file" + currString);
		
		const panel = vscode.window.createWebviewPanel(
			'mySidebarView',
			`Checklist for : ${currentlyOpenTabfileName}`,
			vscode.ViewColumn.Beside, // Position in the sidebar
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'webview'))
				]
			}
		);
	
		// Load your HTML content into the webview panel
		const htmlPath = vscode.Uri.file(
			path.join(context.extensionPath, 'webview', 'sidebar.html')
		);

		// i.appendLine(a);
		i.show();
		panel.webview.html = `<h1>Checklist for : ${currentlyOpenTabfileName}</h1>
		<hr>
		<h2>${currString}</h2>
		`;
	});
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
