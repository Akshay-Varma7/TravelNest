const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const List = require("./models/list.js");

// "./"-same folder & "../ "-go one level up folder - are relative paths

//no needto require - ejs
const port = 8080;
// always define variables 1st- no error while accessing it further
let url = "mongodb://127.0.0.1:27017/CareStay";//server->db
//DB SERVERs(1)->collections([1model] for [1collection] by [1schema])(1)->many documents

//NOTE: need not write await here 
//like try-catch , then-catch
main().then((res)=>{
    console.log("successfully connected");
}).catch((err)=>{
    console.log(err);
})
//database-shld have collection or document(obj-data)
async function main(){
    await mongoose.connect(url);
}

app.get("/",(req,res)=>{
    res.send("working");
});


app.get("/list",async (req,res)=>{
    let apollo = new List({//creating a document
        name: "Apollo",
        description: "24x7 services",
        price: 0,
        location: "Hyderabad",
        country: "INDIA",
    })

    await apollo.save();//db operation // if model related collection dne then its created and save
    //collection with model name + s
    res.send("succesfully created")

})
app.listen(port,()=>{
    console.log(`listening to port : ${port}`);
});