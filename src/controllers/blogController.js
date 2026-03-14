const Blog = require('../models/Blog');

// ১. ব্লগ তৈরি করা (লগইন করা ইউজারের আইডি অটোমেটিক সেভ হবে)
exports.createBlog = async (req, res) => {
    try {
        const { title, content, authorName, tags, blogImage } = req.body;
        const newBlog = new Blog({
            title,
            content,
            authorName,
            tags,
            blogImage,
            authorId: req.user.id // টোকেন থেকে আইডি নেওয়া হচ্ছে
        });
        await newBlog.save();
        res.status(201).json({ message: "Blog Created Successfully! 📝", newBlog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ২. সব ব্লগ দেখা (পাবলিক)
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ৩. নির্দিষ্ট একটি ব্লগ দেখা
exports.getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found! ❌" });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ৪. ব্লগ আপডেট (শুধুমাত্র নিজের ব্লগ)
exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found! ❌" });
        
        if (blog.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only update your own blogs! ⚠️" });
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Blog Updated! ✨", blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ৫. ব্লগ ডিলিট (শুধুমাত্র নিজের ব্লগ)
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found! ❌" });

        if (blog.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own blogs! ⚠️" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog Deleted! 🗑️" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};