const path = require('path')
const { v4: uuidv4} = require('uuid')

const uploadFile = (files, exts = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        if(files === undefined || !files.file){
            console.log("ALTO IF")
            return reject({msg: 'No files were uploaded.'})
        }

        const { file } = files;
        const nameCrash = file.name.split('.')
        const ext = nameCrash[nameCrash.length - 1]

        if (!exts.includes(ext)) {
            return reject({ msg: 'Invalid extension' })
        }

        const tempName = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject({ err });
            }

            return resolve(tempName);
        });
    })



}

module.exports = {
    uploadFile
}