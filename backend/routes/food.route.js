import express from 'express';
import multer from 'multer';
import { addFood, foodList, removeFood } from '../controllers/food.contoller.js';

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList)
foodRouter.post("/remove", removeFood)


export default foodRouter;
