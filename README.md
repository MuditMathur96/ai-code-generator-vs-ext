# AI Code Generator Extension for Visual Studio Code

## Introduction

Welcome to the AI Code Generator Extension for Visual Studio Code! This project is a labor of passion, created to leverage the power of AI to assist developers in generating code efficiently and accurately.

## Demo
<img
src="https://res.cloudinary.com/muditdev/image/upload/v1716575262/gzi8dzxenoni23wenpud.gif"
alt="AI Code Generator Demo - Hello World"
 />

<img
src="https://res.cloudinary.com/muditdev/image/upload/v1716575258/qujdjbwyejkx4m86hhb0.gif"
alt="AI Code Generator Demo - Product Class"
 />
## Features

- AI-Powered Code Generation: Utilize cutting-edge AI models to generate code snippets, functions, and even entire classes based on your input.
- Model Support: Currently supports the Ollama platform, with plans to integrate OpenAI APIs in the near future.
- Supported Models:
    * Phi 3 Mini (~2GB)
    * Mistral 7b (~5GB) 
- Cross platform


## Installation & Setup


To get started with the AI Code Generator Extension, follow these steps:

1. ### . Install Ollama and Pull Models
    * For Phi 3 Mini:
    ```bash
        ollama pull phi-3-mini
    ```

    * For Mistral 7b:
    ```bash
        ollama pull mistral-7b
    ```
2. ### Download and Install the Extension
    Navigate to the master branch of this repository and download the latest .vsix file.

3. ### Install the Extension:

* Open Visual Studio Code.
* Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing Ctrl+Shift+X.
* Click on the ... (three dots) at the top-right corner of the Extensions view, then choose Install from VSIX....
* Browse to the downloaded .vsix file and select it to install.




    



## Future Plans

While the current version supports the Ollama platform, I am actively working on integrating support for OpenAI APIs to enhance the functionality and provide more options for our users.


## License

[MIT](https://choosealicense.com/licenses/mit/)

