const dropArea = document.getElementById('input_area');
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

function highLight() {
  dropArea.classList.add('drop_highlight');
}

function unHighLight() {
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
    readedFileString(fileContent, files[0].size);
  }
}