const Resource = require('../models/Resource');

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.json(newResource);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create resource' });
  }
};

// Toggle bookmark status of a resource
exports.toggleBookmark = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    resource.bookmarked = !resource.bookmarked;
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
};

// Delete resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};
