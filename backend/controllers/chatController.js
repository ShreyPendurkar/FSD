let messages = []; // In-memory message store, replace with DB in production

// Get all messages
exports.getMessages = (req, res) => {
  res.json(messages);
};

// Post a new message
exports.postMessage = (req, res) => {
  const { user, content } = req.body;
  if (!user || !content) {
    return res.status(400).json({ message: "User and content required" });
  }

  const newMessage = {
    id: messages.length + 1,
    user,
    content,
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
};
