var express=require("express");
//var path=require("path");
var mongu=require("mongoose");
var app=express();

//connect to db
mongu.connect("mongodb://localhost:27017/collegelibrary");

//create schema
var studentSchema=mongu.Schema({
    name:String,
    email:String,
    phone:String,
    password:String

})

//create model
//exports.invent=mongu.model("invent",inventschema)
exports.Student=mongu.model('Student',studentSchema,'students')