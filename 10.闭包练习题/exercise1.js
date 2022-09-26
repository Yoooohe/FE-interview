var name = "window";

p = {
  name: 'Peter',
  getName: function(){
    var self = this;
    return function(){
      return self.name;
    }
  }
}

var getName = p.getName();
var _name = getName();
console.log(_name);