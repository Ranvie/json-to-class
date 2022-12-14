const dropArea = document.getElementById('drop_area');
dropArea.addEventListener('drop', handleDrop, false);

;['dragenter', 'dragover', 'dragleave', 'drop', 'dropEffect'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
})

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highLight, false);
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unHighLight, false);
})

function highLight(e) {
  dropArea.classList.add('drop_highlight');
}

function unHighLight(e) {
  dropArea.classList.remove('drop_highlight');
}

function handleDrop(e) {
  let reader = new FileReader();
  let fileContent="";

  let dt = e.dataTransfer;
  let files = dt.files;
  reader.readAsText(files[0]);
  
  reader.onload = () => {
    fileContent=reader.result.toString();
    readedFileString(fileContent);
  }
}