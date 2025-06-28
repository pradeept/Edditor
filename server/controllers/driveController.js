import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";


const FOLDER_NAME = "edditor_saves";
const DRIVE_BASE_URL = "https://www.googleapis.com/drive/v3/files"


const searchFolder = async (req, res) => {
    if (req.session.passport == undefined) {
        res.status(403).json({ msg: "Authentication required" });
        return
    }
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
    if (req.session.passport == undefined) {
        res.status(403).json({ msg: "Authentication required" });
        return
    }
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
    if (req.session.passport == undefined) {
        res.status(403).json({ msg: "Authentication required" });
        return
    }
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




const uploadFile = async (req, res) => {
    if (req.session.passport == undefined) {
        res.status(403).json({ msg: "Authentication required" });
        return
    }
    const ACCESS_TOKEN = req.session.passport.user.access;
    const { folderID, fileName } = req.body;
    const file = req.file; // from multer middleware

    if (!file || !fileName || !folderID) {
        return res.status(400).json({ error: 'Missing file, fileName, or folderID' });
    }

    // Metadata
    const metadata = {
        name: `${fileName}.docx`,
        parents: [folderID],
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    };

    const fd = new FormData();

    // Append metadata as JSON string
    fd.append("metadata", JSON.stringify(metadata), {
        contentType: "application/json"
    });

    // Append file stream with proper content type and filename
    fd.append("file", fs.createReadStream(file.path), {
        contentType: metadata.mimeType,
        filename: `${fileName}.docx`
    });

    try {
        const uploadResponse = await axios.post(
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            fd,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    ...fd.getHeaders()
                }
            }
        );

        console.log(uploadResponse.data);
        res.status(200).json({ msg: "Uploaded successfully", file: uploadResponse.data });
    } catch (e) {
        console.error("Upload error:", e);
        res.status(500).json({ msg: "Upload failed", error: e.message });
    } finally {
        try {
            console.log(file)
            console.log(file.path)
            await fs.unlink(file.path, err => {
                if (err) console.log(err);
                else {
                    console.log("File deleted successfully");
                }
            });
        } catch (cleanupErr) {
            console.error("Cleanup failed:", cleanupErr);
        }
    }
};


export { searchFolder, listFiles, createFolder, uploadFile }