const API_URL = "http://localhost:3000/blogs";


// ==========================================
// ADD BLOG
// ==========================================

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const message = document.getElementById("message");

    blogForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const blogTitle = title.value.trim();
        const blogAuthor = author.value.trim();
        const blogContent = content.value.trim();

        // Validation
        if (
            blogTitle === "" ||
            blogAuthor === "" ||
            blogContent === ""
        ) {
            message.textContent = "Please fill in all fields.";
            return;
        }

        // Send blog to Express backend
        fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: blogTitle,
                author: blogAuthor,
                content: blogContent
            })

        })
        .then(response => response.json())
        .then(data => {

            if (data.blog) {
                message.textContent = "Blog added successfully!";
                blogForm.reset();
            } else {
                message.textContent = data.message;
            }

        })
        .catch(error => {

            console.error("Error adding blog:", error);

            message.textContent =
                "Unable to add blog. Make sure the server is running.";

        });
    });
}


// ==========================================
// DISPLAY BLOGS
// ==========================================

const homeBlogContainer =
    document.getElementById("blogContainer");

if (homeBlogContainer && !blogForm) {

    fetch(API_URL)

        .then(response => response.json())

        .then(blogs => {

            if (blogs.length === 0) {

                homeBlogContainer.innerHTML =
                    "<p>No blogs available yet.</p>";

                return;
            }

            blogs.forEach(blog => {

                const blogCard =
                    document.createElement("article");

                blogCard.innerHTML = `
                    <h3>${blog.title}</h3>

                    <p>
                        <strong>Author:</strong>
                        ${blog.author}
                    </p>

                    <p>${blog.content}</p>

                    <button onclick="editBlog(${blog.id})">
                        Edit
                    </button>

                    <button onclick="deleteBlog(${blog.id})">
                        Delete
                    </button>
                `;

                homeBlogContainer.appendChild(blogCard);
            });

        })

        .catch(error => {

            console.error("Error fetching blogs:", error);

            homeBlogContainer.innerHTML =
                "<p>Unable to load blogs.</p>";
        });
}


// ==========================================
// EDIT BLOG
// ==========================================

function editBlog(id) {

    const newTitle = prompt("Enter new title:");
    const newAuthor = prompt("Enter new author:");
    const newContent = prompt("Enter new content:");

    if (!newTitle || !newAuthor || !newContent) {

        alert("All fields are required.");

        return;
    }

    fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: newTitle,
            author: newAuthor,
            content: newContent
        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        location.reload();

    })

    .catch(error => {

        console.error("Error updating blog:", error);

    });
}


// ==========================================
// DELETE BLOG
// ==========================================

function deleteBlog(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
        return;
    }

    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        location.reload();

    })

    .catch(error => {

        console.error("Error deleting blog:", error);

    });
}