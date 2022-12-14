function stringToJson(string="", tabs=2)
{
  let formatted = "";
  let tabLevel = 0;
  let char = "";
  string = removeSpaces(string);

  for(let i=0; i < string.length; i++)
  {
    char = string[i];

    if(isOpenObjectOrList(char))
    { 
      tabLevel++; 
      formatted += char + "\n" + generateTabSpace(tabs, tabLevel); 
      continue; 
    }

    if(isCloseObjectOrList(char))
    {
      tabLevel--; 
      formatted += "\n" + generateTabSpace(tabs, tabLevel) + char;
      continue; 
    }

    if(isSeparator(char))
    {
      formatted += char + "\n" + generateTabSpace(tabs, tabLevel);
      continue;
    }

    formatted += char;
  }

  return formatted;
}

function removeSpaces(string="")
{
  let result="";

  for(let char of string)
  {
    if(char != " " && char != "\r" && char != "\n") { result += char; }
  }

  return result;
}

function isOpenObjectOrList(char)
{
  return char == "{" || char == "[";
}

function isCloseObjectOrList(char)
{
  return char == "}" || char == "]";
}

function isSeparator(char)
{
  return char == ",";
}

function isJson(string)
{
  let result=false;
  let parsed={};

  try
  {
    parsed = JSON.parse(string);

    if(parsed && typeof(parsed) == "object"){ result = true };
  }
  catch(err)
  {
  }

  return result;
}