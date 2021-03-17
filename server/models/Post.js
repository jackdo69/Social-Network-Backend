import mongoose from 'mongoose';
const {Schema} = mongoose;

const Post = new Schema({
    title:  String, 
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
})