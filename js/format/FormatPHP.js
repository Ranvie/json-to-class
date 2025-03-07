class FormatPHP {
  format(mappedJson=[], className='', tabs=0, generationType, generateConstructor) {
    let classString = "";
    let lastParent = '';
    let objects = [];

    mappedJson.sort((a, b) => a.parentName.localeCompare(b.parentName));

    lastParent = mappedJson[0].parentName;
    classString = this.createClass(className, tabs, 0);
    for(const element of mappedJson){
      if(element.parentName != lastParent) { 
        if(generateConstructor) classString += this.generateConstructor(objects, tabs, 1); 
        classString += this.createCloseClass(tabs, 0); 
        classString += this.createClass(element.parentName, tabs, 0);

        objects = [];
      }

      if (element.structure == "list") {
        const parent = element.parentName + capitalize(element.key);
        classString += this.createAttribute(element.key, tabs, 1, this.getType('array', generationType), parent + '[]');
        objects.push({ key:element.key, value:'[]', type:'list' })
        continue;
      }
  
      if (element.structure == "stringList") {
        classString += this.createAttribute(element.key, tabs, 1, this.getType('array', generationType), 'string[]');
        objects.push({ key:element.key, value:'[]', type:'stringList' })
        continue;
      }
  
      if (element.structure == "object") {
        const parent = element.parentName + capitalize(element.key);
        classString += this.createAttribute(element.key, tabs, 1, this.getType(parent, generationType), parent);
        objects.push({ key:element.key, value:parent, type:'object' })
        continue;
      }

      //TODO: Assim que fizer a parte de detectar os tipos no mapper ficaria no lugar do string o tipo;
      let type = this.getType('string', generationType);
      classString += this.createAttribute(element.key, tabs, 1, type, 'string');
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

    return type != '' ? `${phpDoc}${generateTabSpace(tabs, tabLevel)}public ${type} $${key};\n` : `${phpDoc}${generateTabSpace(tabs, tabLevel)}public $${key};\n`;
  }

  getType(type, generationType) {
    if(generationType == 'object' || generationType == 'all') return type;
    
    return '';
  }

  generateConstructor(objects = [], tabs = 2, tabLevel = 0) {
    if(objects.length == 0) return '';

    let construct = `\n${generateTabSpace(tabs, tabLevel)}public function __construct() {\n`;
    for(let object of objects) {
      switch(object.type){
        case 'list':
        case 'stringList':
          construct += `${generateTabSpace(tabs, tabLevel+1)}$this->${object.key} = ${object.value};\n`;
          break;
        
        case 'object':
          construct += `${generateTabSpace(tabs, tabLevel+1)}$this->${object.key} = new ${object.value}();\n`;
          break;
      }
    }
    construct += `${generateTabSpace(tabs, tabLevel)}}\n`;

    return construct;
  }

}