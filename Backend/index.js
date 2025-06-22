const express = require("express"); 
const mongoose = require("mongoose");
const userRoute = require('./Routes/userRoutes');
const cors = require("cors");
const quizRoute = require('./Routes/quizRoutes');
const AiRoutes = require('./Routes/aiRoutes');
const courseRoutes = require('./Routes/courseRoutes');

const app= express();
const port = 5000;

//middleware to access the body(text/html) written on screen 
app.use(cors({
    origin:"*",
    methods: ['GET','POST','DELETE'],
}));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

//connection to data
mongoose
    .connect("mongodb://127.0.0.1:27017/EduSync")
    .then(() =>  console.log("Mongo db connected"))
    .catch((err) => console.log("error",err));

app.use("/users", userRoute);
app.use("/quiz", quizRoute);
app.use('/api/ai', AiRoutes);
app.use('/course',courseRoutes);

app.listen(port, ()=>
    console.log(`server running on port ${port}`)
)
