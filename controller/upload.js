const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFile: upFile } = require('../helpers')
const { User, Product } = require('../models')

const uploadFile = async (req, res) => {

    try {
        const fullPath = await upFile(req.files)
        res.json({ fullPath })
    } catch (msg) {
        res.status(400).json({ msg })
    }

}

const updateImg = async (req, res = response) => {

    const { colection, id } = req.params

    let model;

    try {
        switch (colection) {
            case 'users':
                model = await User.findById(id);
                break;
    
            case 'products':
                model = await Product.findById(id);
                break;
    
            default:
                return res.status(500).json({ msg: 'Method dont dev' });
        }
    
        if (!model) {
            return res.status(400).json({ msg: `${colection} with id ${id} not found` })
        }

        // Limpiar img previas
        if ( model.img ){
            // Hay que borrar img del servidor
            const pathImg = path.join( __dirname, '../uploads', colection, model.img);
            fs.existsSync( pathImg ) && fs.unlinkSync( pathImg )
           
        }
        
        model.img = await upFile(req.files, undefined, colection)
        await model.save();
    
        res.json({ colection, id, model })
    } catch (error) {
        res.status(500).json({msg:error})
    }

    

}

const updateImgCloudinary = async (req, res = response) => {

    const { colection, id } = req.params

    let model;

    try {
        switch (colection) {
            case 'users':
                model = await User.findById(id);
                break;
    
            case 'products':
                model = await Product.findById(id);
                break;
    
            default:
                return res.status(500).json({ msg: 'Method dont dev' });
        }
    
        if (!model) {
            return res.status(400).json({ msg: `${colection} with id ${id} not found` })
        }

        // Limpiar img previas
        if ( model.img ){
            
            const nameArr = model.img.split('/')
            const name = nameArr[ nameArr.length - 1]
            const [ public_id ] = name.split('.') 
            cloudinary.uploader.destroy(public_id)
        }

        const { secure_url } = await cloudinary.uploader.upload( req.files.file.tempFilePath )
        
        model.img = secure_url
        await model.save();
    
        res.json({ model })
    } catch (error) {
        res.status(500).json({msg:error})
    }

    

}

const showImg = async (req, res) => {

    const { colection, id } = req.params

    let model;

    try {
        switch (colection) {
            case 'users':
                model = await User.findById(id);
                break;
    
            case 'products':
                model = await Product.findById(id);
                break;
    
            default:
                return res.status(500).json({ msg: 'Method dont dev' });
        }
    
        if (!model) {
            return res.status(400).json({ msg: `${colection} with id ${id} not found` })
        }

        // Limpiar img previas
        if ( model.img ){
            // Hay que borrar img del servidor
            const pathImg = path.join( __dirname, '../uploads', colection, model.img);
            if(fs.existsSync( pathImg )) {
                return res.sendFile( pathImg )
            }
           
        }
    
        const pathImg = path.join( __dirname, '../assets', 'no-image.jpg');
        return res.sendFile( pathImg )
    } catch (error) {
        res.status(500).json({msg:error})
    }

}


module.exports = {
    uploadFile,
    updateImg,
    showImg,
    updateImgCloudinary
}