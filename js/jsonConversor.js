//TODO: Caso hajam caracteres como {, [, etc, no valor ou na chave, não devem ser considerados pra fazer
//a formatação. Ex: test12.json;
function stringToJson(string="", tabs=2)
{
  let formatted = "";
  let tabLevel = 0;
  let quoteLevel=0;
  let char = "";
  string = removeSpaces(string);

  for(let i=0; i < string.length; i++)
  {
    char = string[i];
    quoteLevel += checkQuotes(char, quoteLevel);

    if(quoteLevel == 0)
    {
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
    if(char != " " && char != "\r" && char != "\n" && char != "\t") { result += char; }
  }

  return result;
}

function checkQuotes(char, quoteLevel)
{
  if(char == "\"" && quoteLevel == 0) { return 1; }
  if(char == "\"" && quoteLevel == 1) { return -1; }

  return 0;
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