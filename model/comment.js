const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
    body:{type: 'string', required: true},
    postId:{type: mongoose.Types.ObjectId, ref: 'Post', required: true},
    userId:{type: mongoose.Types.ObjectId, ref: 'User', required: true}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Comment', commentSchema);