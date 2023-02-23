
const sql = require("../../server")

//// users table actions

let addUser = async (user_name,email,user_password)=>{
    console.log("db services addUser here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `INSERT INTO users (user_name,email,user_password) VALUES ("${user_name}","${email}","${user_password}")`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });
    });
}

let deleteUser = async (user_id)=>{ 
    console.log("db services deleteUser here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `DELETE FROM users WHERE user_id="${user_id}"`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });
    });
}

let findUser = async (email,id,userName)=>{   //find user by either id or name 
    console.log("db services findUser here")

    if(id){
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE user_id='${id}'`;
            
            sql.query(sqlQuery, (err, result, field) => {
                if(err) return reject(err);
                
                resolve(Object.values(result));
                
            });
        });
    }
    else if(email){
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE email='${email}'`;
            
            sql.query(sqlQuery, (err, result, field) => {
                if(err) return reject(err);
                
                resolve(Object.values(result));
                
            });
        });
    }
    else if(userName){
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE user_name='${userName}'`;
            
            sql.query(sqlQuery, (err, result, field) => {
                if(err) return reject(err);
                
                resolve(Object.values(result));
                
            });
        });
    }
    else{return "specify name, id or user name"}


}

let findUserAndPassword = async (email,user_password)=>{
    console.log("db services findUserAndPassword here")

    return new Promise((resolve, reject) => {
    
        let sqlQuery = `SELECT  user_name,user_id  FROM users WHERE email='${email}' AND user_password='${user_password}'`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
            
        });
    });
}

let getAllUsers = async ()=>{   //find user by either id or name 
    console.log("db services getAllUsers here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM users`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
            
        });
    });

}


//// export here
 
module.exports = {
    addUser,
    deleteUser,
    findUser,
    findUserAndPassword,
    getAllUsers

}




