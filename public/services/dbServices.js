
const { query } = require("express")
const sql = require("../../index")

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

let deleteUser = async (req,res)=>{ 
    console.log("db services deleteUser here")

    let user_id = req.body.user_id

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
    
        let sqlQuery = `SELECT * FROM users WHERE email='${email}' AND user_password='${user_password}'`;
        
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

//// auction_items table actions  

let addAuctionItem = async (req,res)=>{
    console.log("db services addAuctionItem here")

    // let auction_id = req.body.auction_id
    let seller_user_id = req.body.seller_user_id
    let highest_bidder_id = req.body.highest_bidder_id
    let category = req.body.category
    let image_path = req.body.image_path

    let auction_title = req.body.auction_title
    let item_location = req.body.item_location
    let item_description = req.body.item_description
    let current_price = req.body.current_price
    let end_date = req.body.end_date

   console.log(seller_user_id )
  console.log( highest_bidder_id)
   console.log(category )
   console.log(image_path)

   console.log(auction_title)
   console.log(item_location )
   console.log(item_description )
  console.log( current_price )
   console.log(end_date )

    return new Promise((resolve, reject) => {
        let sqlQuery1 = `INSERT INTO auction_items (
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
                            VALUES(
                                ${seller_user_id},
                                ${highest_bidder_id},
                                "${category}",
                                "${image_path}",
                                "${auction_title}","${item_location}",
                                "${item_description}",
                                 ${current_price},
                                "${end_date}"  
                            )`;
        
        sql.query(sqlQuery1, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });

});}

let storeImageURLToDatabase=async(url,req)=>{

    let auction_id=req.query.auction_id
    let fullFilePath = `../images/${url}`

    return new Promise((resolve, reject) => {

        let sqlQuery = `UPDATE auction_items SET image_path='${fullFilePath}' WHERE auction_id =${auction_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });
    });
}


let deleteAuctionItem = async (req,res)=>{
    console.log("db services deleteAuctionItem here")

    let auction_id = req.body.auction_id

    return new Promise((resolve, reject) => {
        let sqlQuery = `DELETE FROM auction_items WHERE auction_id="${auction_id}"`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });
    });
}

let findAllAuctionItems = async (user_id)=>{
    console.log("db services findAllAuctionItems here",user_id)

    if (user_id!=null){

        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM auction_items WHERE seller_user_id=${user_id}`;
            
            sql.query(sqlQuery, (err, result, field) => {
                if(err) return reject(err);
                
                resolve(Object.values(result));
                
            });
        });

    }
    else{

        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM auction_items`;
            
            sql.query(sqlQuery, (err, result, field) => {
                if(err) return reject(err);
                
                resolve(Object.values(result));
                
            });
        });

    }


}

let findAuctionItem = async (auction_id)=>{
    console.log("db services findAuctionItem here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM auction_items WHERE auction_id=${auction_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
            
        });
    });
}

let placeBid = async (bidder_id,auction_id,bid)=>{
    console.log("db services placeBid here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `UPDATE auction_items SET current_price=${bid},highest_bidder_id=${bidder_id} WHERE auction_id =${auction_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
            
        });
    });
}

//// auction comments actions


let addAuctionComment = async (req,res)=>{
    console.log("db services addAuctionComment here")

    // let comment_id = req.body.comment_id
    let user_id = req.body.user_id
    let auction_id = req.body.auction_id
    let comment_text = req.body.comment_text
 
    return new Promise((resolve, reject) => {
        let sqlQuery = `
            INSERT INTO auction_comments (user_id,auction_id,comment_text)
            VALUES(${user_id},${auction_id},"${comment_text}" )`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });
    });
}

let deleteAllAuctionComments = async (req,res)=>{
    console.log("db services deleteAllAuctionComments here")

    let auction_id = req.body.auction_id

    return new Promise((resolve, reject) => {
        let sqlQuery = `DELETE FROM auction_comments WHERE auction_id="${auction_id}"`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });
    });
}


let findAllAuctionComments = async (auction_id)=>{
    console.log("db services findAllAuctionComments here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM auction_comments WHERE auction_id=${auction_id}`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
            
        });
    });
}

//// logical operations here (not initiated from http requests)


let findExpiredAuctionItems = async (req,res)=>{
    console.log("db services findExpiredAuctionItems here")

    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT * FROM auction_items WHERE end_date <= CURRENT_TIMESTAMP`;
        
        sql.query(sqlQuery, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
            
        });
    });
}

let insertClosedAuctionItem = async (item)=>{
    console.log("db services insertClosedAuctionItems here")

    let auction_id = item.auction_id                //from auction item table
    let seller_user_id = item.seller_user_id

    let seller_user_name = item.seller_user_name    //from user table
    let seller_email = item.seller_email

    let highest_bidder_id = item.highest_bidder_id  //from auction item table
    let category = item.category
    let image_path = item.image_path
    let auction_title = item.auction_title
    let item_location = item.item_location
    let item_description = item.item_description
    let sold_price = item.current_price
    let end_date = item.end_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')

    return new Promise((resolve, reject) => {
        let sqlQuery3 = `INSERT INTO closed_auction_items
                            VALUES(
                                ${auction_id},
                                ${seller_user_id},

                                "${seller_user_name}",
                                "${seller_email}",

                                ${highest_bidder_id},
                                "${category}",
                                "${image_path}",
                                "${auction_title}",
                                "${item_location}",
                                "${item_description}",
                                 ${sold_price},
                                "${end_date}"  
                            )`;
        
        sql.query(sqlQuery3, (err, result, field) => {
            if(err) return reject(err);
            
            resolve(Object.values(result));
        });

});}


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
    findExpiredAuctionItems,
    insertClosedAuctionItem,
    storeImageURLToDatabase,
    placeBid,
    findAuctionItem,
    getAllUsers
    
}




