/*
  1.
  Create a method for all arrays to sum an array of numbers.
  If any element in the array is not a number, the method should
  throw an error with a message: 'Target array must contain numbers only'.
*/
Array.prototype.sum = function (){
  return this.reduce(function(sum,item){
    if(typeof item === "number" || typeof sum === "number"){
      sum += item;
    }else {
      return "Target array must contain numbers only";
    }
    return sum;
  },0);
};
[1, 2, 3].sum() // Output: 6

/*
  2. When trying to convert an object to string, the output is always '[object object]'.
  a. Change the default output for all objects to be 'This is an object'.
*/

Object.prototype.toString = function (){
  if(typeof this.message === "undefined"){
    return "this is an object";
  }else {
    return this.message;
  }
};
const obj = {};
String(obj); // Output: 'This is an object'.

// b. Make String(obj) of only the following object return the content of the message
// while the all other objects still return 'This is an object'.
const obj2 = { message: 'This is a message' };
String(obj2) // Output: 'This is a message'.



class Animal{
  static countAnimals = 0;
  constructor (){
    Animal.countAnimals++;
  }
  color;
  weight;
  run(){}
  walk(){}
  eat(){}
  attack(){}
}
class Bird extends Animal {
  fly(){}
}

let counter = 0;
function Animl (){
  counter++;
}
Animl.prototype.run = function () {};
Animl.prototype.walk = function () {};
Animl.prototype.eat = function () {};
Animl.prototype.attack = function () {};

function Brd(){

  Animl.call(this);
}
Brd.prototype.__proto__ = Animl.prototype;
Brd.prototype.fly = function (){};

function isBird(obj){
  return obj instanceof Brd || obj instanceof Bird ;
}


/*
  3.
  a. You're developing a game which has different types of animals. All animals can walk, run,
  eat and attack. They also have color and weight properties.
  The game also has birds which do all these actions in addition to flying.
  Represent this data using OOP. 
  
  Notes:
  - Write the code twice; using ES5 function constructors and using ES6 classes.
  - Leave the implementation of the 'walk', 'run', 'eat' and 'attack' methods empty
  or write a console.log statement inside each of them.
  - Maintain the count of all created animals in the code and limit the number of
  total created animals to 100. Throw an error if the code tries to create the 101st animal.

  b. Write a function that detects wether an animal is a bird or not.
  isBird(animal) // Output: true or false.
*/