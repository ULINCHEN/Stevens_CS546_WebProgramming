/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objectUtils = require("./objectUtils");

// arrayStats test

try {
    //should pass
    arrayUtils.arrayStats([7, 9, 11, 15, 19, 20, 35, 0]);
    console.log("01_successfully pass!");
}
catch (e) {
    console.log("01_failed test case");
}

try {
    //should fail
    arrayUtils.arrayStats("banana");
    console.log("02_successfully pass!");
}
catch (e) {
    console.log("02_failed test case");
}

// makeObjects test

try {
    //should pass
    arrayUtils.makeObjects(["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"]);
    console.log("03_successfully pass!");
}
catch (e) {
    console.log("03_failed test case");
}

try {
    //should fail
    arrayUtils.makeObjects([4, 1, 2], [1, 2]);
    console.log("04_successfully pass!");
}
catch (e) {
    console.log("04_failed test case");
}

// commonElements test

try {
    //should pass
    const arr5 = [67.7, 'Patrick', true];
    const arr6 = [true, 5, 'Patrick'];
    arrayUtils.commonElements(arr5, arr6);
    console.log("05_successfully pass!");
}
catch (e) {
    console.log("05_failed test case");
}

try {
    //should fail
    arrayUtils.commonElements("test");
    console.log("06_successfully pass!");
}
catch (e) {
    console.log("06_failed test case");
}

// palindromes test

try {
    //should pass
    stringUtils.palindromes('Wow! Did you see that racecar go?');
    console.log("07_successfully pass!");
}
catch (e) {
    console.log("07_failed test case");
}

try {
    //should fail
    stringUtils.palindromes(1);
    console.log("08_successfully pass!");
}
catch (e) {
    console.log("08_failed test case");
}

// replaceChar test

try {
    //should pass
    stringUtils.replaceChar("Hello, How are you? I hope you are well");
    console.log("09_successfully pass!");
}
catch (e) {
    console.log("09_failed test case");
}

try {
    //should fail
    stringUtils.replaceChar(123);
    console.log("10_successfully pass!");
}
catch (e) {
    console.log("10_failed test case");
}

// charSwap test

try {
    //should pass
    stringUtils.charSwap("Patrick", "Hill");
    console.log("11_successfully pass!");
}
catch (e) {
    console.log("11_failed test case");
}

try {
    //should fail
    stringUtils.charSwap("John");
    console.log("12_successfully pass!");
}
catch (e) {
    console.log("12_failed test case");
}

// deepEquality test

try {
    //should pass
    const first = { a: 2, b: 3 };
    const second = { a: 2, b: 4 };
    objectUtils.deepEquality(first, second);
    console.log("13_successfully pass!");
}
catch (e) {
    console.log("13_failed test case");
}

try {
    //should fail
    objectUtils.deepEquality("foo", "bar");
    console.log("14_successfully pass!");
}
catch (e) {
    console.log("14_failed test case");
}

// commonKeysValues test

try {
    //should pass
    const first = { name: { first: "Patrick", last: "Hill" }, age: 46 };
    const second = { school: "Stevens", name: { first: "Patrick", last: "Hill" } };
    objectUtils.commonKeysValues(first, second);
    console.log("15_successfully pass!");
}
catch (e) {
    console.log("15_failed test case");
}

try {
    //should fail
    objectUtils.commonKeysValues([1, 2, 3], [1, 2, 3]);
    console.log("16_successfully pass!");
}
catch (e) {
    console.log("16_failed test case");
}

// calculateObject test

try {
    //should pass
    let obj = { 'a': 3, 'b': 7, 'c': 5 };
    let func = (n) => { return n * 2 };
    objectUtils.calculateObject(obj, func);
    console.log("17_successfully pass!");
}
catch (e) {
    console.log("17_failed test case");
}

try {
    //should fail
    objectUtils.calculateObject(1);
    console.log("18_successfully pass!");
}
catch (e) {
    console.log("18_failed test case");
}