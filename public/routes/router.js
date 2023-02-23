var express = require('express');
var router = express.Router();
let auctionController = require('../controllers/auctionController')
let automatedController = require('../controllers/automatedController')
let loginController = require('../controllers/loginController')
let auctionCommentsController = require('../controllers/auctionCommentsController')

//// Multer starts here  (For image upload)

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '../capstone_react_frontend/public/images')   //folder to store images
        cb(null, '../capstone_react_frontend/public/images')   //folder to store images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) +'.jpg'

        const fileName = file.fieldname + '-' + uniqueSuffix
        cb(storeImageURLToDatabase(fileName,req), fileName)
    }
})

function storeImageURLToDatabase(fullFileName,req){
    auctionController.storeImageURLToDatabase(fullFileName,req)
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

////// routes start here

//// users table actions

router.post('/addUser',(req,res)=>{
    console.log("addUser router here")
    loginController.addUser(req,res)
})

router.delete('/deleteUser',(req,res)=>{
    console.log("deleteUser router here")
    loginController.deleteUser(req,res)
})

router.post('/findUser',(req,res)=>{
    console.log("findUser router here")
    loginController.findUser(req,res)
})

router.post('/findUserAndPassword',(req,res)=>{
    console.log("findUserAndPassword router here")
    loginController.findUserAndPassword(req,res)
})

//// auction_items table actions

router.post('/addAuctionItem',(req,res)=>{
    console.log("addAuctionItem router here")
    auctionController.addAuctionItem(req,res)
})

router.post('/addAuctionPhoto', upload.single('auctionImage'), (req, res) => {
    res.send('worked!')
    }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/deleteAuctionItem',(req,res)=>{
    console.log("deleteAuctionItem router here")
    auctionController.deleteAuctionItem(req,res)
})

router.get('/findAllAuctionItems',(req,res)=>{
    console.log("findAllAuctionItems router here")
    auctionController.findAllAuctionItems(req,res)
})

router.get('/findAuctionItem',(req,res)=>{
    console.log("findAuctionItem router here")
    auctionController.findAuctionItem(req,res)
})

router.patch('/placeBid',(req,res)=>{
    console.log("placeBid router here")
    auctionController.placeBid(req,res)
})

//// auction comments actions

router.post('/addAuctionComment',(req,res)=>{
    console.log("addAuctionComment router here")
    auctionCommentsController.addAuctionComment(req,res)
})

router.delete('/deleteAllAuctionComments',(req,res)=>{
    console.log("deleteAllAuctionComments router here")
    auctionCommentsController.deleteAllAuctionComments(req,res)
})

router.get('/findAllAuctionComments',(req,res)=>{
    console.log("findAllAuctionComments router here")
    auctionCommentsController.findAllAuctionComments(req,res)
})

//// expired auction_items table actions

router.get('/findAllExpiredAuctionItems',(req,res)=>{
    console.log("findAllExpiredAuctionItems router here")
    auctionController.findAllExpiredAuctionItems(req,res)
})

//// export here

module.exports = router;


