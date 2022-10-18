/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  
We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

const people = require("./people");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

const people = require('./people');
const companies = require('./companies')

async function main() {

    try {

        console.log('TEST: people.getPersonById');
        await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
        // Returns:
        // { id: "fa36544d-bf92-4ed6-aa84-7085c6cb0440", first_name: "Archambault", last_name: "Forestall", email: "aforestall0@usnews.com", phone_number: "702-503-4409", address: "07322 Sugar Avenue", city: "Las Vegas", state: "Nevada", postal_code: "89140", company_id: "ed37ae87-f461-42d2-bf24-8631aad856de", department: "Services", job_title: "Social Worker" }

        await people.getPersonById(-1); // Throws Error
        await people.getPersonById(1001); // Throws Error
        await people.getPersonById(); // Throws Error
        await people.getPersonById("    ");
        await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff'); // Throws person not found Error

        console.log('TEST: people.sameJobTitle');
        await people.sameJobTitle("Help Desk Operator");
        // Returns:
        // [
        //     { id: "71b58028-2d43-447a-9911-925d15fc5936", first_name: "Dionis", last_name: "Morson", email: "dmorsonw@newsvine.com", phone_number: "813-647-2585", address: "98753 Surrey Way", city: "Tampa", state: "Florida", postal_code: "33647", company_id: "216602a1-032f-4a0c-8e01-84e32d3d9e26", department: "Business Development", job_title: "Help Desk Operator" },
        //     { id: "d7fdb4b4-e5d8-46be-831e-cdd3966d9da7", first_name: "Jillana", last_name: "Defries", email: "jdefriesa7@reference.com", phone_number: "570-774-0588", address: "50 Veith Avenue", city: "Wilkes Barre", state: "Pennsylvania", postal_code: "18763", company_id: "bc50e7ff-8a3f-42a8-a99e-2fe686d0923f", department: "Training", job_title: "Help Desk Operator" },
        //     { id: "5773c99d-655b-46b6-9655-80406cabffd0", first_name: "Barrett", last_name: "Bachs", email: "bbachsq6@parallels.com", phone_number: "516-387-4592", address: "078 Lindbergh Place", city: "Port Washington", state: "New York", postal_code: "11054", company_id: "da1c6c44-c35a-4d10-a9e6-1c816c99e0e5", department: "Business Development", job_title: "Help Desk Operator" }
        // ]
        // await people.sameJobTitle(); // Throws Error
        // await people.sameJobTitle("farmer"); // Throws Error since there are not two people with that job title
        // await people.sameJobTitle(123); // Throws Error
        // await people.sameJobTitle(["Help Desk Operator"]); // Throws Error
        // await people.sameJobTitle(true); // Throws Error

        // console.log('TEST: people.getPostalCodes');
        // await people.getPostalCodes("Salt Lake City", "Utah"); // Returns: [84130, 84135, 84145]
        // await people.getPostalCodes(); // Throws Error
        // await people.getPostalCodes(13, 25); // Throws Error
        // await people.getPostalCodes("Bayside", "New York"); // Throws Error: There are no postal_codes for the given city and state combination

        // console.log('TEST: people.sameCityAndState');
        // await people.sameCityAndState("Salt Lake City", "Utah"); // Returns: ['Vonnie Faichney', 'Townie Sandey', 'Eolande Slafford']
        // await people.sameCityAndState(); // Throws Error
        // await people.sameCityAndState("    ", "      "); // Throws Error
        // await people.sameCityAndState(2, 29); // Throws Error
        // await people.sameCityAndState("Bayside", "New York"); // Throws Error: there are not two people who live in the same city and state

        // console.log('TEST: companies.listEmployees');
        // await companies.listEmployees("Yost, Harris and Cormier")
        // //Would return:
        // // { id: "fb90892a-f7b9-4687-b497-d3b4606faddf", name: "Yost, Harris and Cormier", street_address: "71055 Sunbrook Circle", city: "Austin", state: "TX", postal_code: "78715", industry: "Apparel", employees: ["Jenda Rubens"] }

        // await companies.listEmployees("Kemmer-Mohr")
        // //Would return:
        // // { id: "74f11ba3-7253-4146-b5a8-2f7139fe50bf", name: "Kemmer-Mohr", street_address: "534 Lyons Drive", city: "Cincinnati", state: "OH", postal_code: "45999", industry: "Industrial Machinery/Components", employees: ['Janessa Arpino', 'Antoni Bottjer'] }

        // await companies.listEmployees("Will-Harvey")
        // //Would return:
        // // { id: "746d3cfe-c7b0-4927-ab0b-ecfaf1ef53f8", name: "Will-Harvey", street_address: "818 Russell Court", city: "Jackson", state : "MS", postal_code: "39296", industry: "Major Banks", employees: [] }

        // await companies.listEmployees('foobar') // Throws Error: No company name with foobar
        // await companies.listEmployees(123) // Throws Error


        // console.log('TEST: companies.sameIndustry');
        // await companies.sameIndustry('Auto Parts:O.E.M.');
        // //  Returns:

        // // [

        // //     {
        // //         id: "b0d53628-9e28-4aed-8559-b105296baf03", name: "Haag, Oberbrunner and Bins", street_address: "810 Butternut Point", city: "Hampton", state":"VA", postal_code: "23668", industry:"Auto Parts: O.E.M."},

        // //     { id: "ddd9d6ec-035c-4809-9978-5117f39376b0", name: "Hayes-Barton", street_address: "27 Montana Lane", city: "Kansas City", state: "MO", postal_code: "64187", industry: "Auto Parts:O.E.M." },

        // //     { id: "fbcae17b-481f-411b-8351-92ac66f1e3a1", name: "Schuster-Lang", street_address: "71599 Marquette Court", city: "Chicago", state: "IL", postal_code: "60604", industry: "Auto Parts:O.E.M." },

        // //     { id: "29ac19a4-999b-4354-bc52-2ef03798c02a", name: "Tillman and Sons", street_address: "6 Hollow Ridge Trail", city: "Charleston", state: "WV", postal_code: "25389", industry: "Auto Parts:O.E.M." },

        // //     { id: "b7a487a9-87a8-4c1c-a84d-ad1ba35fb52a", name: "Mertz, Blanda and Hills", street_address: "67926 Mockingbird Alley", city: "Huntington", state: "WV", postal_code: "25770", industry: "Auto Parts:O.E.M." },

        // //     { id: "44f8ea72-24ec-44fd-b57e-8fc8053c127a", name: "Lubowitz Group", street_address: "42 Porter Hill", city: "Melbourne", state: "FL", postal_code: "32919", industry: "Auto Parts:O.E.M." },

        // //     { id: "1ec4dade-fd59-472f-b44e-74910a5828f6", name: "Schimmel-Hickle", street_address: "67350 Derek Road", city: "Jacksonville", state: "FL", postal_code: "32277", industry: "Auto Parts:O.E.M." }

        // // ]

        // await companies.sameIndustry(43); // Throws Error
        // await companies.sameIndustry(' '); // Throws error
        // await companies.sameIndustry('Foobar Industry'); // Throws error No companies in that industry
        // await companies.sameIndustry(); // Throws Error

        // console.log('TEST: companies.getCompanyById');
        // await companies.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
        // // Returns:
        // //{ id: "fb90892a-f7b9-4687-b497-d3b4606faddf", name: "Yost, Harris and Cormier", street_address: "71055 Sunbrook Circle", city: "Austin", state: "TX", postal_code: "78715", industry: "Apparel" }

        // await companies.getCompanyById(-1); // Throws Error
        // await companies.getCompanyById(1001); // Throws Error
        // await companies.getCompanyById(); // Throws Error
        // await companies.getCompanyById('7989fa5e-5617-43f7-a931-46036f9dbcff'); // Throws company not found Error


    }
    catch (err) {
        console.log(err);
    }

}

main();