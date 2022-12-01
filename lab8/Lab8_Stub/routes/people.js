//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const peopleData = require('../data');


router.route("/")
  .get(async (req, res) => {
    //code here for GET
    res.sendFile('/homepage.html', { root: "/Users/ulinchen/Desktop/Stevens_CS546/lab8/Lab8_Stub/static/" });
  });

router.route("/searchpeople")
  .post(async (req, res) => {
    //code here for POST

    const name = req.body.searchPersonName;
    console.log("router get name: ", name);

    try {
      const data = await peopleData.searchPeopleByName(name);
      console.log("Search by name result: ", data);
      if (data.length > 0) {
        res.render("peopleFound", {
          title: "people found",
          searchPersonName: name,
          personData: data,
        });
      }
      else {
        res.render("personNotFound", {
          title: "people not found",
          searchPersonName: name,
        })
      }

    }
    catch (err) {
      res.status(400).render("error", { title: "Error", error: err });
    }

  });

router.route("/persondetails/:id")
  .get(async (req, res) => {
    //code here for GET
    const id = req.params.id;

    try {

      const data = await peopleData.searchPeopleByID(id);
      console.log("Get people by id data:", data);
      if (data) {
        res.render('personFoundByID', { title: 'Person Found', personData: data });
      }
      else {
        res.render("personNotFound", {
          title: "people not found",
          searchPersonName: "ID: " + id,
        })
      }

    }
    catch (err) {
      res.status(400).render("error", { title: "Error", error: err });
    }


  });

module.exports = router;