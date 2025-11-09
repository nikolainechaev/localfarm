import { Router } from 'express';
import { EmployeeService } from '../services/employee.js';
import { Employee } from '../classes/employee.js';

const router = Router();
const employeeService = new EmployeeService();


// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await employeeService.getAll()
    res.json(employees)
  } catch (error) {
    res.status(500).json({ error: "Can't retrieve employees" })
  }
})

// GET employee by ID
router.get('/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const employee = await employeeService.getById(uuid)
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' })
    }
    res.json(employee)
  } catch (error) {
    res.status(500).json({ error: "Can't retrieve employee" })
  }
})

// POST new employee
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, hire_date, salary } = req.body
    const employee = new Employee(
      first_name,
      last_name,
      new Date(hire_date),
      salary
    )
    if (
      typeof first_name !== 'string' || first_name.trim() === '' ||
      typeof last_name !== 'string' || last_name.trim() === '' ||
      typeof hire_date !== 'string' || isNaN(Date.parse(hire_date)) ||
      (typeof salary !== 'number' && typeof salary !== 'string') || isNaN(Number(salary))
    ) {
      return res.status(400).json({ error: 'Invalid or missing required fields: first_name, last_name, hire_date, salary' });
    }
    const created = await employeeService.create(employee)
    if (!created) {
      return res.status(500).json({ error: "Can't create employee" })
    }
    res.status(201).json(created)
  } catch (error) {
    res.status(500).json({ error: "Can't create employee" })
  }
})

// PUT update employee
router.put('/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { first_name, last_name, hire_date, salary } = req.body
    const employee = new Employee(
      first_name,
      last_name,
      new Date(hire_date),
      salary,
      uuid
    )
    if (
      typeof first_name !== 'string' || first_name.trim() === '' ||
      typeof last_name !== 'string' || last_name.trim() === '' ||
      typeof hire_date !== 'string' || isNaN(Date.parse(hire_date)) ||
      (typeof salary !== 'number' && typeof salary !== 'string') || isNaN(Number(salary))
    ) {
      return res.status(400).json({ error: 'Invalid or missing required fields: first_name, last_name, hire_date, salary' });
    }
    const updated = await employeeService.update(
      employee
    )
    if (!updated) {
      return res.status(404).json({ error: 'Employee not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: "Can't update employee" })
  }
})

// DELETE employee
router.delete('/:uuid', async (req, res) => {
  try {
    const success = await employeeService.delete(req.params.uuid)
    if (!success) {
      return res.status(404).json({ error: 'Employee not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: "Can't delete employee" })
  }
})

export default router;
