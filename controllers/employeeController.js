const Employee = require("../models/employee");

const createEmployee = async (req, res) => {
  const user = req.user;
  console.log(user);
  const { name, dateOfJoining, department } = req.body;

  let success = false;

  try {
    const newEmployee = new Employee({
      name,
      dateOfJoining,
      department,
      createdBy: user.id,
    });

    await newEmployee.save();

    success = true;
    return res.status(201).json({ success, newEmployee });
  } catch (err) {
    return res.status(500).json({ success, error: err.message });
  }
};

const showEmployees = async (req, res) => {
  let success = false;

  try {
    const employees = await Employee.find();

    success = true;
    return res.status(200).json({ success, employees });
  } catch (err) {
    return res.status(500).json({ success, error: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const empId = req.params.id;
  const user = req.user;
  let success = false;

  try {
    const { name, dateOfJoining, department } = req.body;

    const foundEmployee = await Employee.findById(empId);

    if (foundEmployee) {
      if (!(foundEmployee.createdBy == user.id)) {
        return res.status(401).json({
          success,
          error:
            "WARNING! You don't have the authority to manipulate this employee.",
        });
      } else {
        let updatedEmployee = {};

        if (name) {
          updatedEmployee.name = name;
        }
        if (dateOfJoining) {
          updatedEmployee.dateOfJoining = dateOfJoining;
        }
        if (department) {
          updatedEmployee.department = department;
        }

        await Employee.findByIdAndUpdate(foundEmployee._id, {
          $set: updatedEmployee,
        });

        success = true;
        return res.status(201).json({ success, message: "Employee Updated" });
      }
    } else {
      return res
        .status(404)
        .json({ success, message: "Employee does not exist." });
    }
  } catch (err) {
    return res.status(500).json({ success, error: err.message });
  }
};

const deleteEmployee = async (req, res) => {
    let success = false
  try {
    const empId = req.params.id;
    const user = req.user;

    const foundEmployee = await Employee.findById(empId);

    if (!foundEmployee) {
      return res
        .status(404)
        .json({ success, message: "Employee does not exist." });
    } else {
      if (!(foundEmployee.createdBy == user.id)) {
        console.log(foundEmployee.createdBy, user.id)
        return res.status(401).json({
          success,
          error:
            "WARNING! You don't have the authority to manipulate this employee.",
        });
      } else {
        await Employee.findByIdAndDelete(foundEmployee._id);

        success = true
        return res.status(201).json({ success, message: "Employee Deleted" });
      }

    }
  } catch (err) {
    return res.status(500).json({ success, error: err.message });
  }
};

module.exports = {createEmployee, showEmployees, updateEmployee, deleteEmployee}