let auction_dbServices = require('../services/auction_dbServices')
let auctionController = require('./auctionController')
let login_dbServices = require('../services/login_dbServices')

///// expired auction_items actions

const checkDatabaseForExpiredAuctions = async ()=>{
    console.log("checkDatabaseForExpiredAuctions here")

    // get expired items 

    let results = await auction_dbServices.findExpiredAuctionItems()

    //delete expired items from auction table

    for(let item in results){
        let auction_id = results[item].auction_id
        let req1 = {
            body:{
                "auction_id":auction_id,
                "delete_image":false
            }
        }

        auctionController.deleteAuctionItem(req1,null)
    }

    //update items to include additional seller information and insert into closed auction table

    for(let expiredItem in results){   
        let seller_id = await results[expiredItem].seller_user_id   
        let userData = await login_dbServices.findUser(null,seller_id,null)
        
        results[expiredItem].seller_user_name = userData[0].user_name
        results[expiredItem].seller_email = userData[0].email

        auction_dbServices.insertClosedAuctionItem(results[expiredItem])
    }
  
}

setInterval(checkDatabaseForExpiredAuctions,5000)    //regular check for expired auctions  

module.exports = {checkDatabaseForExpiredAuctions}