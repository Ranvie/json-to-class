const modal = document.getElementById('modal');
const input_paste = document.getElementById('input_paste');

document.addEventListener('keyup', (e) => {
  if(e.key == "Escape" && modal.classList.contains('visible')) { closePasteDialog() }
})

modal.addEventListener('mousedown', (e) => {
  if(e.target.id == "exit_modal") { closePasteDialog(); }
})

function triggerPasteDialog()
{
  modal.classList.remove('invisible');
  modal.classList.add("visible");

  input_paste.focus();
}

function closePasteDialog()
{
  modal.classList.remove('visible');
  modal.classList.add("invisible"); 
}

function saveInputOnModal()
{
  let readInput = input_paste.value;
  if(readInput == "") 
  { 
    alert("No content provided."); 
  }
  else
  {
    readedFileString(readInput, readInput.length);
    closePasteDialog();
  }
}