let auctionComments_dbServices = require('../Services/auctionComments_dbServices')

const addAuctionComment = async (req,res)=>{
    console.log("addAuctionComment controller here")

    let user_id = req.body.user_id
    let auction_id = req.body.auction_id
    let comment_text = req.body.comment_text

    let resp = auctionComments_dbServices.addAuctionComment(user_id,auction_id,comment_text)

    res.json(await resp)
    
}
 
const deleteAllAuctionComments = async (req,res)=>{
    console.log("deleteAllAuctionComments controller here")

    let auction_id = req.body.auction_id

    let resp = auctionComments_dbServices.deleteAllAuctionComments(auction_id)

    res.json(await resp)
    
}

const findAllAuctionComments = async (req,res)=>{
    console.log("findAllAuctionComments controller here")

    let auction_id = req.query.auction_id

    let resp = auctionComments_dbServices.findAllAuctionComments(auction_id)

    res.json(await resp)
    
}

module.exports = {

    addAuctionComment,
    deleteAllAuctionComments,
    findAllAuctionComments
    
}