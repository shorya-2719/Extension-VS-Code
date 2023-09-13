const vscode = require('vscode');

function activate(context) {
  // Register the custom view
  vscode.window.registerWebviewViewProvider(
    'yourExtension.customView',
    new CustomViewProvider()
  );
}

class CustomViewProvider {
  resolveWebviewView(webviewView) {
    // Set the HTML content for your custom view
    webviewView.webview.html = getWebViewContent();
  }
}

function getWebViewContent() {
  return `
    <html>
      <body>
        <h1>Hello, VS Code Extension!</h1>
        <p>This is your custom view's content.</p>
      </body>
    </html>
  `;
}

module.exports = {
  activate,
};
