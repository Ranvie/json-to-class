class FormatJava {
  format(mappedJson, className, tabs) {
    let classString = "";
    classString += this.createClass(className);
    let lastTabLevel=0;

    console.log(mappedJson);
    
    for (let element of mappedJson) {
      if (lastTabLevel != element.tabLevel) {
        if (lastTabLevel > element.tabLevel) {
          classString += this.createMultipleCloseClass(tabs, lastTabLevel, element.tabLevel);
        }
  
        lastTabLevel = element.tabLevel;
      }
  
      if (element.structure == "list") {
        classString += this.createList(element.key, tabs, element.tabLevel, true);
        classString += this.createClass(element.key + "Lst", tabs, element.tabLevel);
        continue;
      }
  
      if (element.structure == "stringList") {
        classString += this.createList(element.key, tabs, element.tabLevel, false);
        continue;
      }
  
      if (element.structure == "object") {
        classString += this.createObject(element.key, tabs, element.tabLevel);
        classString += this.createClass(element.key + "Obj", tabs, element.tabLevel);
        continue;
      }

      classString += this.createAttribute(element.key, tabs, element.tabLevel);
    }
  
    classString += this.createMultipleCloseClass(tabs, lastTabLevel, 0);

    return classString;
  }
  
  createClass(className, tabs=2, tabLevel=0)
  {
    return `${generateTabSpace(tabs, tabLevel)}public class ${capitalize(className)} {\n`;
  }
  
  createMultipleCloseClass(tabs, lastTabLevel, toTabLevelExclusive)
  {
    let result="";
  
    while(lastTabLevel > toTabLevelExclusive)
    {
      result += this.createCloseClass(tabs, lastTabLevel-1);
      lastTabLevel--;
    }
  
    return result;
  }
  
  createCloseClass(tabs, tabLevel)
  {
    return `${generateTabSpace(tabs, tabLevel)}}\n`;
  }
  
  createList(key, tabs=2, tabLevel=0, isAType=false, type="String")
  {
    return isAType ? `${generateTabSpace(tabs, tabLevel)}public List<${capitalize(key+"Lst")}> ${key};\n` :
      `${generateTabSpace(tabs, tabLevel)}public List<${type}> ${key};\n`;
  }
  
  createObject(key, tabs=2, tabLevel=0)
  {
    return `${generateTabSpace(tabs, tabLevel)}public ${capitalize(key+"Obj")} ${key};\n`;
  }
  
  createAttribute(key, tabs=2, tabLevel=0, type="String")
  {
    return `${generateTabSpace(tabs, tabLevel)}public ${type} ${key};\n`;
  }
}