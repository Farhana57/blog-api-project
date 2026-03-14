const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    authorName: { 
        type: String, 
        required: true 
    },
    tags: [String], 
    blogImage: { 
        type: String 
    },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // এটি User মডেলের সাথে কানেকশন তৈরি করবে
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);