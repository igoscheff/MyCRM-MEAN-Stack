const Category = require('../models/Category'),
      Position = require('../models/Position'),
      errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Category.remove({ _id: req.params.id});
        await Position.remove({ category: req.params.id});
        res.status(200).json({
            message: 'Category was deleted.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.create = async (req, res) => {
    const category = new Category({
       name: req.body.name,
       imageSrc: req.file ? req.file.path : '',
       user: req.user.id
    });

    try {
        await category.save();
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name
    };

    if(req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        {$set: updated},
        {new: true}
        );
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
};