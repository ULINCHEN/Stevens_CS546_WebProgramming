
// ---- private helper function , not for export ----
let findCount = (array) => {
  return array.length;
}

let getMin = (array) => {
  return array[0];
}

let getMax = (array) => {
  return array[array.length - 1];
}

let sumUp = (array) => {
  let res = 0;
  array.forEach(element => {
    res += element;
  });
  return res;
}

let getMean = (total, count) => {
  return total / count;
}

let getMedian = (array, count) => {
  let mid = Math.floor((count - 1) / 2);
  let median;
  if (count % 2 != 0) {
    median = array[mid];
  }
  else {
    median = (array[mid] + array[mid + 1]) / 2;
  }
  return median;
}

let getRange = (max, min) => {
  return max - min;
}

let getMode = (array) => {

  // use map to count each element repeat time
  const map = new Map();
  const arr = [];

  // loop through array, update map
  array.forEach(i => {
    if (!map.has(i)) map.set(i, 0);
    map.set(i, map.get(i) + 1);
  })

  // add each key value pair from map to array, sort it base on its repeat time.
  map.forEach((value, key) => {
    let temp = [key, value];
    arr.push(temp);
  })
  arr.sort((a, b) => b[1] - a[1]);

  // return logic: if all elements repeat same time or once, retrun 0
  // if only one mode found, renturn this value
  // if mutiple number repeat same time, return a array include those number
  if (arr[0][1] == 1) return 0;
  if (arr.length == 1 || arr[1][1] != arr[0][1]) return arr[0][0];
  let output = [];
  output.push(arr[0][0]);
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i][1] == map.get(output[0])) output.push(arr[i][0]);
  }
  if (arr.length == output.length) return 0;
  else return output;
}

let compareArray = (array1, array2) => {
  if (array1.length == array2.length && array1.every((v, i) => array2.includes(v))) return true;
  else return false;
}

let baseCheck = (array) => {
  if (!array) throw "Error: No input";
  if (!Array.isArray(array)) throw "Error: Input type is not array";
  if (array.length == 0) throw "Error: Input is an empty array";
}


// lab2 starts here---------------------------------------
/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {

  // * check array validation
  baseCheck(array);
  for (let i of array) {
    if (typeof i !== "number") throw "Error: Array include non-number element";
  }

  // sort array
  array.sort((a, b) => a - b);

  // * get count, min, max, sum, mean, median, mode, range
  let count = findCount(array);
  let minimum = getMin(array);
  let maximum = getMax(array);
  let sum = sumUp(array);
  let mean = getMean(sum, count);
  let median = getMedian(array, count);
  let range = getRange(maximum, minimum);
  let mode = getMode(array);

  // return object
  const output = {
    'mean': mean,
    'median': median,
    'mode': mode,
    'range': range,
    'minimum': minimum,
    'maximum': maximum,
    'count': count,
    'sum': sum,
  }
  return output;
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  //outside check
  baseCheck(...arrays);

  //init output object
  const output = {};
  arrays.forEach(arr => {
    //inside check
    baseCheck(arr);
    if (arr.length != 2) throw "Error: Array should have only two elements"
    output[arr[0]] = arr[1];
  })

  return output;

};

let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  //check input
  baseCheck(arrays);
  if (arrays.length < 2) throw "Input should have at least 2 arrays";
  baseCheck(...arrays);

  //use hashset to track value
  let output = [];
  let set = new Set();
  arrays[0].forEach(i => { set.add(i) });
  for (let i = 1; i < arrays.length; ++i) {

    set.forEach(num => {
      //if element is array, call helper func to compare array
      if (Array.isArray(num)) {
        let bool = false;
        for (let value of arrays[i]) {
          if (Array.isArray(value)) {
            bool = compareArray(num, value);
            if (bool) break;
          }
        }
        if (bool == false) set.delete(num);
      }
      //otherwise, check if this element exist in array[i]
      else if (!arrays[i].includes(num)) set.delete(num);
    })
  }

  set.forEach(i => { output.push(i) });
  return output;

};


module.exports = { arrayStats, makeObjects, commonElements };

// test unit

/*console.log(arrayStats([7, 9, 11, 15, 19, 20, 35, 0]));
console.log(arrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20]));
console.log(arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
console.log(arrayStats([11, 11, 11, 11]));*/

//console.log(arrayStats([]));
//console.log(arrayStats("banana"));
//console.log(arrayStats(["guitar", 1, 3, "apple"]));
//console.log(arrayStats());

//console.log(makeObjects([4, 1], [1, 2]));
//console.log(makeObjects(["foo", "bar"], [5, "John"]));

/*console.log(makeObjects([4, 1], [1, 2])); // returns {'4':1, '1': 2}
console.log(makeObjects(["foo", "bar"], [5, "John"])); // returns {foo:'bar', '5': "John"}
console.log(makeObjects(["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"])) //returns {foo: "not bar", name: "Patrick Hill"}
console.log(makeObjects([true, undefined], [null, null])); // returns {true: undefined, null : null}
console.log(makeObjects([undefined, true], ["date", "9/11/2022"])); // returns {undefined: true, date : "9/11/2022"} */

//makeObjects([4, 1, 2], [1, 2]); // throws error
//makeObjects([]) // throws an error
//makeObjects("banana"); // throws an error
//makeObjects(1, 2, 3); // throws an error
//makeObjects(["guitar", 1, 3, "apple"]); // throws an error
//makeObjects(); // throws an error
//makeObjects([1], [1, 2]); // throws an error


//const arr1 = [5, 7];
//const arr2 = [20, 5];
//const arr3 = [true, 5, 'Patrick'];
//const arr4 = ["CS-546", 'Patrick'];
//const arr5 = [67.7, 'Patrick', true];
//const arr6 = [true, 5, 'Patrick'];
//const arr7 = [undefined, 5, 'Patrick'];
//const arr8 = [null, undefined, true];
//const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
//const arr10 = [["foo", "bar"], true, "String", 10]
//const arr11 = [[1, 2, 3], [3, 4, 5], [4, 5, 6]];
//const arr12 = [[3, 4, 5]];

//console.log(commonElements(arr1, arr2)); // Returns [5]
//console.log(commonElements(arr3, arr4, arr5)); // returns ['Patrick']
//console.log(commonElements(arr5, arr6)); // returns ['Patrick', true]
//console.log(commonElements(arr9, arr6)); // returns []
//console.log(commonElements(arr7, arr8)); // returns [undefined]
//console.log(commonElements(arr3, arr4, arr5, arr7)); // returns ['Patrick']
//console.log(commonElements(arr9, arr10)); // returns [["foo", "bar"]] 
//console.log(commonElements(arr11, arr12))
//commonElements(); // throws error
//commonElements("test"); // throws error
//commonElements([1,2,"nope"]); // throws error