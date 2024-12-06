// const express=require("express")
// const person=require("./../models/person");
// const router=express.Router()

// router.get("/:worktype",async(req,res)=>{
//     const worktype=req.params.worktype;
//     try {
//       if(worktype=="chef"||worktype=="waiter"|| worktype=="manager"){
//         const response=await person.find({work:worktype})
//         console.log("data fetched successfully", response)
//         res.status(200).json(response)
//        }
//        else{
//         res.status(404).json("no record found")
//        }
// }

//     catch(error){
//       res.status(500).json('internal server error')
//     }
//   })

// router.get('/', (req,res)=>{
//   console.log("connected")
// })

// router.post('/',async(req,res)=>{

//   try{
// const data=req.body
// const newPerson=new person(data);
// const response=await newPerson.save()
// console.log(response)
// res.status(200).json(response)
//   }
//   catch(err){
// console.log(err)
// res.status(500).json(err)
//   }

//   router.put("/:id",async(req,res)=>{
//  try{
//  const id=req.params.id
//  if (!mongoose.Types.ObjectId.isValid(id)) {
//   return res.status(400).json({ message: "Invalid ID format" });
// }
// console.log(id)
//  const updatedPersonData=req.body
//  console.log(updatedPersonData)
//  const updatedPerson = await person.findByIdAndUpdate(id, updatedPersonData, {
// new: true,
// runValidators: true
// });
// if (!updatedPerson) {
//   return res.status(404).json({ error: 'Person not found'
//   });
//   }
//   else {
//     console.log("Data updated successfully");
//     return res.status(200).json({ message: "Data updated successfully", data: updatedPerson });
// }

// }
//  catch(error){
//   console.error('Error updating person:', error);
//   res.status(500).json({ error: 'Internal server error' });
//  }

//   })

// // router.put("/person/:id", async (req, res) => {
// //   console.log("PUT request received for ID:", req.params.id);
// //   console.log("Request Body:", req.body);
// // });

// })
// module.exports=router

const express = require("express");
const mongoose = require("mongoose"); // Ensure mongoose is imported for ID validation
const person = require("./../models/person"); // Import the Person model
const router = express.Router();

// GET route to fetch data by work type
router.get("/:worktype", async (req, res) => {
  const worktype = req.params.worktype;
  try {
    if (
      worktype === "chef" ||
      worktype === "waiter" ||
      worktype === "manager"
    ) {
      const response = await person.find({ work: worktype });
      console.log("Data fetched successfully:", response);
      res.status(200).json(response);
    } else {
      res.status(404).json("No record found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json("Internal server error");
  }
});

// Basic route to check connection
router.get("/", (req, res) => {
  console.log("GET request received: Connected successfully");
  res.status(200).send("Connected to person routes!");
});

// POST route to create a new person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data); // Create a new person document
    const response = await newPerson.save(); // Save to database
    console.log("New person created:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error creating person:", err);
    res.status(500).json(err);
  }
});
//delete method to delete the particular data by id
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's IDfrom the URL parameter
    // Assuming you have a Person model
    const deletedPerson = await person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    // Send a success message as a JSON response
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route to update person by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB Object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    console.log("Received ID for update:", id);

    const updatedPersonData = req.body; // Get data from request body
    console.log("Data to update:", updatedPersonData);

    // Update person document
    const updatedPerson = await person.findByIdAndUpdate(
      id,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated successfully:", updatedPerson);
    res
      .status(200)
      .json({ message: "Data updated successfully", data: updatedPerson });
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
