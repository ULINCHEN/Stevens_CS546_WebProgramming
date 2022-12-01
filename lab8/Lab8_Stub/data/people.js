//Axios call to get all data
const config = {
    address: "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
}
const axios = require('axios');


const getAllPeople = async () => {

    const response = await axios.get(config.address);
    return response.data;

};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {

    if (!searchPersonName) throw "Error: Please input a person name to search";
    searchPersonName = searchPersonName.trim().toLowerCase();
    if (searchPersonName.lenth == 0) throw "Error: PersonName invalid";

    const data = await getAllPeople();
    // console.log("In data handle function: ", data);
    const output = [];
    for (let people of data) {
        let firstname = people.firstName.toLowerCase();
        let lastname = people.lastName.toLowerCase();
        let fullname = firstname + ' ' + lastname;
        if (firstname.includes(searchPersonName) || lastname.includes(searchPersonName) || fullname.includes(searchPersonName)) {
            output.push(people);
        }
        if (output.length == 20) break;
    }

    output.sort((a, b) => a.id - b.id);
    return output;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    if (!id) throw "Error: Please input a id for search";
    id = id.trim();
    if (id.length == 0) throw "Error: invalid id";

    const data = await getAllPeople();

    for (let people of data) {
        if (people.id == id) return people;
    }

};

module.exports = { getAllPeople, searchPeopleByName, searchPeopleByID };
