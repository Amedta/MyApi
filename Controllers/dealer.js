const db1Connection = require('../ConnectDB/Mysql');

exports.DisplaySomething = async (req, res) => {
    const query = `SELECT 
    Users.Users_id, 
    Users.FirstName, 
    Users.SurName, 
    level.level_name FROM Users JOIN level ON Users.level_id = level.level_id;
`;
    db1Connection.query(query, (err, results) => {
        if (err) {
            console.error('Error while fetching user from the database:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ message: 'No user found' });
        }
    }); 
};
//
exports.DisplayUser = async (req, res) => {
    const query = `SELECT 
    Users.Users_id, 
    Users.FirstName, 
    Users.SurName,  
    Users.Address, 
    DATE_FORMAT(Users.Birthday, '%Y-%m-%d') AS Birthday, 
    Users.Tel, 
    level.level_name FROM Users JOIN level ON Users.level_id = level.level_id;
`;
    db1Connection.query(query, (err, results) => {
        if (err) {
            console.error('Error while fetching user from the database:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ message: 'No user found' });
        }
    }); 
};
exports.InsertUser = async (req, res) => {
    const { FirstName, SurName, Address, Birthday, Tel, level_id } = req.body;

    if (!FirstName || !SurName || !Address || !Birthday || !Tel || !level_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userData = { FirstName, SurName, Address, Birthday, Tel, level_id };
        db1Connection.query('INSERT INTO Users SET ?', userData, (err, results) => {
            if (err) {
                console.error('Error while inserting a user into the database:', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            return res.status(201).json({ message: 'New user successfully created!' });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
// Update dealer
exports.UpdateUser = async (req, res) => {
    const { Users_id } = req.params;
    const { FirstName, SurName, Address, Birthday, Tel, level_id } = req.body;

    if (!FirstName || !SurName || !Address || !Birthday || !Tel) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    let updatedFields = {};
    if (FirstName) updatedFields.FirstName = FirstName;
    if (SurName) updatedFields.SurName = SurName;
    if (Address) updatedFields.Address = Address;
    if (Birthday) updatedFields.Birthday = Birthday;
    if (Tel) updatedFields.Tel = Tel;
    if (level_id) updatedFields.level_id = level_id;

    try {
        db1Connection.query('UPDATE Users SET ? WHERE Users_id = ?', [updatedFields, Users_id], (err, results) => {
            if (err) {
                console.error('Error while updating the user in the database:', err);
                return res.status(500).json({ error: 'Failed to update user' });
            }
            if (results.affectedRows > 0) {
                return res.status(200).json({ message: 'User successfully updated!' });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// delete dealer 
exports.DeleteUser = async (req, res) => {
    const { Users_id } = req.params;
    db1Connection.query('DELETE FROM Users WHERE Users_id = ?', [Users_id], (err, results) => {
        if (err) {
            console.error('Error while deleting the user from the database:', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }

        if (results.affectedRows > 0) {
            return res.status(200).json({ message: 'user successfully deleted!' });
        } else {
            return res.status(404).json({ message: 'user not found' });
        }
    }); 
}