
let dbServices = require('../Services/dbServices')
const fs = require('fs');

//// users table actions

const addUser = async (req,res)=>{
    console.log("addUser controller here")

    let user_name = req.body.user_name
    let email = req.body.email
    let user_password = req.body.user_password

    let allUserData = await dbServices.getAllUsers()
    
    let user_nameOk = true
    let emailOk = true

    for(let user in allUserData){   //check user name and email are unique
        // console.log(user)

        if(allUserData[user].user_name===user_name){user_nameOk = false}
        else if(allUserData[user].email===email){emailOk = false}
    }

    if(user_nameOk && emailOk){    // add user to db if ok
        let resp = dbServices.addUser(user_name,email,user_password)
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
    let resp = dbServices.deleteUser(req,res)

    res.json(await resp)
    
}

const findUser = async (req,res)=>{
    console.log("findUser controller here")

    let email = req.body.email
    let user_name = req.body.user_name

    let resp = dbServices.findUser(email,null,user_name)    // specify either user email / id / user name

    res.json(await resp)
    
}

const findUserAndPassword = async (req,res)=>{
    console.log("findUserAndPassword controller here")

    let email = req.body.email
    let user_password = req.body.user_password

    console.log("email is ", email)
    console.log('password is ',user_password)

    let resp = dbServices.findUserAndPassword(email,user_password)

    res.json(await resp)
    
}

//// auction_items table actions

const addAuctionItem = async (req,res)=>{
    console.log("addAuctionItem controller here")
    let resp = dbServices.addAuctionItem(req,res)

    res.json(await resp)
    
}

const deleteAuctionItem = async (req,res)=>{
    console.log("deleteAuctionItem controller here")

    let resp = dbServices.deleteAuctionItem(req,res)

    if(res!==null){res.json(await resp)} //needed if called from controller directly
    
}

const findAllAuctionItems = async (req,res)=>{
    console.log("findAllAuctionItems controller here")

    let user_id = req.query.user_id           //finalise this part *******

    let resp = dbServices.findAllAuctionItems(user_id)

    res.json(await resp)
    
}

const findAuctionItem = async (req,res)=>{
    console.log("findAuctionItem controller here")

    let auction_id = req.query.auction_id

    let resp = dbServices.findAuctionItem(auction_id)

    res.json(await resp)
    
}

const placeBid = async (req,res)=>{
    console.log("placeBid controller here")

    let bidder_id = req.body.bidder_id
    let bid = req.body.bid
    let auction_id = req.body.auction_id

    let resp = dbServices.placeBid(bidder_id,auction_id,bid)

    res.json(await resp)
    
}

//// auction comments actions

const addAuctionComment = async (req,res)=>{
    console.log("addAuctionComment controller here")
    let resp = dbServices.addAuctionComment(req,res)

    res.json(await resp)
    
}
 
const deleteAllAuctionComments = async (req,res)=>{
    console.log("deleteAllAuctionComments controller here")
    let resp = dbServices.deleteAllAuctionComments(req,res)

    res.json(await resp)
    
}

const findAllAuctionComments = async (req,res)=>{
    console.log("findAllAuctionComments controller here")

    let auction_id = req.body.auction_id

    let resp = dbServices.findAllAuctionComments(auction_id)

    res.json(await resp)
    
}

const checkDatabaseForExpiredAuctions = async ()=>{
    console.log("checkDatabaseForExpiredAuctions here")

    // get expired items 

    let results = await dbServices.findExpiredAuctionItems()

    //delete expired items from auction table

    for(let item in results){
        let auction_id = results[item].auction_id
        let req1 = {
            body:{"auction_id":auction_id}
        }

        deleteAuctionItem(req1,null)
    }

    //update items to include additional seller information and insert into closed auction table

    for(let expiredItem in results){   
        let seller_id = await results[expiredItem].seller_user_id   
        let userData = await dbServices.findUser(null,seller_id,null)
        
        results[expiredItem].seller_user_name = userData[0].user_name
        results[expiredItem].seller_email = userData[0].email

        dbServices.insertClosedAuctionItem(results[expiredItem])
    }
  
}
setInterval(checkDatabaseForExpiredAuctions,10000)    //regular check for expired auctions  

const storeImageURLToDatabase=async(url,req)=>{
    // console.log(req.body)
    dbServices.storeImageURLToDatabase(url,req)
}

//// export here

module.exports = {
    addUser,
    deleteUser,
    findUser,
    findUserAndPassword,
    addAuctionItem,
    deleteAuctionItem,
    findAllAuctionItems,
    addAuctionComment,
    deleteAllAuctionComments,
    findAllAuctionComments,
    storeImageURLToDatabase,
    placeBid,
    findAuctionItem
    
}