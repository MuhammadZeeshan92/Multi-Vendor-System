const mongoose = require("mongoose");
require("dotenv").config();
const Conversation = require("./models/Conversation");

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB.");
  
  const conversations = await Conversation.find({});
  console.log("ALL CONVERSATIONS IN DB:", conversations);

  process.exit(0);
}

check().catch(console.error);
