function questionOne(arr) {
  // TODO: Implement question 1 here
  const output = new Array();

  const isPrime = (num) => {
    if (num == 2 || num == 3) return true;
    if (num <= 1 || num % 2 == 0 || num % 3 == 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i == 0 || num % (i + 2) == 0) return false;
    }
    return true;
  }

  for (let i of arr) {
    let cache = isPrime(i);
    output.push(cache);
  }

  return output;
}


function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  if (startingNumber == 0 || commonRatio == 0) return 0;
  if (numberOfTerms <= 0 || numberOfTerms % 1 != 0) return NaN;

  let output = 0;

  for (let i = numberOfTerms; i > 0; --i) {
    output += startingNumber
    startingNumber *= commonRatio;
  }

  return output;

}


function questionThree(str) {
  // TODO: Implement question 3 here
  let output = 0;
  const hashSet = new Set(['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x']);

  for (let i = 0; i < str.length; ++i) {
    let char = str.charAt(i);
    if (hashSet.has(char.toLowerCase())) output++;
  }

  return output;
}


function questionFour(fullString, substring) {
  // TODO: Implement question 4 here
  let r = 0;
  let output = 0;

  for (let i = 0; i < fullString.length; ++i) {
    if (fullString.charAt(i) == substring.charAt(r)) {
      if (r == substring.length - 1) {
        output++;
        r = 0;
      }
      else r++;
    }
    else r = 0;
  }

  return output;

}


//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Youlin',
  lastName: 'Chen',
  studentId: '20012293',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
