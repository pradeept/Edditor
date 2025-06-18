import axios from "axios";
import * as fs from "fs";

const FOLDER_NAME = "edditor_saves";
const DRIVE_BASE_URL = "https://www.googleapis.com/drive/v3/files"


const searchFolder = async (req, res) => {
    const ACCESS_TOKEN = req.session.passport.user.access
    // console.log(req.session.passport)
    console.log("search folder: ", ACCESS_TOKEN);
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
        res.status(200).json({ data: response.data })
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("error", error.message)
            res.status(403).json({ msg: "Unauthorized. Please login again." })
        } else {
            console.log("error: ", error);
            res.status(500).json({ msg: error.message })
        }
    }
}

const createFolder = async (req, res) => {
    const ACCESS_TOKEN = req.session.passport.user.access;

    const reqBody = {
        name: "edditor_saves",
        mimeType: "application/vnd.google-apps.folder"
    };

    try {
        const response = await axios.post(DRIVE_BASE_URL, reqBody, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        res.status(200).json({ data: response.data });
    } catch (error) {
        if (error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error data:", error.response.data);
        }
        res.status(error.response?.status || 500).json({ msg: "Error creating folder" });
    }
}


const listFiles = async (req, res) => {
    const ACCESS_TOKEN = req.session.passport.user.access;
    const { folderID } = req.query;

    const query = `'${folderID}' in parents and mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document' and trashed = false`;

    try {
        const filesResponse = await axios.get(DRIVE_BASE_URL, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
            params: {
                q: query,
                spaces: "drive",
                fields: "files(id,name,mimeType)"
            }
        });
        console.log("Files: ", filesResponse.data)
        res.status(200).json({ data: filesResponse.data });
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("error", error.message)
            res.status(403).json({ msg: "Unauthorized. Please login again." })
        } else {
            console.log("error: ", error);
            res.status(500).json({ msg: error.message });
        }
    }
};



const uploadFile = (req, res) => {
    const { blob, fileName, folderID } = req.query.params
}

export { searchFolder, listFiles, createFolder, uploadFile }