const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
    image:{ public_id:{type: String, required: true}, url:{type: String, required: true}},
    title:{type: String,required: true},
    content:{type: String,required: true},
    author:{type: mongoose.Types.ObjectId,ref: 'User'},
    comments:[{type: mongoose.Types.ObjectId,ref: 'Comment'}]
},
{
    timestamps: true,
})
module.exports = mongoose.model('Post',postSchema);