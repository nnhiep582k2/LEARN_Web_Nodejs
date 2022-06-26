import pool from '../configs/connectDB';
import multer from 'multer';

let getHomePage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index', { dataUser: rows });
};

let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
    return res.send(JSON.stringify(user));     // pool.execute trả về 2 tham số nên lấy user[0]
};

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(`
        INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`, 
        [firstName, lastName, email, address]
    )
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute(`DELETE FROM users WHERE id=?`, [userId]);
    return res.redirect('/');
}

let getAboutPage = (req, res) => {
    return res.send("I'm NNHiep!"); // Gửi đi chuỗi string
};

let editUser = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
    return res.render('update', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(
        `UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, 
        [firstName, lastName, email, address, id]
    );
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
    return res.render('upload'); 
}

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    console.log(req.file);
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        // else if (err) {
        //     return res.send(err);
        // }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

module.exports = {
    getHomePage,
    getDetailPage,
    getAboutPage,
    createNewUser,
    updateUser,
    deleteUser,
    editUser,
    getUploadFilePage,
    handleUploadFile,
};
