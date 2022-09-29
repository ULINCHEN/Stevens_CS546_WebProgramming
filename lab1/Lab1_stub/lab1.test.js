const lab1 = require('./lab1');
//TODO: Write and call each function in lab1.js 5 times each, passing in different input

function deepEqual(a, b) {
    if (isNaN(a) && isNaN(b)) return true;
    if ((typeof a == 'object' && a != null) &&
        (typeof b == 'object' && b != null)) {
        var count = [0, 0];
        for (var key in a) count[0]++;
        for (var key in b) count[1]++;
        if (count[0] - count[1] != 0) { return false; }
        for (var key in a) {
            if (!(key in b) || !deepEqual(a[key], b[key])) { return false; }
        }
        for (var key in b) {
            if (!(key in a) || !deepEqual(b[key], a[key])) { return false; }
        }
        return true;
    }
    else {
        return a === b;
    }
}

const test = (desc, input, res) => {
    return (fn) => {
        if (deepEqual(fn(...input), res)) return desc + "Result: PASS";
        else return desc + "Result: Fail";
    }
}

console.log("function 1 test:");
console.log(test("Case 1 ", [[5, 3, 10]], [true, true, false],)(lab1.questionOne));
console.log(test("Case 2 ", [[2, 1, 2]], [true, false, true],)(lab1.questionOne));
console.log(test("Case 3 ", [[512, 1007, 17389]], [false, false, true],)(lab1.questionOne));
console.log(test("Case 4 ", [[0, 14159, 785]], [false, true, false],)(lab1.questionOne));
console.log(test("Case 5 ", [[11, 4]], [true, false],)(lab1.questionOne));
console.log(test("Case 6 ", [['11', 4]], 'Error: Invalid Input',)(lab1.questionOne));
console.log(test("Case 7 ", [11], 'Error: Invalid Input',)(lab1.questionOne));

console.log("function 2 test:");
console.log(test("Case 1 ", [5, '3', 10], 'Error: Invalid Input',)(lab1.questionTwo));
console.log(test("Case 2 ", [5, 3, 10], 147620,)(lab1.questionTwo));
console.log(test("Case 3 ", [2, 0, 2], 0,)(lab1.questionTwo));
console.log(test("Case 4 ", [512, 1007, -5], NaN,)(lab1.questionTwo));
console.log(test("Case 5 ", [2, 10, 4], 2222,)(lab1.questionTwo));
console.log(test("Case 6 ", [175, 3, 5], 21175,)(lab1.questionTwo));

console.log("function 3 test:");
console.log(test("Case 1 ", [09876543], 'Error: Invalid Input',)(lab1.questionThree));
console.log(test("Case 2 ", ["How now brown cow"], 10,)(lab1.questionThree));
console.log(test("Case 3 ", ["Welcome to CS-546"], 7,)(lab1.questionThree));
console.log(test("Case 4 ", ["JavaScript is fun!"], 10,)(lab1.questionThree));
console.log(test("Case 5 ", ["My name is YoulinChen"], 9,)(lab1.questionThree));

console.log("function 4 test:");
console.log(test("Case 1 ", ["hello world", "o"], 2,)(lab1.questionFour));
console.log(test("Case 2 ", ["Helllllllo, class!", "ll"], 3,)(lab1.questionFour));
console.log(test("Case 3 ", ["ababababababababababababababababababababab", "ab"], 21,)(lab1.questionFour));
console.log(test("Case 4 ", ["aaaaaaaaaaaaaaaaaaaa", "a"], 20,)(lab1.questionFour));
console.log(test("Case 5 ", ["a", " "], 0,)(lab1.questionFour));
console.log(test("Case 6 ", [666, "hello"], 'Error: Invalid Input',)(lab1.questionFour));

