const express=require('express');
const app=express();
const Joi=require('joi');
const bodyParser=require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
const courses=[{name:"Java",id:1},{name:"C++",id:2},{name:"Python",id:3}]
app.get('/',(req,res)=>{
    res.send([1,23])
})
app.get('/api/courses',(req,res)=>{
    res.send(courses)
})
app.get('/api/courses/:id',(req,res)=>{
   const course=courses.find(c=>c.id===parseInt(req.params.id))
   if(!course)res.status(404).send("The course with given id is not found");
   res.send(course);
})
app.post('/api/courses',(req,res)=>{
    const error= validateCourse(req.body);
    if(error)
    {
        return res.status(400).send(error.message)
    }
    const store={name:req.body.name,id:courses.length+1};
    courses.push(store);
    res.send(store)
});
app.put('/api/courses/:id',(req,res)=>{
    //look up the course
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)res.status(404).send("The course with given id is not found");
    //if not exist return 404
    //validate
    const error= validateCourse(req.body);
    if(error)
    {
        return res.status(400).send(error.message)
    }
    //update
    course.name=req.body.name;
    //return the updated course
    res.send(course)
})
app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)res.status(404).send("The course with given id is not found");
    courses.splice(courses.indexOf(course))
    res.send(course)
})
function validateCourse(course){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    const {error} = schema.validate({name:course.name});
    return error;

}
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log("Server is up and running.."))