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

// PUT - Update an existing blog
app.put("/blogs/:id", (req, res) => {
    const blogId = parseInt(req.params.id);

    const blog = blogs.find(blog => blog.id === blogId);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({
            message: "Please provide title, author and content."
        });
    }

    blog.title = title;
    blog.author = author;
    blog.content = content;

    res.json({
        message: "Blog updated successfully!",
        blog: blog
    });
});

// DELETE - Delete a blog
app.delete("/blogs/:id", (req, res) => {
    const blogId = parseInt(req.params.id);

    const blogIndex = blogs.findIndex(blog => blog.id === blogId);

    if (blogIndex === -1) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    const deletedBlog = blogs.splice(blogIndex, 1);

    res.json({
        message: "Blog deleted successfully!",
        blog: deletedBlog[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});