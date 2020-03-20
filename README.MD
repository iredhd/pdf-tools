# PDF Tools
The content of this repository is the source code of the PDF-Tools API.

In one of my projects I had the need to encrypt some PDF files with passwords and, I noticed that all APIs for this are currently paid. So I developed my own open-source.

If you are interested in improving the API, your pull request is welcome.

## Getting Started

#### [http://pdf-tools.iredhd.dev](http://pdf-tools.iredhd.dev)

| Route                 |Method| Description                                                       |
|:---------------------:|:----:|:-----------------------------------------------------------------:| 
| [/encrypt](#encrypt)  |POST  | Encrypt one or more PDFs with a password and downloads a ZIP file.| 

### Actions
#### Encrypt
Receive a post request with the following **form-data**:

|Key     |Type            |Required|Description                                     |
|:------:|:--------------:|:------:|:----------------------------------------------:|
|files   |Array (of files)|Yes     |An array with PDF files to be encrypted         |
|password|String          |Yes     |The password to be applied to each of these PDFs|

### Handling Errors
|Code              |Description                           |
|:----------------:|:------------------------------------:|
|ZIP_ERROR         |Error zipping the response.           |
|ENCRYPT_ERROR     |Error encrypting the PDFs             |
|PASSWORD_NOT_FOUND|Password not found in the API request |
|FILES_NOT_FOUND   |PDF files not found in the API request|

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Remember to use the default nomenclature for commits, using `npm run commit` or `yarn commit`.

Please make sure to update tests as appropriate.