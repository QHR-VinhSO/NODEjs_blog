import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    let [infor] = await pool.execute(`select * from users`);
    return res.render('index.ejs', { dataUser: infor });
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [id])
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;
    let Email = req.body.Email;
    let Address = req.body.Address;
    await pool.execute(`insert into users(FirstName,LastName,Email,Address) values (?,?,?,?)`, [FirstName, LastName, Email, Address]);
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [id]);
    return res.render('update.ejs', { dataUser: user[0] })
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute(`delete from users where id = ?`, [userId]);
    return res.redirect('/');
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(`update users set FirstName =?, LastName =?,Email =?,Address =? where ID =?`,
        [firstName, lastName, email, address, id]);
    return res.redirect('/');
}
module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}