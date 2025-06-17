import { useContext, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { textContext } from "../context/TextContext";

const QuillEditor = () => {
  const { setTextData } = useContext(textContext);

  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start typing...",
      });
    }
  }, [quillRef.current]);

  useEffect(() => {
    quillRef.current?.on("text-change", () => {
      const deltaa = quillRef.current?.getContents();
      setTextData(deltaa);
    });

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, [quillRef.current]);

  return (
    <div className='py-4'>
      <div ref={editorRef} className='min-h-[470px] ' />
    </div>
  );
};

export default QuillEditor;
