import multer from "multer";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get path for the /uploads folder.
const getPath = () => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename);
    const destPath = join(__dirname + '/../uploads')
    return destPath;
};
const destination = getPath()


// Configure storage and file name
const storage = multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null,destination);
    },
    filename: (req,file,cb)=>{
        const originalName = file.originalname;
        console.log("original file name: ", originalName);
        
        // Custom file name is used when fileName from request can't be processed.
        // IMP: formdata key values order matter! fileName should come before file.
        const customName = req.body?.fileName || originalName; // fallback to originalName;
        console.log("custom file name: ", customName);
        
        // NOTE: no need to check for duplicate file. Becuase we will
        // be deleting the file once it is uploaded to drive.
        cb(null, customName);
    }
})
const uploadMulter = multer({storage});


export { uploadMulter }