const inputFile = document.getElementById('inputFile');

const noDataInput = document.getElementById('no_data_input');
const input = document.getElementById('input');

const noDataOutput = document.getElementById('no_data_output');
const output = document.getElementById('output');

const downloadLink = document.getElementById('download_link');

const inputClassName = document.getElementById('input_class_name');
let className="";

const inputTabs = document.getElementById('input_tabs');

const languageInput = window.document.getElementById('input_language');

const phpTypeInput = window.document.getElementById('input_allow_type');
const phpGenConstructInput = window.document.getElementById('input_gen_construct');

let breakInLines="";
let tabs = 2;
let tabLevel = 0;
let readed="";
let converted="";

function triggerUploadDialog()
{
  inputFile.click();
}

function handleEnter(event, sender)
{
  if(event.keyCode == 13)
  {
    if(sender.id == "file_popup")    { triggerUploadDialog(); return; }
    if(sender.id == "download_link") { downloadClassFile(); return; }
    if(sender.id == "input_area")    { triggerPasteDialog(); return; }
  }
}

function displayInputContent(readStream="")
{
  let read={};
  noDataInput.setAttribute('class', 'no_data_fill invisible');

  read = document.createElement('pre');
  read.setAttribute('id', 'input_text');
  read.innerText = readStream;

  input.appendChild(read);
}

function clearInputContent()
{
  let child = document.getElementById('input_text');

  noDataInput.setAttribute('class', 'no_data_fill');
  if(child != null) { input.removeChild(child); }
}

function displayOutputContent(classString)
{
  let converted="";
  noDataOutput.setAttribute('class', 'no_data_fill invisible');

  converted = document.createElement('pre');
  converted.setAttribute('id', 'output_text');
  converted.innerText = classString;

  output.appendChild(converted);
}

function clearOutputContent()
{
  let child = document.getElementById('output_text');

  noDataOutput.setAttribute('class', 'no_data_fill');
  if(child != null) { output.removeChild(child); }
}

function startConversion()
{
  let tabs = "";
  if(readed == "") { alert("No file selected."); return; }

  className = inputClassName.value != "" ? inputClassName.value : "ConvertedJson";
  tabs = inputTabs.value != "" && isNumber(inputTabs.value) ? parseInt(inputTabs.value) : 2; 

  breakInLines = readed.split(/\r\n|\n/);
  converted = convertJsonToClass(breakInLines, className, tabs);

  clearOutputContent();
  displayOutputContent(converted);
}

function isNumber(string="")
{
  let isNumber = string.length > 0;

  for(let i=0; i < string.length && isNumber; i++)
  {
    if(!isCharNumber(string[i])) { isNumber = false; }
  }

  return isNumber;
}

function isCharNumber(char)
{
  return char == 0 || char == 1 || char == 2 || char == 3 || char == 4 || char == 5 || 
    char == 6 || char == 7 || char == 8 || char == 9;
}

function downloadClassFile()
{
  if(converted == "") { alert("No file converted to download."); return; };

  let blob = new Blob([converted], {type: "text/plain"})
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = `${className}${getFileExtension()}`;
}

function getFileExtension() {
  const selectedLanguage = languageInput.selectedOptions[0].value;

  switch(selectedLanguage) {
    case 'java':
      return '.class';

    case 'php':
      return '.php';

    default:
      return '.txt';
  }
}

inputFile.addEventListener('change', function() {
  let reader = new FileReader();
  let fileContent = "";

  reader.readAsText(this.files[0]);

  reader.onload = () => {
    fileContent=reader.result.toString();
    readedFileString(fileContent, this.files[0].size);
  }
})

function readedFileString(fileContent, fileSizeBytes)
{
  if(!isJson(fileContent))
  {
    alert("The uploaded file is not a valid json.");
  }
  else
  {
    //TODO: Caso o arquivo seja maior de 1MB, esconder até que o usuário queira ver o conteúdo;
    readed=stringToJson(fileContent);
    clearInputContent();
    displayInputContent(readed);
  }
}

function convertToMb(totalBytes)
{
  return totalBytes/1000000;
}

function convertJsonToClass(jsonContent=[], className="ObjectClass", tabs=2)
{
  let mappedJson = mapJson(jsonContent, className);
  let classString = formatAsClass(mappedJson, className, tabs);

  return classString;
}