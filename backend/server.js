const mongoose  = require("mongoose")
const express=require("express")
const cors=require("cors")

const app= express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://kinku:9741@cluster01.4wakh2w.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const taskSchema=new mongoose.Schema({
    title:String,
    completed:Boolean,
});

const Task=mongoose.model("Task",taskSchema);

app.get("/tasks",async(req,res)=>{
    const tasks=await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      completed: false,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});


app.put("/tasks/:id",async(req,res)=>{
    const Task = await
    Task.findByIdAndUpdate(req.params.id,req.body,
        {new:true});
        res.json(task);
});

app.delete("/tasks/:id",async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:"Task Deleted"});
});

app.listen(5000,()=>
    console.log("server running on localhost 5000"));