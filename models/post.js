const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoos.Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true
});

const Post = mongoos.model('Post', postSchema);
module.exports = Post;