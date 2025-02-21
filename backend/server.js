require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Hỗ trợ JSON request body

// Kết nối MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Thay bằng user của bạn
    password: process.env.DB_PASSWORD, // Thay bằng mật khẩu của bạn
    database: process.env.DB_NAME, // Thay bằng tên database của bạn
});

db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
        return;
    }
    console.log('Đã kết nối MySQL thành công!');
});

// API lấy danh sách người dùng
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// API thêm người dùng mới
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json({ message: 'User added successfully', userId: result.insertId });
            }
        }
    );
});

app.post('/login', (req, res) => { 
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            if (results.length > 0) {
                const user = results[0];
                if (user.password === password) {
                    res.json({ message: 'Login successful', user });
                } else {
                    res.status(401).json({ message: 'Login failed' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    });
});

app.post('/delete-user', (req, res) => { 
    const { email, password } = req.body;

    // Tìm user theo email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        } 

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        // Kiểm tra mật khẩu có đúng không
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Xóa user nếu mật khẩu đúng
        db.query('DELETE FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error', details: err });
            }
            res.json({ message: 'User deleted successfully' });
        });
    });
});

app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

app.post('/projects', (req, res) => {
    const {
        projectId, projectTitle, projectManager, projectStartDate, projectEndDate,
        projectLocation, projectInfo, projectNumberOfEmployees, projectBudget,
        projectEstimate, projectAcceptance, projectPayment, projectProgress, projectStatus
    } = req.body;

    if (
        !projectId || !projectTitle || !projectManager || !projectStartDate || !projectEndDate ||
        !projectProgress || !projectStatus
    ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (isNaN(projectNumberOfEmployees) || projectNumberOfEmployees < 0) {
        return res.status(400).json({ error: "Invalid number of employees" });
    }
    if (isNaN(projectBudget) || projectBudget < 0) {
        return res.status(400).json({ error: "Invalid budget value" });
    }
    if (isNaN(projectProgress) || projectProgress < 0 || projectProgress > 100) {
        return res.status(400).json({ error: "Project progress must be between 0 and 100" });
    }

    const validStatuses = ['Ongoing', 'Delayed', 'Deadline', 'Slowed', 'Completed'];
    if (!validStatuses.includes(projectStatus)) {
        return res.status(400).json({ error: "Invalid project status" });
    }

    db.query(
        `INSERT INTO projects
        (project_id, project_title, project_manager, project_start_date, project_end_date,
        project_location, project_info, project_number_of_employees, project_budget,
        project_estimate, project_acceptance, project_payment, project_progress, project_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            projectId, projectTitle, projectManager, projectStartDate, projectEndDate,
            projectLocation, projectInfo, projectNumberOfEmployees, projectBudget,
            projectEstimate, projectAcceptance, projectPayment, projectProgress, projectStatus
        ],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Project ID already exists" });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Project added successfully', projectId: result.insertId });
        }
    );
});

app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/projects/status-summary', (req, res) => {
    db.query('SELECT project_status, COUNT(*) AS total FROM projects GROUP BY project_status', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/projects/filter', (req, res) => {
    const { status, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM projects WHERE project_status = ?';
    let values = [status];

    if (search) {
        sql += ' AND (project_id LIKE ? OR project_title LIKE ? OR project_manager LIKE ?)';
        values.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' LIMIT ? OFFSET ?';
    values.push(parseInt(limit), parseInt(offset));

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
