const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// JavaScript array to store blogs
let blogs = [];

// GET - Get all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST - Add a new blog
app.post("/blogs", (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({
            message: "Please provide title, author and content."
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title: title,
        author: author,
        content: content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog created successfully!",
        blog: newBlog
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});