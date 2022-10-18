const axios = require('axios');

//--------------Helper Methods----------------------

const getPeople = async () => {
    try {
        const data = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
        return data;
    }
    catch (err) {
        throw err;
    }
}

const inputCheck = (input) => {
    if (!input) throw "Insufficient input!!!"
    if (typeof input != 'string') throw "Input type should be string."
    if (input.trim().length === 0) throw "Invalid Input."
}


// ---------------Main----------------------------

const getPersonById = async (id) => {
    try {
        // input validation check
        inputCheck(id);

        // call getPeople to get data, if err then throw
        const { data } = await getPeople();

        for (let obj of data) {
            if (obj.id == id) {
                console.log(obj);
                return obj;
            }
        }

        throw "people not found!"
    }
    catch (err) {
        console.log(err);
        return;
    }

    // if loop end, means we didn't found obj in data, throw error


};

const sameJobTitle = async (jobTitle) => {

    try {

        inputCheck(jobTitle);
        jobTitle = jobTitle.trim();
        jobTitle = jobTitle.toUpperCase();
        const output = [];
        const { data } = await getPeople();

        for (let obj of data) {
            if (obj.job_title.toUpperCase() == jobTitle) {
                output.push(obj);
            }
        }

        if (output.length >= 2) {
            console.log(output);
            return output;
        }
        else throw "Should be at least two people!"

    }
    catch (err) {
        console.log(err);
        return;
    }

};

const getPostalCodes = async (city, state) => {
    try {
        inputCheck(city);
        inputCheck(state);
        city = city.trim().toUpperCase();
        state = state.trim().toUpperCase();
        const { data } = await getPeople();
        const output = [];

        for (let obj of data) {
            const curCity = obj.city.toUpperCase();
            const curState = obj.state.toUpperCase();

            if (curCity == city && curState == state) {
                output.push(parseInt(obj.postal_code));
            }
        }

        if (output.length > 0) {
            output.sort();
            console.log(output);
            return output;
        }
        else {
            throw "There are no postal_codes for the given city and state combination.";
        }
    }
    catch (err) {
        console.log(err);
        return;
    }
};

const sameCityAndState = async (city, state) => {

    try {
        inputCheck(city);
        inputCheck(state);
        city = city.trim().toUpperCase();
        state = state.trim().toUpperCase();
        const { data } = await getPeople();
        const cache = [];
        const output = [];

        for (let obj of data) {
            const curCity = obj.city.toUpperCase();
            const curState = obj.state.toUpperCase();

            if (curCity == city && curState == state) {
                let firstName = obj.first_name;
                let lastName = obj.last_name;
                cache.push([firstName, lastName]);
            }
        }

        cache.sort((a, b) => a[1].localeCompare(b[1]));

        cache.forEach(arr => {
            output.push(arr[0] + ' ' + arr[1]);
        })

        if (output.length >= 2) {
            console.log(output);
            return output;
        }
        else {
            throw "There are not two people who live in the same city and state";
        }
    }
    catch (err) {
        console.log(err);
        return;
    }

};



module.exports = { getPersonById, sameJobTitle, getPostalCodes, sameCityAndState };


//getPostalCodes("Oklahoma City", "Oklahoma");
// sameCityAndState("Seattle", "Washington");

