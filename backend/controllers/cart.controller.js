import userModel from "../models/user.model.js";

const addToCart = async (req, res) => {
    try {

        const userData = await userModel.findById(req.body.userID)
        const cartData = await userData.cartData;
        const itemId = req.body.itemId;
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userData._id, { cartData });

        res.json({ success: true, message: "Added To Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }


}

const removeFromCart = async (req, res) => {

    try {
        const userData = await userModel.findById(req.body.userID)
        const cartData = await userData.cartData;
        const itemId = req.body.itemId;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userData._id, { cartData });

        res.json({ success: true, message: "Removed From Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


const getCartData = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userID)
        const cartData = await userData.cartData;
        return res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addToCart, removeFromCart, getCartData }