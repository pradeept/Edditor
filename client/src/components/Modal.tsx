import { Dialog, Spinner } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { api } from "../utils/axiosConfig";
import { modalContext } from "../context/ModalContext";
import { toastContext } from "../context/ToastContext";
import { ToastContainer } from "react-toastify";
import useToast from "../hooks/toast";

export default function Modal() {
  const { isModalOpen, setIsModalOpen, textData, folderID, setFolderId } =
    useContext(modalContext);

  const { isLoading, setIsLoading, isToastOpen, setIsToastOpen } =
    useContext(toastContext);
  const [fileName, setFileName] = useState<string>(
    new Date().getTime().toString()
  );
  const [filesList, setFilesList] = useState<string[]>([]);

  const showToast = useToast();

  const files = () => {
    const filename = [];
    for (let i = 0; i < 25; i++) {
      filename.push(`file_${i}`);
    }
    return filename;
  };
  const filenames: string[] = files();

  useEffect(() => {
    if (isModalOpen) getFiles();
  setIsLoading(true);

  }, [isModalOpen]);

  const createFolder = async () => {
    const response = await api.get("/drive/create-folder");
    if (folderResponse.data.data) {
      const { files } = folderResponse.data.data;
      if (!files.empty) {
        setFolderId(files[0]);
        console.log(folderID);
      }
    }
  };

  const getFiles = async () => {
    // if folderID is null
    // get the folderID - if it returns error - create the folder
    // otherwise user the folderID and get files.
    if (folderID === null) {
      try {
        const folderResponse = await api.get("/drive/folder-id");
        if (folderResponse.data.data) {
          const { files } = folderResponse.data.data;
          if (!files.empty) {
            setFolderId(files[0]);
            console.log(folderID);
          }
        }
        // If folder does not exist in drive:
        if (folderID === null) {
          const fd = new FormData();
          fd.append("name", "edditor_saves");
          try {
            const createFolder = await api.post("/drive/create-folder", fd);
          } catch (e) {
            console.log(e);
          }
        } else {
          // if exists
          try {
            const filesResponse = await api.get("/drive/files");
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSave = async () => {
    const fd = new FormData();
    fd.append("file", textData);
    fd.append("fileName", fileName);
    fd.append("folderID", folderID);
    try {
      const uploadResponse = await api.post("/drive/upload", fd);
    } catch (e) {
      console.log(e);
    }
    showToast("success", "Success!");
  };

  return (
    <>
      <Dialog.Root open={isModalOpen}>
        <Dialog.Content maxWidth='450px' className=''>
          <ToastContainer />
          <Dialog.Title>Save as</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            Edditor_saves/<b>{`${fileName}.docx`}</b>
          </Dialog.Description>
          <div className='border overflow-scroll max-h-[350px]  '>
            {isLoading ? (
              <div className='flex justify-center items-center min-h-[250px]'>
                <Spinner />
              </div>
            ) : (
              filenames.map((item, index) => {
                return (
                  <p
                    key={index}
                    onClick={(e) => setFileName(e.target.textContent)}
                    className='cursor-pointer'
                  >
                    {item}
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
