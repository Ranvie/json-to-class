function formatAsClass(mappedJson=[], className="ObjectClass", tabs=2)
{
  const selectedLanguage = languageInput.selectedOptions[0].value;
  const generationType   = phpTypeInput.selectedOptions[0].value;
  let classString = "";

  switch(selectedLanguage) {
    case 'java':
      classString = new FormatJava().format(mappedJson, className, tabs);
      break;

    case 'php':
      classString = new FormatPHP().format(mappedJson, className, tabs, generationType);
      break;
  }

  return classString;
}

function capitalize(string)
{
    const substrings = string.split(' ');

    for(let i in substrings)
    {
        substrings[i] = substrings[i].charAt(0).toUpperCase() + substrings[i].slice(1);
    }

    return substrings.join(' ');
}

function generateTabSpace(tabs, tabLevel)
{
  let spaces="";
  let tabQty = tabs * tabLevel;

  for(let i=0; i < tabQty; i++)
  {
    spaces += " ";
  }
  
  return spaces;
}