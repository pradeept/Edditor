import { Dialog, Spinner } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { api } from "../utils/axiosConfig";
import { modalContext } from "../context/ModalContext";
import { toastContext } from "../context/ToastContext";
import { ToastContainer } from "react-toastify";
import useToast from "../hooks/useToast";
import * as quillToWord from "quill-to-word";
import { textContext } from "../context/TextContext";

type fileObj = {
  id: string;
  name: string;
};

export default function Modal() {
  //@ts-ignore
  const { isModalOpen, setIsModalOpen, folderID, setFolderId } =
    useContext(modalContext);

  //@ts-ignore
  const { textData } = useContext(textContext);

  //@ts-ignore
  const { isLoading, setIsLoading } = useContext(toastContext);
  const [fileName, setFileName] = useState<string>(
    new Date().getTime().toString()
  );
  const [filesList, setFilesList] = useState<[fileObj] | null>(null);

  const showToast = useToast();

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      getFiles();
    }
  }, [isModalOpen]);

  useEffect(() => {
    // If folder does not exist in drive
    if (isModalOpen && folderID === null) {
      createFolder();
    } else if (isModalOpen) {
      fetchFiles();
    }
  }, [folderID]);

  const createFolder = async () => {
    const folderResponse = await api.post("/drive/create-folder");
    console.log(folderResponse);
    if (folderResponse.data.data) {
      const { id } = folderResponse.data.data;
      if (id) {
        setFolderId(id);
        console.log(folderID);
        showToast("success", "Folder created successfully");
      } else {
        showToast("error", "Folder creation failed!");
      }
    }
    setIsLoading(false);
  };

  const getFiles = async () => {
    // When there is no folderID in context
    if (folderID === null) {
      try {
        // Get folder ID if it already exists in drive
        const folderResponse = await api.get("/drive/folder-id");
        if (folderResponse.data.data) {
          const { files } = folderResponse.data.data;
          console.log(files);
          if (files.length != 0) {
            const folderIDlocal = files[0].id;
            setFolderId(files[0].id);
            console.log("FolderIDlocal: ", folderIDlocal);
            //Fetch files goes here
          }else{
            console.log("here")
            createFolder()
          }
        }
      } catch (e) {
        console.log(e);
        showToast(
          "error",
          e.status == 403 ? "Authentication failed! Please refresh the page to login" : e.message
        );
      }
    } else {
      await fetchFiles();
    }
  };

  const fetchFiles = async () => {
    try {
      const filesResponse = await api.get("/drive/files", {
        params: { folderID: folderID },
      });
      setFilesList(filesResponse.data.data.files);
      console.log("Files: ", filesResponse.data.data.files);
      console.log("Files List: ", filesList);

      setIsLoading(false);
    } catch (e) {
      //@ts-ignore
      showToast("error", e.message);
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const blob = await quillToWord.generateWord(textData, {
      exportAs: "blob",
    });

    const fd = new FormData();
    //@ts-ignore
    fd.append("file", blob, fileName);
    fd.append("fileName", fileName);
    fd.append("folderID", folderID);
    try {
      await api.post("/drive/upload", fd);
      showToast("success", "Success!");
    } catch (e) {
      showToast("error", "Something went wrong while saving the file!");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Dialog.Root open={isModalOpen}>
        <Dialog.Content maxWidth='450px' className=''>
          <ToastContainer />
          <Dialog.Title>Save as</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            edditor_saves/<b>{`${fileName}.docx`}</b>
          </Dialog.Description>
          <div className='border overflow-scroll min-h-[350px]  '>
            {isLoading ? (
              <div className='flex justify-center items-center min-h-[250px]'>
                <Spinner />
              </div>
            ) : filesList === null || filesList.length === 0 ? (
              <div className='flex justify-center items-center min-h-[250px]'>
                <p>No files found!</p>
              </div>
            ) : (
              filesList.map((item) => {
                return (
                  <p
                    key={item.id}
                    //@ts-ignore
                    onClick={(e) => setFileName(e.target.textContent)}
                    className='cursor-pointer p-4'
                  >
                    {item.name}
                    <hr />
                  </p>
                );
              })
            )}
          </div>
          <div>
            <input
              type='text'
              name='filename'
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder='Enter new filename'
              className='border w-full my-2 p-2 rounded'
            />
          </div>
          <div className='flex justify-around mt-[1rem]'>
            <button
              disabled={fileName === "" || isLoading ? true : false}
              onClick={handleSave}
              className='bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded active:border-none'
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:border-none'
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
