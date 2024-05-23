
console.log("=== inside script ===");
function showAlert(){
    console.log("Show Alert was called",vscode);
    
    vscode.postMessage({
        command:"aicg.alert",
        text:"Hello from Webview View"
    });
}
function updateModel(model){
   
    console.log("model received",model);
    vscode.postMessage({
        command:"aicg.onModelChange",
        text:model
    });
}
function updatePrompt(text){
   
    console.log("model received",text);
    vscode.postMessage({
        command:"aicg.onPromptChange",
        text:text
    });
}