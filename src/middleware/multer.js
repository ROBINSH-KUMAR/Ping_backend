import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null, path.resolve("public/temp"))
  },
  filename: function (req,file,cb){
    crypto.randomBytes(16,(err,raw)=>{
      if(err) return cb(err)

        const uniqueName = `${raw.toString("hex")}-${file.originalname}`

        cb(null, uniqueName)
    })
  },
})

export const upload = multer({
  storage,
});