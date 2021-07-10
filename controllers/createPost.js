const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
module.exports.createPost = (req, res) => {

    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        console.log(fields, files);
        const errors = [];
        const { title, image, description, post_body } = fields;

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
        }
        else {
            let { path, name, type } = files.image;
            const split_image_type = type.split('/');
            const extension = split_image_type[1].toLowerCase();
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({ msg: `${ extension } file type is invalid,Enter correct one` })
            } else {
                name = `${ uuidv4() }__${ extension }`;
                // console.log(name);
                // console.log(__dirname);
                const upload_path = __dirname + './../client/public/images/' + name
                console.log(upload_path);
                fs.copyFile(path, upload_path, (err) => {
                    if (!err) {
                        console.log('Image uploaded successfully...');
                    }
                })
            }

        }

        if (errors.length !== 0) {
            return res.status(400).json({ errors: errors })
        }

        return res.status(200).json({
            msg: "Data has been saved successfully!!!",
            fields: fields,
            files: files
        })
    });
}
