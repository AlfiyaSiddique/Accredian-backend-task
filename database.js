import mysql2 from "mysql2";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();
const connection = mysql2.createPool({
  host: process.env["DB_HOST"],
  database: process.env["DB_NAME"],
  user: process.env["DB_USER"],
  password: process.env["DB_PASSWORD"],
  port: process.env["DB_PORT"],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Run only Once
// const createUserTable = (id) => {
//   const command = `CREATE TABLE users (
//     id int(11) NOT NULL AUTO_INCREMENT,
//     username varchar(45) NOT NULL,
//     email varchar(45) NOT NULL,
//     password varchar(255) NOT NULL,
//     PRIMARY KEY (id),
//     UNIQUE KEY username_UNIQUE (username),
//     UNIQUE KEY email_UNIQUE (email)
//   ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`
  
//   connection.query(command, (err) => {
//     if (err) console.log(err);
//   })
// }

// createUserTable();

const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmailUser(user.email);
      if (check) {
        reject(`The email ${user.email} already exist. Try with another email.`)
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      connection.query(`insert into users (email, username, password) values ('${user.email}','${user.name}','${hash}')`, (err, rows) => {
        if (err) {
          reject(err+"")
        }
        else {
          resolve("Account Created Successfully! Log In")
        }
      })
    } catch (e) {
      reject(e)
      console.log("" + e)
    }
  })
}

const checkEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`select * from users where email = '${email}'`, (err, row) => {
        if (err) reject(err);
        if (row.length > 0) { resolve(true) }
        resolve(false);
      })
    } catch (e) {
      console.log("" + e)
      reject(e);
    }
  })
}


const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`select * from users where email = '${email}'`, (err, row) => {
        if (err) reject(err);
        if (row.length < 1) { reject("User not found") }
        let user = row[0];
        resolve(user);
      })
    } catch (e) {
      console.log("123" + e)
      reject(e);
    }
  })
}

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`select * from users where userid = '${id}'`, (err, row) => {
        if (err) reject(err);
        let user = row[0];
        resolve(user);
      })
    } catch (e) {
      console.log("2" + e)
      reject(e);
    }
  })
}

const comparePassword = (password, user) => {
  return new Promise((resolve, reject) => {
    try {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) resolve(true);
      else reject("The password is incorrect")

    } catch (e) {
      console.log("3" + e)
      reject(e)
    }
  })
}


const database = {
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  comparePassword: comparePassword,
  getUserById: getUserById,
  connection: connection
};

export default database;
