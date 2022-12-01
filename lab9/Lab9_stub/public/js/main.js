/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

const myForm = document.getElementById('myForm');
const inputData = document.getElementById('myInput');
const ul = document.getElementById('results');
// const inputError = new Set();


// const formValidation = (formData, arrayAfterSort) => {

//     const errorMsg = new Set();

//     if (!formData) {
//         errorMsg.add("Need a input");
//         return errorMsg;
//     }
//     const data = formData.trim();
//     if (data.lenth == 0) {
//         inputError.add("Invalid input");
//         return errorMsg;
//     }

//     const inputArr = [];
//     for (let i = 0; i < data.length; ++i) {
//         if (data.charAt(i) == '[') {
//             for (let j = i + 1; j < data.length; ++j) {
//                 if (data.charAt(j) == ']') {
//                     inputArr.push(data.substring(i, j + 1));
//                     break;
//                 }
//             }
//         }
//     }
//     if (inputArr.length == 0) {
//         errorMsg.add('Invalid Input');
//         return errorMsg;
//     }

//     for (let arr of inputArr) {

//         let cache = JSON.parse(arr);

//         if (Array.isArray(cache) == false) errorMsg.add('Input is not valid array');
//         if (cache.length < 1) errorMsg.add('Each array should contain at least one element');
//         for (let n of cache) {
//             if (typeof n != 'number') errorMsg.add('Array element type should be number');
//             if (n % 1 != 0) errorMsg.add('Array element should be a whole number');
//             arrayAfterSort.push(n);
//         }
//     }

//     return errorMsg;

// }

const formValidationUpdate = (formData, arrayAfterSort) => {
    const errorMsg = new Set();
    const reg = /\[[\-?\+?\ ?\d\ ?\,]+\]\,?/g;
    if (!formData) {
        errorMsg.add("Need a input");
        return errorMsg;
    }
    if (!reg.test(formData)) {
        errorMsg.add("Invalid Input, only accept arrays of numbers");
        return errorMsg;
    }
    let data = formData.trim();
    if (data.lenth == 0) {
        inputError.add("Invalid input");
        return errorMsg;
    }
    data = data.replace(/\[?\]?/g, '');
    const arr = data.split(',');
    // console.log(arr);
    for (let i of arr) {
        i = i.trim();
        if (i.length > 0) {
            arrayAfterSort.push(Number(i));
        }
    }

    // arrayAfterSort.sort((a, b) => a - b);

    return errorMsg;

}

let colorFlag = true;

const colorSetter = (flag) => {
    let output = undefined;
    if (flag == true) output = 'is-green';
    else output = 'is-red';
    return output;
}



if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // input check
        // if (!inputData.value) inputError.add("Need a input");
        // const data = inputData.value.trim();
        // if (data.lenth == 0) inputError.add("Invalid input");
        const arrayAfterSort = [];
        // split input string into sub array
        const inputError = formValidationUpdate(inputData.value, arrayAfterSort);

        const errorDiv = document.getElementById('errorMessage');
        errorDiv.replaceChildren();
        if (inputError.size > 0) {
            for (let element of inputError.values()) {
                const msg = document.createElement('li');
                msg.innerHTML = "Error:" + element;
                msg.classList.add('is-red');
                errorDiv.appendChild(msg);
            }
            inputError.clear();
            inputData.focus();
        }
        else {
            arrayAfterSort.sort((a, b) => a - b);
            // console.log(arrayAfterSort);
            const li = document.createElement('li');
            let color = colorSetter(colorFlag);
            colorFlag = !colorFlag
            li.classList.add(color);
            li.innerHTML = '[' + arrayAfterSort + ']';
            ul.appendChild(li);
        }

    })
}

