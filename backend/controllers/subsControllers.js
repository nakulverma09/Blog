const Email = require("../models/email.js");
const Contact = require("../models/contact.js"); // Assuming you have a Contact model defined

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is already subscribed
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    // Save new email
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.contact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Check if all fields are present
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save data correctly
    const newContact = new Contact({ firstName, lastName, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}