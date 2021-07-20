const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Post = require('../models/postdata')

module.exports.createPost = (req, res) => {

    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        // console.log(fields, files);
        const errors = [];
        const { title, image, description, post_body, _id, name, slug } = fields;

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
                            name
                        })
                        return res.status(200).json({
                            msg: "Post has been created successfully!!!",
                            post
                        })
                    }
                } catch (error) {
                    console.log(error);
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

    console.log(id);
    try {
        const posts = await Post.find({ userId: id });
        return res.status(200).json({ posts })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}
