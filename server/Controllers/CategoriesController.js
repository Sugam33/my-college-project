import Categories from "../Models/CategoriesModal.js";
import asyncHandler from "express-async-handler";

// *************** PUBLIC CONTROLLERS **************

// get all categories,    route - GET /api/categories
const getCategories = asyncHandler(async(req, res) => {
    try{
    // find all categories in database
    const categories = await Categories.find({});
    // send all categories to client
    res.json(categories);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// **************** ADMIN CONTROLLERS *****************

// create new category,    route - POST /api/categories
const createCategory = asyncHandler(async(req, res) => {
    try{
    // get title from request body
    const { title } = req.body;
    // create new category
    const category = new Categories({
        title,
    });
    // save category in database
    const createdCategory = await category.save();
    // send new category to client
    res.status(201).json(createdCategory);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});