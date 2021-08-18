const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Post = require('../models/postdata')
const Comment = require('../models/Comment')

module.exports.homePage = async (req, res) => {
    const page = req.params.page;
    const per_page_post = 5;
    const skip = (page - 1) * per_page_post;

    try {
        const count = await Post.find().countDocuments();
        const posts = await Post.find().skip(skip).limit(per_page_post).sort({ updatedAt: -1 })
        return res.status(200).json({
            posts, per_page_post, count
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        })
    }

}

module.exports.detailPost = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log('hello');
    try {
        const post = await Post.findOne({ _id: id });
        const comment = await Comment.find({ postId: id }).sort({ updatedAt: -1 })
        console.log(comment);
        return res.status(200).json({ post, comment })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        })
    }
}

module.exports.createPost = (req, res) => {

    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        console.log(fields, files);
        const errors = [];
        const { title, description, post_body, _id, user, slug } = fields;

        if (title.length === 0) {
            errors.push({ msg: 'Enter title properly' })
        }
        if (description.length === 0) {
            errors.push({ msg: 'Enter description properly' })
        }
        if (post_body.length === 0) {
            errors.push({ msg: 'Enter post body properly' })
        }

        if (Object.keys(files).length === 0) {
            errors.push({ msg: 'Please Upload image file' })
        } else {
            let { path, name, type } = files.image;
            let split_image_type = type.split('/');
            extension = split_image_type[1].toLowerCase();
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({ msg: `${ extension } file type is invalid,Enter correct one` })
            }
        }

        if (errors.length !== 0) {
            return res.status(400).json({ errors: errors })
        } else {
            let { path, name } = files.image;
            name = `${ uuidv4() }__${ extension }`;
            // console.log(name);
            // console.log(__dirname);
            const upload_path = __dirname + './../client/public/images/' + name
            // console.log(upload_path);
            fs.copyFile(path, upload_path, async (err) => {
                try {
                    if (!err) {
                        const post = await Post.create({
                            title,
                            image: name,
                            slug,
                            description,
                            post_body,
                            userId: _id,
                            user
                        })
                        return res.status(200).json({
                            msg: "Post has been created successfully!!!",
                            post
                        })
                    }
                } catch (error) {
                    // console.log(error);
                    errors.push({ msg: error })
                    return res.status(500).json({
                        errors
                        // errors:error.message

                    })
                }
            })
        }


    });
}

module.exports.getAllPosts = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const per_page_post = 2;
    const skip = (page - 1) * per_page_post;
    // console.log(page);
    // console.log( id);
    try {
        const count = await Post.find({ userId: id }).countDocuments();
        const posts = await Post.find({ userId: id }).skip(skip).limit(per_page_post).sort({ updatedAt: -1 });
        return res.status(200).json({ posts, count, per_page_post })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

module.exports.deletePost = async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        const response = await Post.findByIdAndRemove(id);
        return res.status(200).json({
            msg: "post has been deleted successfully",
        })
    } catch (error) {
        console.log(error)
        error
    }
}

module.exports.commentRouter = async (req, res) => {
    const { postId, userName, comment } = req.body.commentData;
    console.log(userName, postId, comment);
    console.log('hello');
    try {
        const response = await Comment.create({
            postId,
            userName,
            comment
        })
        const getAllPost = await Comment.find({ postId: postId }).sort({ updatedAt: -1 })
        console.log('saved');
        return res.status(200).json({
            msg: 'Your comment has been published!',
            response,
            getAllPost
        })
    } catch (error) {
        error
        return res.status(560).json({
            error: 'internal server error'
        })
    }


}

