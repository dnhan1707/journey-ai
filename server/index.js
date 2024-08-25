import express from "express";


const port = 5000;

const app = express()


app.use("/", (req, res) => {
    res.send("Server is running");
})


app.listen(port, console.log(`Server started on Port ${port}`))
