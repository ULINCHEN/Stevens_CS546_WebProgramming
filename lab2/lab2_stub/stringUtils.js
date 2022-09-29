/* Helper function, not for export */
let checkInput = (string) => {
      if (!string) throw "Error: No input";
      if (typeof string !== 'string') throw "Error: Input type should be string"
      if (string.length == 0 || string.trim() == 0) throw "Error: String length Invalid";
}

let stringProcessor = (string) => {
      let temp = string.replace(/[^a-zA-Z0-9]/g, ' ');
      temp = temp.toLowerCase();
      const output = temp.split(' ');
      return output;
}

let isPalindromes = (string) => {
      if (string.length < 2) return false;
      if (string.length % 2 == 0) {
            let l = Math.floor(string.length / 2);
            let r = l + 1;
            // if string length is even number
            do {
                  if (string[l--] != string[r++]) return false;
            }
            while (l >= 0);
      }
      else {
            let l = 0, r = string.length - 1;
            do {
                  if (string[l++] != string[r--]) return false;
            }
            while (l != r);

      }
      return true;

}

let changeChar = (string, index, replacement) => {

      let output = string.substring(0, index) + replacement;
      output += string.substring(index + 1);
      return output;
}


/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
      checkInput(string);
      const arr = stringProcessor(string);
      const output = [];
      for (let s of arr) {
            if (isPalindromes(s)) output.push(s);
      }
      return output;
};

let replaceChar = (string) => {
      checkInput(string);
      let output = string;
      let rep = ["*", "$"];
      let index = 0;

      for (let i = 0; i < output.length; ++i) {
            if (i % 2 != 0) {
                  output = changeChar(output, i, rep[index]);
                  if (index == 0) index = 1;
                  else index = 0;
            }
      }
      return output;
};

let charSwap = (string1, string2) => {

      if (!string1 || !string2) throw "Error: Miss input(require 2)";
      if (typeof string1 !== 'string' || typeof string2 !== 'string') throw "Error: Input type should be string"
      if (string1.length < 4 || string2.length < 4 || string1.trim() == 0 || string2.trim() == 0) throw "Error: each string should have at least 4 characters."

      let output;
      let firstFour1 = string1.substring(0, 4);
      let last1 = string1.substring(4);
      let firstFour2 = string2.substring(0, 4);
      let last2 = string2.substring(4);

      output = firstFour2 + last1 + " " + firstFour1 + last2;
      return output;

};


module.exports = { palindromes, replaceChar, charSwap };
/* test case */

// Q1
/*console.log(palindromes("Hi mom, At noon, I'm going to take my kayak to the lake")); // Returns: ["mom", "noon", "kayak"]
console.log(palindromes('Wow! Did you see that racecar go?')); // Returns: ["Wow", "Did", "racecar"]
console.log(palindromes('Hello World')); // Returns: []
console.log(palindromes('kid kik aka tenet aakkaa cdc? for ever ofo')); */
//console.log(palindromes()); // throws error
//console.log(palindromes("    ")); //  throws error
//console.log(palindromes(1));  //throws error
//console.log(palindromes(["hello there"])) //throws error

//Q2

/*console.log(replaceChar("Daddy")); // Returns: "D*d$y"
console.log(replaceChar("Mommy")); // Returns: "M*m$y"
console.log(replaceChar("Hello, How are you? I hope you are well"));// Returns: "H*l$o* $o* $r* $o*?$I*h$p* $o* $r* $e*l"
console.log(replaceChar("123456789012345678901234567890"));
console.log(replaceChar("1234567890 1234567890 1234567890"));*/
//console.log(replaceChar("")); // Throws Error
//console.log(replaceChar(123)); // Throws Error

//Q3

//console.log(charSwap("Patrick", "Hill")); //Returns "Hillick Patr"
//console.log(charSwap("hello", "world")); //Returns "worlo helld"
//console.log(charSwap("chenyoulin", "Youlinchen"));
//console.log(charSwap("Patrick", "")); //Throws error
//console.log(charSwap()); // Throws Error
//console.log(charSwap("John")) // Throws error
//console.log(charSwap("h", "Hello"))// Throws Error
//console.log(charSwap("h", "e")) // Throws Error