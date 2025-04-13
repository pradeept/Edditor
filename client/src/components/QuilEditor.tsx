import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // You can use other themes too

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start typing...",
      });
    }
    console.log(quillRef.current)           // use this get text and perform other ops !!!!
  }, []);

  return (
    <div className='min-h-40'>
      <div ref={editorRef} />
    </div>
  );
};

export default QuillEditor;
