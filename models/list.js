const mongoose = require("mongoose");
//for func->
const Schema = mongoose.Schema;
//one schema used for  many model
//one such model for one collection and viceversa
//s-1 making schema
const listSchema = new Schema({//list all fields required-define their datatypes & conditions
    name : {
        type : String,//field keys - type,required,default,set,get
        required : true
    },
    description : String,
    image : {
        type : String,
        default : "https://unsplash.com/photos/red-and-white-stop-sign-_8gzs9HYYhM",
        //if we send something
        set : (v) => v === "" ? "https://unsplash.com/photos/red-and-white-stop-sign-_8gzs9HYYhM" : v
        //(A-set)
        //setters-function that runs BEFORE data is saved to the database. 
        //Think of it like a gatekeeper - “Whatever value is coming in, I’ll sanitize / transform / fix it before storing.”
        //flow is - User input → setter → MongoDB
    } ,
    price : Number,
    location : String,
    country : String
});


//(B-get)
//A getter runs WHEN DATA IS READ from the database, not when saved(set).
//display filter-get

//s-2 assigning schema to a model
const list = mongoose.model("list",listSchema);//model name should be singular((collection name,schema))
module.exports = list;