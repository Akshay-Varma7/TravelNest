const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const List = require("./models/list.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");//templating navbar(header),footer-like ejs includes("path")+partials(folder inside views)
//this has layouts folder in views instead of partials + layout("path")

app.set("view engine","ejs");//s-1 setting viewing engine to ejs
app.set("views",path.join(__dirname,"views"));//s-2 joining folder of views

//middleware for parsing from url
app.use(express.urlencoded({extended : true}));
//middleware for method override
app.use(methodOverride("_method"));

app.engine("ejs",ejsMate);//for templating (our choice to use it or not)
//for static files(css,images,videos)- folder
app.use(express.static(path.join(__dirname,"/public")));


// "./"-same folder & "../ "-go one level up folder - are relative paths

//no needto require - ejs
const port = 8080;
// always define variables 1st- no error while accessing it further
let url = "mongodb://127.0.0.1:27017/TravelNest";//server->db
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
//index-route
app.get("/list",async (req,res)=>{
    await List.find({}).then(allList=>{
        res.render("list/index.ejs",{allList});//never do /list/index.ejs as "/" is absolute and not from views which should naturally happen
    }).catch(err=>{
        console.log(err);
    })
});
//to create new
//s-1-get form
app.get("/list/new",async (req,res)=>{// if below /list/:id then it first treats new as :id
    res.render("list/new.ejs");
});
//s-2- post data
app.post("/list",async (req,res)=>{
    // let {title, description, image, price, location, country} = req.body;
    //const list = {title,description,image,price,location,country

    let list = req.body.list;//imp
    const newList = new List(list);//“Create a new MongoDB document using the List model and the data inside list.
    await newList.save();
    res.redirect("/list");//hitting route not just rendering an ejs
});
//read one user
app.get("/list/:id",async (req,res)=>{
    let {id} = req.params;
    //variable exist in till this route hit and exists
    const list = await List.findById(id);//document of that id 
    res.render("list/show.ejs",{list});
});

//UPDATE
//S-1-GET-show.ejs as for particular according to our design
app.get("/list/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const list = await List.findById(id);
    res.render("list/edit.ejs",{list});
});
//S-2-PUT
app.put("/list/:id",async (req,res)=>{
    let {id} = req.params;
    await List.findByIdAndUpdate(id,{...req.body.list});//***  (id,obj)//obj as {...req.body.list} i.e., deconstruct list object send by form
    res.redirect(`/list/${id}`);
})
//DELETE
app.delete("/list/:id",async (req,res)=>{
    let {id} = req.params;
    let deleted = await List.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/list");//as response redirect
})

//redirect and render diff(like when to use)
//we only send to ejs where it cant deconstruct like in express 

// app.get("/list",async (req,res)=>{
//     let apollo = new List({//creating a document
//         title: "Apollo",
//         description: "24x7 services",
//         price: 0,
//         location: "Hyderabad",
//         country: "INDIA",
//     })

//     await apollo.save();//db operation // if model related collection dne then its created and save
//     //collection with model name + s
//     res.send("succesfully created")

// })
app.listen(port,()=>{
    console.log(`listening to port : ${port}`);
});