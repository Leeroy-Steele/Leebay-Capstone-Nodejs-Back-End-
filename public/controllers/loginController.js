let login_dbServices = require('../Services/login_dbServices')

//// users table actions

const addUser = async (req,res)=>{
    console.log("addUser controller here")

    let user_name = req.body.user_name
    let email = req.body.email
    let user_password = req.body.user_password

    let allUserData = await login_dbServices.getAllUsers()
    
    let user_nameOk = true
    let emailOk = true

    for(let user in allUserData){   //check user name and email are unique
        // console.log(user)

        if(allUserData[user].user_name===user_name){user_nameOk = false}
        else if(allUserData[user].email===email){emailOk = false}
    }

    if(user_nameOk && emailOk){    // add user to db if ok
        let resp = login_dbServices.addUser(user_name,email,user_password)
        res.json(await resp)
    }

    // error handling 

    else if(user_nameOk){   
        res.json('Failed, email already in use')
    }
    else if(emailOk){
        res.json('Failed, user name already in use')
    }
    else{
        res.json('Something went wrong')
    }


    
}

const deleteUser = async (req,res)=>{
    console.log("deleteUser controller here")

    let user_id = req.body.user_id

    let resp = login_dbServices.deleteUser(user_id)

    res.json(await resp)
    
}

const findUser = async (req,res)=>{
    console.log("findUser controller here")

    let email = req.body.email
    let user_name = req.body.user_name

    let resp = login_dbServices.findUser(email,null,user_name)    // specify either user email / id / user name

    res.json(await resp)
    
}

const findUserAndPassword = async (req,res)=>{
    console.log("findUserAndPassword controller here")

    let email = req.body.email
    let user_password = req.body.user_password

    let resp = login_dbServices.findUserAndPassword(email,user_password)

    res.json(await resp)
    
}

module.exports = {
    addUser,
    deleteUser,
    findUser,
    findUserAndPassword
}