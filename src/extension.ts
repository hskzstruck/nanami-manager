// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
class NanamiViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly extensionUri: vscode.Uri) {}

    resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
        };
		const imagePath = vscode.Uri.joinPath(this.extensionUri, 'media', 'nanami_chibi.png');
        const imageUri = webviewView.webview.asWebviewUri(imagePath);
        webviewView.webview.html = `
		<body style="display: flex; flex-direction: column; align-items: center; padding-top: 130px;">
		<img src="${imageUri}" width="180" style="transform: translateY(10px);"/>
			<div style="font-size: 14px; font-weight: 500"><p>.°<br>O</p>╭ ◜◝ ͡ ◜◝ ͡  ◜◝ ╮<br><span style="color:#BB4D6D">いつもそばにいるよ！</span><br>
			╰ ◟◞ ͜  ◟ ͜  ◞◟◞ ╯
			</div>
    	</body>
	`;
    }
}

export function activate(context: vscode.ExtensionContext) {

	console.log('The Nanami Manager extension is now active.');

	const provider = new NanamiViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('nanamiView', provider)
	);
	vscode.commands.executeCommand('nanamiView.focus');
}

// This method is called when your extension is deactivated
export function deactivate() {}
