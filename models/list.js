const mongoose = require("mongoose");
//for func->
const Schema = mongoose.Schema;
//s-1 making schema
const listSchema = new Schema({
    name : String,
    description : String,
    image : String,
    price : Number,
    location : String,
    country : String
});
//s-2 assigning schema to a model
const list = mongoose.model("list",listSchema);
modules.export = list;