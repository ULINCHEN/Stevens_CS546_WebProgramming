/* helper function, not for export */
let innerCompare = (val1, val2) => {
      //if (isNaN(val1) && isNaN(val2)) return true;
      if ((typeof val1 == 'object' && val1 != null) &&
            (typeof val2 == 'object' && val2 != null)) {
            let count = [0, 0];
            for (let key in val1) count[0]++;
            for (let key in val2) count[1]++;
            if (count[0] - count[1] != 0) { return false; }
            for (let key in val1) {
                  if (!(key in val2) || !innerCompare(val1[key], val2[key])) { return false; }
            }
            for (let key in val2) {
                  if (!(key in val1) || !innerCompare(val2[key], val1[key])) { return false; }
            }
            return true;
      }
      else {
            return val1 === val2;
      }
}

let checkInput = (val1, val2) => {
      if (!val1 || !val2) throw "Error: require at least 2 input";
      if (typeof val1 != 'object' || Array.isArray(val1) || val1 == null
            || typeof val2 != 'object' || Array.isArray(val2) || val2 == null) throw "Error: Invalid input type";
}

let arrayCompare = (arr1, arr2) => {
      arr1 = arr1.sort();
      arr2 = arr2.sort();
      let a = arr1.toString();
      let b = arr2.toString();
      return a === b;
}




/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      checkInput(obj1, obj2);
      return innerCompare(obj1, obj2);
};

let commonKeysValues = (obj1, obj2) => {
      checkInput(obj1, obj2);
      let output = {};

      let find = (obj1, obj2) => {

            // count how much item in current object
            let count = 0;
            let countTrue = [];
            for (let key in obj1) count++;

            // for each key in obj1, if obj2 has same key, compare them
            for (let key in obj1) {
                  if (key in obj2) {

                        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
                              if (arrayCompare(obj1[key], obj2[key])) {
                                    output[key] = obj1[key];
                                    countTrue.push(true);
                              }
                        }
                        else if (typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {
                              if (find(obj1[key], obj2[key])) output[key] = obj1[key];
                        }
                        else {
                              if (obj1[key] === obj2[key]) {
                                    output[key] = obj1[key];
                                    countTrue.push(true);
                              }

                        }
                  }
            }
            if (countTrue.length == count) return true;
            else return false;
      }

      find(obj1, obj2);
      return output;

};

let calculateObject = (object, func) => {

      if (!object || !func) throw "Error: require at least 2 input";
      if (typeof object != 'object' || Array.isArray(object) || object == null) throw "Error: Invalid input type: Object";
      if (typeof func != 'function') throw "Error: Invalid input type: func";

      let output = {};

      for (let key in object) {
            let temp = func(object[key]);
            temp = Math.sqrt(temp);
            output[key] = temp.toFixed(2);
      }

      return output;

};


module.exports = { deepEquality, commonKeysValues, calculateObject };



/* test case */

// Q1

//const first = { a: 2, b: 3 };
//const second = { a: 2, b: 4 };
//const third = { a: 2, b: 3 };
//const forth = { a: { sA: "Hello", sB: "There", sC: "Class" }, b: 7, c: true, d: "Test" }
//const fifth = { c: true, b: 7, d: "Test", a: { sB: "There", sC: "Class", sA: "Hello" } }
//
//console.log(deepEquality(first, second)); // false
//console.log(deepEquality(forth, fifth)); // true
//console.log(deepEquality(forth, third)); // false
//console.log(deepEquality({}, {})); // true
//console.log(deepEquality([1, 2, 3], [1, 2, 3])); // throws error
//console.log(deepEquality("foo", "bar")); // throws error

// Q2

//const first = { name: { first: "Patrick", last: "Hill" }, age: 46 };
//const second = { school: "Stevens", name: { first: "Patrick", last: "Hill" } };
//const third = { a: 2, b: { c: true, d: false } };
//const forth = { b: { c: true, d: false }, foo: "bar" };
//const test1 = { a: { b: [1, 2, 3], c: 2 }, cc: { dd: 44, hh: 11 } };
//const test2 = { a: { b: [1, 2, 3], c: 2 }, cc: { dd: 44, hh: 00 } }

//console.log(commonKeysValues(first, second)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
//console.log(commonKeysValues(third, forth)); // returns {b: {c: true, d: false}, c: true, d: false }
//console.log(commonKeysValues({}, {})); // {}
//console.log(commonKeysValues({ a: 1 }, { b: 2 })); // {}
//console.log(commonKeysValues(test1, test2));
//console.log(commonKeysValues([1, 2, 3], [1, 2, 3])); // throws error
//console.log(commonKeysValues("foo", "bar")); // throws error
//console.log(commonKeysValues());

// Q3

//let obj = { 'a': 3, 'b': 7, 'c': 5 };
//let func = (n) => { return n * 2 };

//console.log(calculateObject(obj, func));
//console.log(calculateObject());
//console.log(calculateObject(obj, obj));