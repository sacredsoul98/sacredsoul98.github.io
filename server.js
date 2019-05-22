var express=require("express");
var path=require("path");
var app=express();
var db=require("./db");

var bodyParser=require("body-parser")

//app.use(express.static(""))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Welcome to library server")
})

//get all students

app.get("/api/students",(req,res)=>{
    db.Student.find(({},(err,students)=>{
        if(err) res.status(500).send(err);
        res.send(students)
    }))
})

/*
create new student
*/
app.post("/api/students/insert",(req,res)=>{
    var newStudent=new db.Student(req.body);
    newStudent.save((err,Student)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(Student)
    })
})
//delete existing student
app.delete('/api/students/delete/:id', function(req,res) {
    db.Student.findByIdAndDelete(req.params.id, function(err,data) {
        if(!err) {
          console.log("Deleted");
          res.send(data);
        }
    });
  });

  //update database title only
  app.put("/api/students/update/:id",function(req,res) {
      var id=req.params.id;
      db.Student.findByIdAndUpdate(id,{name:req.body.name},{new:true},(err,data)=>{
          if(!err){ console.log("Updated");
          res.send(data);
      
        }
      })
  })


/*
app.delete("/api/students/delete/:id",(req,res)=>{
    var id=req.params.id;
    db.Student.findByIdAndDelete(id,(err,student)=>{
        if(err) res.status(500).send(err);
        res.send(student)
    })
})
*/
app.listen(9010,()=>{
    console.log("Library server is started")
})