class FormatPHP {
  format(mappedJson=[], className='', tabs=0, generationType) {
    let classString = "";
    let lastParent = '';

    mappedJson.sort((a, b) => a.parentName.localeCompare(b.parentName));

    lastParent = mappedJson[0].parentName;
    classString = this.createClass(className, tabs, 0);
    for(const element of mappedJson){
      if(element.parentName != lastParent) { classString += this.createCloseClass(tabs, 0); classString += this.createClass(element.parentName, tabs, 0); }

      if (element.structure == "list") {
        const parent = element.parentName + capitalize(element.key);
        classString += this.createAttribute(element.key, tabs, 1, this.getType('array', generationType), parent + '[]');
        continue;
      }
  
      if (element.structure == "stringList") {
        classString += this.createAttribute(element.key, tabs, 1, this.getType('array', generationType), 'string[]');
        continue;
      }
  
      if (element.structure == "object") {
        const parent = element.parentName + capitalize(element.key);
        classString += this.createAttribute(element.key, tabs, 1, this.getType(parent, generationType), parent);
        continue;
      }

      //TODO: Assim que fizer a parte de detectar os tipos no mapper ficaria no lugar do string o tipo;
      classString += this.createAttribute(element.key, tabs, 1, this.getType('string', generationType), 'string');
      lastParent = element.parentName;
    }
    classString += this.createCloseClass(tabs, 0);

    return classString;
  }
  
  createClass(className, tabs=2, tabLevel=0)
  {
    return `${generateTabSpace(tabs, tabLevel)}class ${capitalize(className)} {\n`;
  }
  
  createCloseClass(tabs, tabLevel)
  {
    return `${generateTabSpace(tabs, tabLevel)}}\n`;
  }
  
  createAttribute(key, tabs=2, tabLevel=0, type, doc = '')
  {
    let phpDoc= '';
    if(doc != '') phpDoc = `${generateTabSpace(tabs, tabLevel)}/** @var ${doc} */\n`;

    return `${phpDoc}${generateTabSpace(tabs, tabLevel)}public ${type}$${key};\n`;
  }

  getType(type, generationType) {
    if(generationType == 'object' || generationType == 'all') return type+' ';
    
    return '';
  }

}