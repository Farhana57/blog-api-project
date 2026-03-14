const express = require('express');
const router = express.Router();
const { 
    createBlog, 
    getAllBlogs, 
    getSingleBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// ১. ব্লগ তৈরি (এখানে অবশ্যই authMiddleware যোগ করতে হবে)
router.post('/create', authMiddleware, createBlog); 

// ২. সব ব্লগ দেখা (পাবলিক - যে কেউ দেখতে পারবে)
router.get('/', getAllBlogs);

// ৩. একটি নির্দিষ্ট ব্লগ দেখা (পাবলিক)
router.get('/:id', getSingleBlog);

// ৪. ব্লগ আপডেট (সুরক্ষিত - শুধুমাত্র নিজের ব্লগ)
router.put('/:id', authMiddleware, updateBlog);

// ৫. ব্লগ ডিলিট (সুরক্ষিত - শুধুমাত্র নিজের ব্লগ)
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;