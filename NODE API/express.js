const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = mongoose.connect(`mongodb+srv://IamSHUBH:iamshubh@cluster0.vopvpue.mongodb.net/`)
    // Promises
    .then(() => {
        console.log("Connection Created")
    })
    .catch((err) => {
        console.log(`There will be some error ${err}`)
    });

app.get("/", (req, res) => {
    res.send("Hello, My Name is Shubham");
});

// Define Employee Schema and Model
const employeeSchema = new mongoose.Schema({
    EmpId: Number,
    EmpName: String,
    // EmpFirstName: String,
    // EmpLastName: String,
    EmpAddress: String,
    EmpBirthDate: String,
    EmpMonbNo: Number,
    EmpEmailId: String,
    EmpDesignation: String,
    EmpJoinDate: String,
    EmpSalary: Number

    // Add more fields as needed
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(express.json());

// Read Employee
app.get('/employee', async (req, res) => {
    try {
        const employee = await Employee.find();
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Create Employee
app.post('/employee', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// Update an employee
app.put('/employee/:id', async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated employee
      );
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  });
  
  // Delete an employee
  app.delete('/employee/:id', async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ...
  


app.listen(5050);