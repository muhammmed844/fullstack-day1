const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to my Blog Backend!");
});


app.get("/blogs", (req, res) => {
    res.json([
        {
            title: "My First Blog",
            author: "Sahil",
            content: "This is my first blog post."
        },
        {
            title: "Learning Express.js",
            author: "Sahil",
            content: "Today I learned about GET and POST routes."
        }
    ]);
});


app.post("/blogs", (req, res) => {
    const blog = req.body;

    console.log("New blog received:", blog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog: blog
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});