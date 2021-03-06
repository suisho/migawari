// return leaf generate function
module.exports = function(defaultTag){
  return function(selector){
    // default dom
    var dom = {
      // To DOM
      type : "tag",
      name : defaultTag || "div",
      attribs : {},
      children : [],
      parent : null,
      prev : null,
      next : null
    }
    if(!selector){
      return dom
    }
    if(selector.tag){
      dom.name = selector.tag.name
    }

    // set
    var attribs = {}
    selector.attributes.map(function(attr){
      var value = attribs[attr.name]
      if(value){
        value += " " + attr.value
      }else{
        value = attr.value
      }
      attribs[attr.name] = value
    })

    dom.attribs = attribs

    return dom
  }
}
