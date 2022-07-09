const { validationResult } = require("express-validator");
const res = require("express/lib/response");

const campoErrores = (req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }

    next();

}




module.exports = {campoErrores};