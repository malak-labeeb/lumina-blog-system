const express = require('express');
const router = express.Router();
const blogController = require('../../application/blogController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

router.post('/', verifyAdmin, blogController.createBlog);
router.put('/:id', verifyAdmin, blogController.updateBlog);
router.delete('/:id', verifyAdmin, blogController.deleteBlog);

module.exports = router;