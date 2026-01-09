const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
//no needto require - ejs
const port = 8080;
// always define variables 1st- no error while accessing it further
let url = "mongodb://127.0.0.1:27017/CareStay";

app.use();
app.use(path.join(__dirname,views));
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

app.listen(port,()=>{
    console.log(`listening to port : ${port}`);
});