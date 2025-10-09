const Skill = require('../models/Skill');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    res.json(newSkill);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create skill' });
  }
};

// Update skill checklist or streak - partial update
exports.updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update skill' });
  }
};

// Delete skill by ID
exports.deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};
