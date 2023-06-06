import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    let [infor] = await pool.execute(`select * from users`);
    return res.status(200).json({
        message: 'ok',
        dataUser: infor
    })
}

let createNewUser = async (req, res) => {
    let { FirstName, LastName, Email, Address } = req.body;

    if (!FirstName || !LastName || !Email || !Address) {
        return res.status(200).json({
            message: 'missing req params'
        })
    }
    await pool.execute(`insert into users(FirstName,LastName,Email,Address) values (?,?,?,?)`,
        [FirstName, LastName, Email, Address]);
    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing req params'
        })
    }
    await pool.execute(`update users set FirstName =?, LastName=?,Email=?,Address=? where ID=?`,
        [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'ok'
    })

}

let deleteUser = async (req, res) => {
    let userId = req.body.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing req params'
        })
    }
    await pool.execute(`delete from users where id = ?`, [userId]);
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}