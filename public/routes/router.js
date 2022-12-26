var express = require('express');
var router = express.Router();
let controller = require('../controllers/controller')

// let x = require('../../../capstone_react_frontend/src/images')

////// routes start here

// //// Multer starts here

const multer = require('multer')

//multer options

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../capstone_react_frontend/public/images')   //folder to store images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) +'.jpg'

        const fileName = file.fieldname + '-' + uniqueSuffix
        cb(storeImageURLToDatabase(fileName,req), fileName)
    }
})

function storeImageURLToDatabase(fullUrlName,req){
    controller.storeImageURLToDatabase(fullUrlName,req)
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 9000000,
        },
        fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|PNG|jpg|jpeg)$/)){ //if wrong file type, throw error via cb(callback)
        cb(new Error('Please upload an image.'))
        }
        cb(undefined, true) //allow file through
        
        }
})

router.post('/addAuctionPhoto', upload.single('auctionImage'), (req, res) => {

    res.send('worked!')
    }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

//// users table actions

router.post('/addUser',(req,res)=>{
    console.log("addUser router here")
    controller.addUser(req,res)
})

router.delete('/deleteUser',(req,res)=>{
    console.log("deleteUser router here")
    controller.deleteUser(req,res)
})

router.get('/findUser',(req,res)=>{
    console.log("findUser router here")
    controller.findUser(req,res)
})

router.post('/findUserAndPassword',(req,res)=>{
    console.log("findUserAndPassword router here")
    controller.findUserAndPassword(req,res)
})

//// auction_items table actions

router.post('/addAuctionItem',(req,res)=>{
    console.log("addAuctionItem router here")
    controller.addAuctionItem(req,res)
})

router.delete('/deleteAuctionItem',(req,res)=>{
    console.log("deleteAuctionItem router here")
    controller.deleteAuctionItem(req,res)
})

router.get('/findAllAuctionItems',(req,res)=>{
    console.log("findAllAuctionItems router here")
    controller.findAllAuctionItems(req,res)
})

router.get('/findAuctionItem',(req,res)=>{
    console.log("findAuctionItem router here")
    controller.findAuctionItem(req,res)
})

router.patch('/placeBid',(req,res)=>{
    console.log("placeBid router here")
    controller.placeBid(req,res)
})

//// auction comments actions

router.post('/addAuctionComment',(req,res)=>{
    console.log("addAuctionComment router here")
    controller.addAuctionComment(req,res)
})

router.delete('/deleteAllAuctionComments',(req,res)=>{
    console.log("deleteAllAuctionComments router here")
    controller.deleteAllAuctionComments(req,res)
})

router.get('/findAllAuctionComments',(req,res)=>{
    console.log("findAllAuctionComments router here")
    controller.findAllAuctionComments(req,res)
})

//// export here

module.exports = router;


