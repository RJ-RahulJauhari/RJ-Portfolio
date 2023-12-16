const express = require('express');
const router = express.Router();
const blogController = require('../controller/BlogController');
const { validateToken } = require('../controller/JWT');

// Create a new blog
router.post('/add',validateToken, blogController.createBlog);

router.post('/admin/addMultiple',validateToken,blogController.addMultipleBlogs);

// Read all blogs
router.get('/getAll',validateToken, blogController.getAllBlogs);

// Read all approved blogs
router.get('/getAll/approved',validateToken, blogController.getAllApprovedBlogs);

// Read all pending blogs
router.get('/getAll/pending',validateToken, blogController.getAllNotApprovedBlogs);

// Read a specific blog by ID
router.get('/get/:id',validateToken, blogController.getBlogById);

// Update a specific blog by ID
router.patch('/update/:id',validateToken, blogController.updateBlogById);

// Delete a specific blog by ID
router.delete('/delete/:id',validateToken, blogController.deleteBlogById);

// Get all blogs sorted by published date in descending order
router.get('/getAllSorted',validateToken, blogController.getAllBlogsSorted);

// Get blogs by title
router.get('/getByTitle',validateToken, blogController.getBlogsByTitle);

module.exports = router;
