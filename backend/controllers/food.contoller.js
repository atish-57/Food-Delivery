import foodModel from '../models/food.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const foodLocalPath = imageFile.path;
    let food_image;

    try {
        food_image = await uploadOnCloudinary(foodLocalPath);
        if (!food_image) {
            throw new Error("Error uploading image to Cloudinary");
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

    const food = new foodModel({
        name: name,
        description: description,
        price: price,
        category: category,
        image: food_image.url
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error('Error saving food item:', error);
        res.status(500).json({ success: false, message: "Error saving food item" });
    }
};


const foodList = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        const cloudinaryResponse = await deleteFromCloudinary(food.image);

        if (!cloudinaryResponse) {
            return res.status(500).json({ success: false, message: 'Failed to delete image from Cloudinary' });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "food removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}
export { addFood, foodList  , removeFood};
