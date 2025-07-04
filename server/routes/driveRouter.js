import { Router } from "express";
import { createFolder, listFiles, searchFolder, uploadFile } from "../controllers/driveController.js";
import { uploadMulter } from "../utils/multerConfig.js";
const driveRouter = Router()

driveRouter.get('/folder-id', searchFolder)
driveRouter.get('/files', listFiles) // takes folderId
driveRouter.post('/create-folder', createFolder) // name should be Edditor_saves
driveRouter.post('/upload', uploadMulter.single('file'), uploadFile) // need blob, file_name, folder_id



export { driveRouter }