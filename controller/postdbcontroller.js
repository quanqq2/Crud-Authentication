const User = require('../model/user');
const Post = require('../model/post');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');


exports.createpost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const {id}= req.params;
      const result = await cloudinary.uploader.upload(req.file.path,{
        folder: "post",
      });
      const user = await User.findById(id).exec();
      const newPost = new Post({
        image: {
            public_id: result.public_id,
            url: result.secure_url
        },
        title: title,
        content: content,
        author: user
      });
  
      const savedPost = await newPost.save();
      res.status(201).json('Post created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create post' });
    }
  };


exports.updatepost = async (req, res) => {
    try {
        const {postid} = req.params;
        const update= await Post.findByIdAndUpdate(postid)
        if(!update){
          return res.status(404).json({message:'not found post'})
        }
        if(req.file){
          await cloudinary.uploader.destroy(update.image.public_id,{
            folder: "post",
          })
          const uploadimage = await cloudinary.uploader.upload(req.file.path,{
            folder: "post",
          })
          update.image = {
            public_id: uploadimage.public_id,
            url: uploadimage.secure_url
        }
        }
        update.title= req.body.title;
        update.content= req.body.content;

        const updatepost = await update.save()
        res.status(200).json(updatepost)
      }
    catch (err) {
        res.status(500).json({message:'update fail'});
    }
  }

exports.deletepost = async (req,res)=>{
  try {
    const {postid} = req.params;
    const deletepost = await Post.findByIdAndDelete(postid);
    if(!deletepost){
      return res.status(404).json({message:'not found post'})
    }
    if(req.file){
      await cloudinary.uploader.destroy(deletepost.image.public_id,{
        folder: "post",
      })}
      return res.send('post delete')
  } catch (error) {
    res.status(500).json({message:'delete fail'});
  }
}

