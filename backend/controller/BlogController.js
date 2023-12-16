const BlogModel = require('../model/BlogModel');

// Create a new blog
const createBlog = async (req, res) => {
    const blogData = req.body;

    try {
        const createdBlog = await BlogModel.create(blogData);
        res.status(201).json(createdBlog);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const addMultipleBlogs = async (req, res) => {
    const dataArray = req.body;
  
    try {
      // Use Promise.all to wait for all create operations to complete
      const createdBlogs = await Promise.all(
        dataArray.map(async (item, index) => {
          const data = item;
          const createdBlog = await BlogModel.create(data);
          console.log(`${index} blog created...`);
          return createdBlog;
        })
      );
  
      res.status(201).json(createdBlogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Read all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const getAllApprovedBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({approved:true}).sort({ publishedDate: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const getAllNotApprovedBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({approved:false}).sort({ publishedDate: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Read a specific blog by ID
const getBlogById = async (req, res) => {
    const blogId = req.params.id;

    try {
        const blog = await BlogModel.findById(blogId);
        
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status  (404).send(`Blog not found with ID: ${blogId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Update a specific blog by ID
const updateBlogById = async (req, res) => {
    const blogId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            blogId,
            updatedData,
            { new: true } // Return the modified document rather than the original
        );

        if (updatedBlog) {
            res.status(200).json(updatedBlog);
        } else {
            res.status(404).send(`Blog not found with ID: ${blogId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Delete a specific blog by ID
const deleteBlogById = async (req, res) => {
    const blogId = req.params.id;

    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

        if (deletedBlog) {
            res.status(200).json(deletedBlog);
        } else {
            res.status(404).send(`Blog not found with ID: ${blogId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get all blogs sorted by published date in descending order
const getAllBlogsSorted = async (req, res) => {
    try {
        const blogs = await BlogModel.find().sort({ publishedDate: -1 });

        if (blogs && blogs.length > 0) {
            res.status(200).json(blogs);
        } else {
            res.status(404).send("No blogs found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

// Get blogs by title
const getBlogsByTitle = async (req, res) => {
    const blogTitle = req.query.title;

    try {
        const blogs = await BlogModel.find({
            title: { $regex: new RegExp(blogTitle, 'i') }
        });

        if (blogs && blogs.length > 0) {
            res.status(200).json(blogs);
        } else {
            res.status(404).send(`No blogs found with the title: ${blogTitle}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getAllBlogsSorted,
    getBlogsByTitle,
    getAllApprovedBlogs,
    getAllNotApprovedBlogs,
    addMultipleBlogs
};
