const express = require('express');
const router = express.Router();
const {createEmployee, showEmployees, updateEmployee,deleteEmployee} = require('../controllers/employeeController');
const fetchUser = require('../middleware/fetchUser');

router.post('/create', fetchUser, createEmployee);
router.get('/show', fetchUser, showEmployees);
router.put('/update/:id', fetchUser, updateEmployee);
router.delete('/delete/:id', fetchUser, deleteEmployee);

module.exports = router;