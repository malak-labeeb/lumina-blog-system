const Blog = require('../domain/Blog');

class BlogRepository {
  async getAll() {
    return await Blog.find().sort({ createdAt: -1 });
  }

  async getById(id) {
    return await Blog.findById(id);
  }

  async create(data) {
    const blog = new Blog(data);
    return await blog.save();
  }

  async update(id, data) {
    return await Blog.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Blog.findByIdAndDelete(id);
  }
}

module.exports = new BlogRepository();