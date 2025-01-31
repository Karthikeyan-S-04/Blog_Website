function saveBlog() {
    const title = document.getElementById('blog_title').value;
    const content = document.getElementById('blog_content').value;
    if (title != '' && content != '') {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push({ title, content, views: 0, showFullContent: false });
        localStorage.setItem('blogs', JSON.stringify(blogs));
        displayBlogs();
    }
}

function clearBlogs() {
    document.getElementById('blog_title').value = '';
    document.getElementById('blog_content').value = '';
}

function displayBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';
    blogs.forEach((blog, index) => {
        blogList.innerHTML += `
            <div class="bg-white p-4 rounded shadow-md">
                <h3 class="text-xl font-semibold hover:underline">${blog.title}</h3>
                <p class="indent-10">${blog.showFullContent ? blog.content : blog.content.substring(0, 100) + '...'}</p>
                <button class="mt-2 py-2 px-3 bg-stone-950 text-white rounded hover:bg-neutral-50 hover:text-stone-950" onclick="viewBlog(${index})">${blog.showFullContent ? 'Show Less' : 'Show More'}</button>
                <button class="mt-2 py-2 px-3 bg-stone-950 text-white rounded hover:bg-neutral-50 hover:text-stone-950" onclick="editBlog(${index})">Edit</button>
                <button class="mt-2 py-2 px-3 bg-stone-950 text-white rounded hover:bg-neutral-50 hover:text-stone-950" onclick="deleteBlog(${index})">Delete</button>
                <p class="mt-2 text-sm text-gray-600">Views: ${blog.views}</p>
            </div>
        `;
    });
}

function viewBlog(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    if (!blogs[index].showFullContent) { blogs[index].views += 1; }
    blogs[index].showFullContent = !blogs[index].showFullContent;
    localStorage.setItem('blogs', JSON.stringify(blogs));
    displayBlogs();
}

function editBlog(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    document.getElementById('blog_title').value = blogs[index].title;
    document.getElementById('blog_content').value = blogs[index].content;
    deleteBlog(index);
}

function deleteBlog(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    displayBlogs();
}

window.onload = displayBlogs;