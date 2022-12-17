function mapJson(jsonContent=[], className)
{
  let mapped=[];
  let lineContent="";
  let key="";
  let tabLevel = 0;
  let parentName=[className];
  let nextLine;
  let actualLineNoSpaces="";

  for(let line = 0; line < jsonContent.length; line++)
  {
    lineContent = jsonContent[line];
    nextLine = removeSpaces(jsonContent[line+1]);
    actualLineNoSpaces = removeSpaces(lineContent);

    if(!isSymbolOnly(lineContent))
    {
      if(isValueOnly(lineContent)) 
      {
        if(isNextLineEndList(nextLine)) { parentName.pop(); }

        continue; 
      }

      key = getKeyName(lineContent);
      if(isOpenList(lineContent))
      {
        if(isValueOnly(nextLine) && !isSymbolOnly(nextLine))
        { 
          mapped.push({"key": key, "structure":"stringList", tabLevel, "parentName": parentName.join("_")}); 
        }
        else
        {
          mapped.push({"key": key, "structure":"list", tabLevel, "parentName": parentName.join("_")}); 
        }

        parentName.push(key);
        tabLevel += checkTabLevel(lineContent);
        continue;
      }

      if(isOpenObject(lineContent))
      { 
        mapped.push({"key": key, "structure":"object", tabLevel, "parentName": parentName.join("_")});
        parentName.push(key);
        tabLevel += checkTabLevel(lineContent);
        continue;
      }

      mapped.push({"key": key, "structure":"attribute", tabLevel, "parentName": parentName.join("_")});
    }
    else
    {
      if(isNextLineEndObject(nextLine, actualLineNoSpaces)) { parentName.pop(); }

      tabLevel += checkTabLevel(lineContent);
    }
  }

  return removeDuplicity(mapped);
}

function isNextLineEndList(nextLine)
{
  return nextLine == "]" || nextLine == "],";
}

function isNextLineEndObject(nextLine, actualLineNoSpaces)
{
  return nextLine != "{" && actualLineNoSpaces == "}," || actualLineNoSpaces == "}";
}

function isSymbolOnly(fileLine="")
{
  return removeSpaces(fileLine).length <= 2;
}

function removeSpaces(string="")
{
  let result="";

  for(let char of string)
  {
    if(char != " ") { result+=char; }
  }

  return result;
}

function isOpenList(fileLine="")
{
  return fileLine.includes("[") && fileLine.charAt(fileLine.length-1) == "[";
}

function isCloseList(fileLine="")
{
  return fileLine.includes("]");
}

function isOpenObject(fileLine="")
{
  return fileLine.includes("{") && fileLine.charAt(fileLine.length-1) == "{";
}

function isCloseObject(fileLine="")
{
  return fileLine.includes("}");
}

function isValueOnly(fileLine="")
{
  return !fileLine.includes(":");
}

function getKeyName(fileLine="")
{
  let keyName="";
  let quoteCount=0;

  for(let i=0; i < fileLine.length && quoteCount < 2; i++)
  {
    if(fileLine[i] === " ") { continue; }
    if(fileLine[i] === "\"") { quoteCount++; continue; }

    keyName += fileLine[i];
  }

  return keyName;
}

function checkTabLevel(lineContent="")
{
  if(isOpenObject(lineContent)) { return 1; }
  if(isCloseObject(lineContent)) { return -1; }

  return 0;
}

function removeDuplicity(arr) 
{
  let uniques = [];
  let itemsFound = {};
  let stringified="";

  for(let i = 0, l = arr.length; i < l; i++) 
  {
      stringified = JSON.stringify(arr[i]);
      if(itemsFound[stringified]) { continue; }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
  }

  return uniques;
}