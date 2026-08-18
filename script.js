

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const message = document.getElementById("message");
    const blogContainer = document.getElementById("blogContainer");

    blogForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get values from the form
        const blogTitle = title.value.trim();
        const blogAuthor = author.value.trim();
        const blogContent = content.value.trim();

        // Validation
        if (blogTitle === "" || blogAuthor === "" || blogContent === "") {
            message.textContent = "Please fill in all fields.";
            return;
        }

        // Create blog card
        const blogCard = document.createElement("article");

        blogCard.innerHTML = `
            <h3>${blogTitle}</h3>
            <p><strong>By:</strong> ${blogAuthor}</p>
            <p>${blogContent}</p>
        `;

        // Add blog card to page
        blogContainer.appendChild(blogCard);

        // Success message
        message.textContent = "Blog added successfully!";

        // Clear form
        blogForm.reset();
    });
}


const homeBlogContainer = document.getElementById("blogContainer");

if (homeBlogContainer && !blogForm) {

    fetch("http://localhost:3000/blogs")
        .then(response => response.json())
        .then(blogs => {

            if (blogs.length === 0) {
                homeBlogContainer.innerHTML = "<p>No blogs available yet.</p>";
                return;
            }

            blogs.forEach(blog => {

                const blogCard = document.createElement("article");

                blogCard.innerHTML = `
                    <h3>${blog.title}</h3>
                    <p><strong>Author:</strong> ${blog.author}</p>
                    <p>${blog.content}</p>
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