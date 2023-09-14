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
	let keyValueString = '';
	const jsonFilePath = './example.json'; // Make sure to specify the correct file path
	fs.readFile(jsonFilePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error:', err);
			return;
		}
		let jsonData = JSON.parse(data);
		console.log(jsonData); // This is the JSON data

		// Convert jsonData to a key-value pair string
		for (let key in jsonData) {
			if (jsonData.hasOwnProperty(key)) {
				keyValueString += `${key}: ${jsonData[key]}\n`;
			}
		}
	});


	// customViewActivate(context);


	// CovertToMap(jsonData);
	// Map.get(currentlyOpenTabfileName);

	// console.log('Congratulations, your extension "fetch-file-name-and-map" is now active!');

	let disposable = vscode.commands.registerCommand('fetch-file-name-and-map.myCommand', function () {
		const panel = vscode.window.createWebviewPanel(
			'mySidebarView',
			'My Sidebar',
			vscode.ViewColumn.One, // Position in the sidebar
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
	
		panel.webview.html = `<h1>${keyValueString}</h1>
		<h2> There is someone here who can use your hep</h2>`;
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
