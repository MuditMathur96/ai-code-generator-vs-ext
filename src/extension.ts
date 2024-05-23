import * as vscode from 'vscode';
import Ollama from 'ollama';
import generateCode from './code-generator';

export function activate(context: vscode.ExtensionContext) {

	
    // context.subscriptions.push(
    //     vscode.commands.registerCommand('aicg.selectModel', async () => {
    //         const options = ['Model 1', 'Model 2', 'Model 3'];
    //         const selection = await vscode.window.showQuickPick(options, {
    //             placeHolder: 'Select a model'
    //         });
    //         if (selection) {
    //             vscode.window.showInformationMessage(`You selected: ${selection}`);
    //         }
    //     })
    // );

    // context.subscriptions.push(
    //     vscode.commands.registerCommand('aicg.openInputBox', async () => {
    //         const input = await vscode.window.showInputBox({
    //             placeHolder: 'Enter your input'
    //         });
    //         if (input) {
    //             vscode.window.showInformationMessage(`You entered: ${input}`);
    //         }
    //     })
    // );

	console.log("=== Inside activation file ===");
	
	context.subscriptions.push(vscode.commands.registerCommand("aicg.alert",()=>{
		vscode.window.showInformationMessage("User clicked the button");
	}));
	context.subscriptions.push(vscode.commands.registerCommand("aicg.start",async()=>{

		const panel = vscode.window.createWebviewPanel(
			'aiCoding',
			'AI Coding',
			vscode.ViewColumn.One,
			{}
		);

		panel.webview.html = getWebviewContent();



	}));

	
	console.log("=== Registering AICG view ===");
	const myViewProvider = new AICGViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(AICGViewProvider.viewType,myViewProvider)
	);

    
}


function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
  }



class AICGViewProvider implements vscode.WebviewViewProvider{

	public static readonly viewType = 'myView';
	private  model= "";
	private prompt ="";
	private waiting=false;
	//private _view:vscode.WebviewView;


	constructor(private readonly extensionUrl:vscode.Uri){}



	resolveWebviewView(webviewView: vscode.WebviewView,
		 context: vscode.WebviewViewResolveContext<unknown>,
		token: vscode.CancellationToken): void | Thenable<void> {

			//this._view = webviewView;
		
			console.log("=== Insider provider class ===");
			webviewView.webview.options={
				enableScripts:true,
				localResourceRoots:[this.extensionUrl]
			};

			webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
			webviewView.webview.onDidReceiveMessage(async(data)=>{
				console.log("received data",data);
				if(data.command === "aicg.alert"){
					
					if(this.waiting){
						vscode.window.showWarningMessage("Please wait for the code generation to complete");
						return;
					}
					this,this.waiting=true;
					// call model api
					await generateCode(this.model,this.prompt);
					this.waiting=false;

					
					
					
				}else if(data.command === "aicg.onModelChange"){
					this.model = data.text;
					vscode.window.showInformationMessage("Selected Model: "+this.model);
				
				}else if(data.command === "aicg.onPromptChange"){
					this.prompt = data.text;
					//vscode.window.showInformationMessage("Current Prompt: "+this.prompt);
				}

			});
	
		}

	getHtmlForWebview(webview:vscode.Webview){
		
		const styleUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionUrl,'media','style.css')
		);

		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionUrl,'media','script.js')
		);

		return `<!DOCTYPE html>
			<html lang='eng'>

			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="${styleUri}"  />
				<script src="${scriptUri}" ></script>
				<script>
				var vscode = acquireVsCodeApi();
				</script>
				
				
				
			</head>

			<body>
			
				<div
				class ="container"
				>
				
					<select
					class="vscode-select"
					onChange="updateAgent(this.value)"
					>
					<option value="none">Select a provider</option>
						<option value="openai" disabled>Open AI</option>
						<option value="ollama">Ollama</option>
					</select>
					
					<select
					class="vscode-select"
					onChange="updateModel(this.value)"
					>
					<option value="none">Select a model</option>
						<option value="phi3">Phi 3 mini</option>
						<option value="mistral">Mistral</option>
					</select>
					
					<textarea 
					class="vscode-input"
					onChange="updatePrompt(this.value)"
					placeholder="Enter your prompt here"
					></textarea>
					
					<button id="click" onclick="showAlert()">Click me</button>
				</div>


			

			
			</body>
			
			
			</html>
		
		
		</html>`;
	}
	
}


export function deactivate() {}
