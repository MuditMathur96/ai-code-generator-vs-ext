import Ollama  from 'ollama';
import path from 'path';
import * as vscode from 'vscode';

const fileTypes:Record<string,string>={
    ".cs":"csharp",
    ".py":"python",
    ".html":"html",
    ".css":"css",
    ".js":"javascript",
    ".ts":"typescript",
    ".jsx":"reactjs",
    ".tsx":"reactjs/typescript",
    ".go":"golang",
    ".schema":"sql",
    ".tsconfig":"typescript",
    ".json":"JSON"
}


const generateCode= async(model:string,prompt:string)=>{

    //get current file name
    const currentFile = vscode.window.activeTextEditor;
    const fileName = currentFile?.document.fileName;
    if(!fileName){
        vscode.window.showErrorMessage("Please a open a file first!");
        return;
    }

    const extension = path.extname(fileName);
    const language = fileTypes[extension];
    if(!language){
        vscode.window.showErrorMessage(`Sorry the language(${extension}:${language}) is not supported yet!`);
        return;
    }



    //build system message
    const systemMessage =`You are a friendly AI that helps user write clean and efficient code.
    You must provide answer in code only and nothing else.
    You must not use code block formatting.
    You must answer in in ${language}.

    user prompt:
     `;


    //generate code
    const response = await Ollama.chat({
        model:model,
        messages:[{role:"system",content:systemMessage}
        ,{role:"user",content:prompt}
        ],stream:true
    },);

    for await(const chunk of response){

        vscode.window.activeTextEditor
    ?.insertSnippet(new vscode.SnippetString(chunk.message.content ));

}
await vscode.commands.executeCommand("editor.action.formatDocument");






}

export default generateCode;