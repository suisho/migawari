var assert = require('assert')
var tree = require('../lib/selector/tree')
var parser = require("../lib/parser")
var traverse = require("traverse")

var getTestableTree = function(tree){
  var wrap = {
    obj : tree
  }
  return traverse(wrap).map(function(x){
    if(!x || !x.children) return x;
    var name = null
    try{
      name = x.name
    }catch(e){
    }
    return {
      name : name,
      children : x.children,
      next : x.next
    }
  }).obj
}

var assertTree = function(selector, expect){
  var p = parser(selector)
  var tr = tree(p)
  var t = getTestableTree(tr)
  //console.log(require("util").inspect(t, {depth:null}))

  var dbg = traverse(t).reduce(function(acc, t){
    return (this.isLeaf && typeof t === "string") ? acc + " "+ t : acc
  })
  assert.deepEqual(expect, t)
}

var itTree = function(selector, expect, memo){
  it(selector + " " + memo, function(){
    assertTree(selector, expect)
  })
}

// a
// + b
// + c
describe('tree', function(){
  itTree("a", [{
    name : "a",
    children : [],
  }])

  itTree("a b",[{
    name : "a",
    children : [{
      name : null, //dummy
      children : [{
        name : "b",
        children :[]
      }]
    }]
  }])
  itTree("a ~ p", [{
    name : "a",
    children : []
  },{
    name : null, //dummy
    children : []
  },{
    name : "p",
    children : []
  }])
  itTree("a , b", [{
    name : "a",
    children : []
  },{
    name : "b",
    children : []
  }])

  itTree("a > b + p", [{
    name : "a",
    children : [{
      name : "b",
      children : []
    }, {
      name : "p",
      children : []
    }]
  }], "dddd")
})
