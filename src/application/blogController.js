const blogRepository = require('../persistence/blogRepository');

exports.getAllBlogs = async (req, res) => {
  const blogs = await blogRepository.getAll();
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await blogRepository.getById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  const newBlog = await blogRepository.create(req.body);
  res.status(201).json(newBlog);
};

exports.updateBlog = async (req, res) => {
  const updated = await blogRepository.update(req.params.id, req.body);
  res.json(updated);
};

exports.deleteBlog = async (req, res) => {
  await blogRepository.delete(req.params.id);
  res.json({ message: 'Blog deleted successfully' });
};