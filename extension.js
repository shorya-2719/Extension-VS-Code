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
	
	const jsonFilePath = './example.json'; // Make sure to specify the correct file path

	let sampleString = ''
	let keys = []
	let currString = "";
	var map = new Map();
	fs.readFile(jsonFilePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error:', err);
			sampleString = err.toString();
			return;
		}
		let jsonData = JSON.parse(data);
		console.log(jsonData); // This is the JSON data
		// Convert jsonData to a key-value pair string
		for (let key in jsonData[currentlyOpenTabfileName]){
			currString+= `<h2>${key}</h2>\n`;
			for(let s in jsonData[currentlyOpenTabfileName][key]){
				currString+=`<li>${jsonData[currentlyOpenTabfileName][key][s]}</li>\n`;
			}
		}
	});
	// let strong = "<h2>Teri to bc</h2>";
	// let secstring = map.size;
	// for(let key in map){
	// 	currString+= `<h2>${key}</h2> + \n`;
	// 	for(let s in map.get(key)){
	// 		currString+=`<ul>${s}</ul> + \n`;
	// 	}
	// }

	console.log(sampleString)
	// customViewActivate(contxt);
	let disposable = vscode.commands.registerCommand('fetch-file-name-and-map.myCommand', function () {
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
	
		panel.webview.html = `<h1>Checklist for : ${currentlyOpenTabfileName}</h1>
		<h2>----------------------------------------------------------------------------------------</h2>
		<h2>${currString}</h2>
		`;
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
