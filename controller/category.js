const { Category } = require('../models')

// Paginado - total - populate
const categorysGet = async (req, res) => {

    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    try {

        const [categorys, total] = await Promise.all([
            Category.find(query)
            .populate('user', 'name')
            .limit(limit)
            .skip(from),

            Category.countDocuments(query)
        ])

        res.json({
            total,
            categorys
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
    }
}

//  populate
const categoryGet = async (req, res) => {

    const { id } = req.params

    try {
        const category = await Category.findById(id)
            .populate('user', 'name')

        res.json({
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
    }
}

const categoryPost = async (req, res) => {

    const name = req.body.name.toUpperCase()

    try {
        const categoryDB = await Category.findOne({ name });

        if (categoryDB) {
            return res.status(400).json({ msg: `Category ${name} has been already use.` })
        }

        const data = {
            name,
            user: req.user._id
        }

        const category = new Category(data)
        await category.save()

        res.status(201).json({ category })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: `Error in server.` })

    }



}

const categoryPut = async (req, res = response) => {

    const { id } = req.params
    const name = req.body.name.toUpperCase()

    const category = await Category.findByIdAndUpdate(id, {name}, { new: true })

    res.json({ id, category })
}

const categoryDelete = async (req, res = response) => {

    const { id } = req.params
    await Category.findByIdAndUpdate(id, { state: false }, {new: true})
    res.json({ id, msg: "Category deleted sucessfully" })

}




module.exports = {
    categoryPost,
    categorysGet,
    categoryGet,
    categoryPut,
    categoryDelete
}