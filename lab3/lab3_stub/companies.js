const axios = require('axios');


//--------------Helper Methods----------------------

const getCompany = async () => {
    try {
        const data = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
        return data;
    }
    catch (err) {
        throw err;
    }
}

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

// --------------Main--------------------------

const listEmployees = async (companyName) => {



    inputCheck(companyName);
    companyName = companyName.trim();

    const companyData = await getCompany();
    const peopleData = await getPeople();

    for (let obj of companyData.data) {
        if (obj.name == companyName) {
            let employee = [];
            for (let people of peopleData.data) {
                if (people.company_id == obj.id) {
                    employee.push(people.first_name + " " + people.last_name);
                }
            }
            obj.employees = employee;
            console.log(obj);
            return obj;
        }
    }

    throw `No company name with ${companyName}`;



};

const sameIndustry = async (industry) => {


    inputCheck(industry);
    industry = industry.trim();
    industry = industry.toUpperCase();

    const { data } = await getCompany();
    let output = [];

    for (let obj of data) {
        let cache = obj.industry;
        cache = cache.toUpperCase();
        if (cache == industry) output.push(obj);
    }

    if (output.length > 0) {
        console.log(output);
        return output;
    }
    else throw "No companies in that industry."


};

const getCompanyById = async (id) => {


    inputCheck(id);
    const { data } = await getCompany();

    for (let obj of data) {
        if (obj.id == id) {
            console.log(obj);
            return obj;
        }
    }

    throw "Company not found"


};

module.exports = { listEmployees, sameIndustry, getCompanyById };


