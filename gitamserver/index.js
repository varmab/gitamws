var express=require("express");
var app=express();

app.use(express.static("public"))

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/gitamserver")

//create schema
var studentSchema=mongoose.Schema({
    name:String,
    age:Number
})

//create model
var Student=mongoose.model('Student',studentSchema,'students')

var bodyParser=require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Welcome to Gitam Server");
})

app.get("/api/students",(req,res)=>{
    Student.find({},function(err,students){
        if(err) res.send(err);
        res.send(students)
    })
})

app.post("/api/students",(req,res)=>{
    var newStudent=new Student(req.body);

    newStudent.save((err,student)=>{
        if(err) res.send(err);
        res.send(student)
    })
})

app.delete("/api/students/:id",(req,res)=>{
    var id=req.params.id;

    Student.findByIdAndDelete(id,(err,student)=>{
        if(err) res.send(err);
        res.send(student)
    })
})

app.listen(8000,()=>{
    console.log("Gitam server started at port 8000")
})