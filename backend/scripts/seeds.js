//TODO: seeds script should come here, so we'll be able to put some data in our local env
require("dotenv").config();
const mongoose = require('mongoose');
require("../models/User");
require("../models/Item");
require("../models/Comment");

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

mongoose.connect(process.env.MONGODB_URI,()=>{
    console.log('Connected')
    seed();
    mongoose.connection.close();
});

const seedContent = async(i)=>{
    const user = new User()
    user.username = `user${i}`;
    user.email = `user${i}@mail.com`
    user.setPassword(`user${i}pass`)

    const newUser = await user.save();

    const item = new Item();
    item.title = `Item ${i}`;
    item.description = `Description of item ${i}`
    item.seller = newUser._id

    const newItem = await item.save();

    const comment  = new Comment();
    comment.body = `Comment on item ${i}`;
    comment.item = newItem._id;
    comment.seller = newUser._id

    const newComment = await comment.save();
}
const seed = ()=>{
for (let i = 0;i<100;i++){

    seedContent(i)
    console.log(`Seeding ${i}`)
}

}
