const db1Connection = require('../ConnectDB/Mysql');

exports.DisplayLevel = async (req, res) => {
    try {
        const query = `SELECT * FROM level`;

        db1Connection.query(query, (err, results) => {
            if (err) {
                console.error('Error while fetching levels from the database:', err);
                return res.status(500).json({ error: 'Server error' });
            }
            if (results.length > 0) {
                return res.status(200).json(results);
            } else {
                return res.status(404).json({ message: 'No level found' });
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
