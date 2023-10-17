const bcrypt = require("bcrypt");
const { User } = require("../models/userModel.js");
const { createToken } = require("../middlewares/userAuth.js");
const img_auth = async (req, res, next) => {
    try {
		if (!res.locals.user.fac<2) throw new Error("Can't Skip factor2");
			
        if (!res.locals.user._doc.imgSecret){

        const img_secret = await req.body.img_secret
        const hashedImg_Secret = await bcrypt.hash(img_secret, 10);
        await User.updateOne({ _id: res.locals.user._doc._id }, { imgSecret: hashedImg_Secret });
		} else {
            const img_secret = await req.body.img_secret
            const imgmatch = await bcrypt.compare(img_secret, res.locals.user._doc.imgSecret);
            if (!imgmatch) throw new Error("Img Pattern Doesn't matched, Try Again");
		}

		// If Color_Secrets matches, create a Cookie and append it to the Resonse Object
		const token = createToken({ _id: res.locals.user._doc._id, fac: 3 }, "2h");
		res.cookie("engage_jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
		res.status(200).json({ access: true, fac: 3, msg: "Authentication Successful" });
		
	} catch (err) {
		console.error(err);
		res.status(400).json({ access: false, fac: 3, msg: err.message }); 
	}
}
 
module.exports = { img_auth };