
let auction_dbServices = require('../services/auction_dbServices')

// for deleting files

const fs = require('fs');   
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

//// auction_items table actions

const addAuctionItem = async (req,res)=>{
    console.log("addAuctionItem controller here")

    let seller_user_id = req.body.seller_user_id
    let highest_bidder_id = req.body.highest_bidder_id
    let category = req.body.category
    let image_path = req.body.image_path

    let auction_title = req.body.auction_title
    let item_location = req.body.item_location
    let item_description = req.body.item_description
    let current_price = req.body.current_price
    let end_date = req.body.end_date

    let resp = auction_dbServices.addAuctionItem(    
        seller_user_id,
        highest_bidder_id,
        category,
        image_path,
        auction_title,
        item_location,
        item_description,
        current_price,
        end_date
        )

    res.json(await resp)
    
}

const deleteAuctionItem = async (req,res)=>{
    console.log("deleteAuctionItem controller here")

    //first decide if image should be deleted (If auction is being moved to expired auctions table then image stays)

    let deleteImage = req.body.delete_image
    let auction_id = req.body.auction_id

    // if yes then find image path

    if(deleteImage){
        console.log('inside delete image block')
        
        let auctionItem = await auction_dbServices.findAuctionItem(auction_id)
        let imagePath = auctionItem[0].image_path
        let adjustedImagePath = '../capstone_react_frontend/public' + imagePath.slice(2)

        // then delete image from folder path (if it's not default auction image!)
        
        defaultImagePath = '../capstone_react_frontend/public/images/noImagePicture.png'

        if(adjustedImagePath!==defaultImagePath){

            await unlinkAsync(adjustedImagePath)
        }
    }
    // then delete auction from db

    
    let resp = auction_dbServices.deleteAuctionItem(auction_id)

    if(res!==null){res.json(await resp)} //needed if called from controller directly
    
}

const findAllAuctionItems = async (req,res)=>{
    console.log("findAllAuctionItems controller here")

    let user_id = req.query.user_id 
    let bidder_id = req.query.bidder_id 

    let resp = auction_dbServices.findAllAuctionItems(user_id,bidder_id)

    res.json(await resp)
    
}

const findAuctionItem = async (req,res)=>{
    console.log("findAuctionItem controller here")

    let auction_id = req.query.auction_id

    let resp = auction_dbServices.findAuctionItem(auction_id)

    res.json(await resp)
    
}

const placeBid = async (req,res)=>{
    console.log("placeBid controller here")

    let bidder_id = req.body.bidder_id
    let bid = req.body.bid
    let auction_id = req.body.auction_id

    let resp = auction_dbServices.placeBid(bidder_id,auction_id,bid)

    res.json(await resp)
    
}


////////    store new image url


const storeImageURLToDatabase=async(url,req)=>{
    // console.log(req.body)
    let auction_id=req.query.auction_id
    auction_dbServices.storeImageURLToDatabase(url,auction_id)
}

///////     retrieve expired auction for front end profile page

const findAllExpiredAuctionItems = async (req,res)=>{
    console.log("findAllExpiredAuctionItems controller here")

    let highest_bidder_id = req.query.highest_bidder_id  

    let resp = auction_dbServices.findAllExpiredAuctionItems(highest_bidder_id)

    res.json(await resp)
    
}

//// export here

module.exports = {

    addAuctionItem,
    deleteAuctionItem,
    findAllAuctionItems,
    storeImageURLToDatabase,
    placeBid,
    findAuctionItem,
    findAllExpiredAuctionItems
    
}