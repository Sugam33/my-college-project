import Categories from "../Models/CategoriesModal.js";
import asyncHandler from "express-async-handler";


// sabai categories access garna,    route - GET /api/categories
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


// create new category,    route - POST /api/categories
const createCategory = asyncHandler(async(req, res) => {
    try{
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

// update category,  route - PUT /api/categories/:id
const updateCategory = asyncHandler(async(req, res) => {
    try{
        // get category id from request params
        const category = await Categories.findById(req.params.id);

        if(category) {
            // update category title
            category.title = req.body.title || category.title;
            // save updated category in database
            const updatedCategory = await category.save();
            // send updated category to client
            res.json(updatedCategory);
        }
        else{
            res.status(404).json({ message: "Category not found" });
        }
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
});

// delete category,   route - DELETE /api/categories/:id
const deleteCategory = asyncHandler(async(req, res) => {
    try{
        // get category id from request parameter
        const category = await Categories.findById(req.params.id);

        if(category) {
            // delete category from database
            await category.deleteOne();
            // send success message to client
            res.json({ message: "Category removed" });
        }
        else{
            res.status(404).json({ message: "Category not found" });
        }
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
});

export { getCategories, createCategory, updateCategory, deleteCategory };