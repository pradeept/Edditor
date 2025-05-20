import axios from "axios";

const FOLDER_NAME = "edditor_saves";
const DRIVE_BASE_URL = "https://www.googleapis.com/drive/v3/files"


const searchFolder = async (req, res) => {
    const ACCESS_TOKEN = req.session.passport.user.access
    const query = `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    try {
        const response = await axios.get(DRIVE_BASE_URL, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
            params: {
                q: query,
                spaces: "drive",
                fields: "files(id,name)"
            }
        })
        res.status(200).json({ data: response })
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("error", error.message)
            res.status(403).json({ msg: "Unauthorized. Please login again." })
        } else {
            console.log("error: ", error);
        }
    }
}

const createFolder = async (req, res) => {
    const ACCESS_TOKEN = req.session.passport.user.access
    const fd = new FormData()
    fd.append("name", "FOLDER_NAME");
    fd.append("mimeType", "application/vnd.google-apps.folder")
    try {
        const response = await axios.post(DRIVE_BASE_URL, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }, fd
        })
        res.status(200).json({ data: response })
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("error", error.message)
            res.status(403).json({ msg: "Unauthorized. Please login again." })
        } else {
            console.log("error: ", error);
        }
    }
}


const listFiles = (req, res) => {
    const { folderID } = req.query.params
}


const uploadFile = (req, res) => {
    const { blob, fileName, folderID } = req.query.params
}

export { searchFolder, listFiles, createFolder, uploadFile }