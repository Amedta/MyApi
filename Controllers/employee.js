const db1Connection = require('../ConnectDB/Mysql');
const bcrypt = require('bcryptjs');

exports.DisplayWhoLogin = async (req, res) => {
    try {
        const query = `SELECT * FROM login`;
        db1Connection.query(query, (err, results) => {
            if (err) {
                console.error('Error while fetching user from the database:', err);
                return res.status(500).json({ error: 'Server error' });
            }
            if (results.length > 0) {
                // Format the login_time to display only the date
                results = results.map(result => {
                    result.login_time = new Date(result.login_time).toISOString().split('T')[0];
                    return result;
                });
                return res.status(200).json(results);
            } else {
                return res.status(404).json({ message: 'No user found' });
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.Register = async (req, res) => {
    const { Emp_Name, Emp_Surname, Emp_add, Username, Emp_tel, Password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Password, 10);
        const userData = { Emp_Name, Emp_Surname, Emp_add, Username, Emp_tel, Password: hashedPassword };
        db1Connection.query('INSERT INTO Employee SET ?', userData, (err, results) => {
            if (err) {
                console.error('Error while inserting a user into the database:', err);
                return res.status(400).json({ error: 'Failed to register user' });
            }
            return res.status(201).json({ message: 'New user successfully created!' });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.Login = async (req, res) => {
    const { Emp_tel, Password } = req.body;

    if (!Emp_tel || !Password) {
        return res.status(400).json({ error: 'Phone and password are required' });
    }

    try {
        const query = "SELECT * FROM Employee WHERE Emp_tel = ?";
        db1Connection.query(query, [Emp_tel], async (err, results) => {
            if (err) {
                console.error('Error while querying the database:', err);
                return res.status(500).json({ error: 'Server error' });
            }

            if (results.length > 0) {
                const user = results[0];
                const match = await bcrypt.compare(Password, user.Password);
                if (match) {
                    const Username = user.Username;
                    const currentTime = new Date();
                    const logQuery = "INSERT INTO Login(Username, login_time) VALUES (?, ?)";
                    db1Connection.query(logQuery, [Username, currentTime], (err) => {
                        if (err) {
                            console.error('Error while logging the login event:', err);
                        }
                    });
                    return res.status(200).json({ message: 'Login successful' });
                } else {
                    return res.status(401).json({ error: 'Invalid phone or password' });
                }
            } else {
                return res.status(401).json({ error: 'Invalid phone or password' });
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.Update = async (req, res) => {
    const { Employee_id } = req.params;
    const { Emp_Name, Emp_Surname, Emp_add, Username, Emp_tel } = req.body;

    if (!Username && !Emp_tel && !Emp_Name && !Emp_Surname && !Emp_add) {
        return res.status(400).json({ error: 'At least one field is required to update' });
    }

    let updatedFields = {};
    if (Username) updatedFields.Username = Username;
    if (Emp_tel) updatedFields.Emp_tel = Emp_tel;
    if (Emp_Name) updatedFields.Emp_Name = Emp_Name;
    if (Emp_Surname) updatedFields.Emp_Surname = Emp_Surname;
    if (Emp_add) updatedFields.Emp_add = Emp_add;

    try {
        db1Connection.query('UPDATE Employee SET ? WHERE Employee_id = ?', [updatedFields, Employee_id], (err, results) => {
            if (err) {
                console.error('Error while updating the Employee in the database:', err);
                return res.status(500).json({ error: 'Failed to update Employee' });
            }
            if (results.affectedRows > 0) {
                return res.status(200).json({ message: 'Employee successfully updated!' });
            } else {
                return res.status(404).json({ message: 'Employee not found' });
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.Delete = async (req, res) => {
    const { Employee_id } = req.params;

    try {
        db1Connection.query('DELETE FROM Employee WHERE Employee_id = ?', [Employee_id], (err, results) => {
            if (err) {
                console.error('Error while deleting the Employee from the database:', err);
                return res.status(500).json({ error: 'Failed to delete Employee' });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({ message: 'Employee successfully deleted!' });
            } else {
                return res.status(404).json({ message: 'Employee not found' });
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
