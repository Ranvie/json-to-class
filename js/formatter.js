function formatAsClass(mappedJson=[], className="ObjectClass", tabs=2)
{
  let classString = "";
  let lastTabLevel=0;

  classString += createClass(className);

  for(let element of mappedJson)
  {
    if(lastTabLevel != element.tabLevel) 
    {
      if(lastTabLevel > element.tabLevel) 
      {  
        classString += createMultipleCloseClass(tabs, lastTabLevel, element.tabLevel);
      }
      
      lastTabLevel = element.tabLevel;
    }

    if(element.structure == "list")
    {
      classString += createList(element.key, tabs, element.tabLevel, true);
      classString += createClass(element.key, tabs, element.tabLevel);
      continue;
    }

    if(element.structure == "stringList")
    {
      classString += createList(element.key, tabs, element.tabLevel, false);
      continue;
    }

    if(element.structure == "object")
    {
      classString += createObject(element.key, tabs, element.tabLevel);
      classString += createClass(element.key, tabs, element.tabLevel);
      continue;
    }

    classString += createAttribute(element.key, tabs, element.tabLevel);
  }

  classString += createMultipleCloseClass(tabs, lastTabLevel, 0);

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

function createClass(className, tabs=2, tabLevel=0)
{
  return `${generateTabSpace(tabs, tabLevel)}public class ${capitalize(className)} {\n`;
}

function createMultipleCloseClass(tabs, lastTabLevel, toTabLevelExclusive)
{
  let result="";

  while(lastTabLevel > toTabLevelExclusive)
  {
    result += createCloseClass(tabs, lastTabLevel-1);
    lastTabLevel--;
  }

  return result;
}

function createCloseClass(tabs, tabLevel)
{
  return `${generateTabSpace(tabs, tabLevel)}}\n`;
}

function createList(key, tabs=2, tabLevel=0, isAType=false, type="String")
{
  return isAType ? `${generateTabSpace(tabs, tabLevel)}public List<${capitalize(key)}> ${key.toLowerCase()};\n` :
    `${generateTabSpace(tabs, tabLevel)}public List<${type}> ${key.toLowerCase()};\n`;
}

function createObject(key, tabs=2, tabLevel=0)
{
  return `${generateTabSpace(tabs, tabLevel)}public ${capitalize(key)} ${key.toLowerCase()};\n`;
}

function createAttribute(key, tabs=2, tabLevel=0, type="String")
{
  return `${generateTabSpace(tabs, tabLevel)}public ${type} ${key.toLowerCase()};\n`;
}