//can be run to initialize database

const mongoose = require("mongoose");
const data = require("./data.js");
const List = require("../models/list.js");

let url = "mongodb://127.0.0.1:27017/CareStay";
main().then((res)=>{
    console.log("successfully connected");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(url);
}

async function init(){
    await List.deleteMany({});//clean
    await List.insertMany(data);//data is an array of object
    console.log("initialized");
}

init();

//can be run once in terminal