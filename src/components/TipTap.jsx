// "use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  IconBoldFill,
  IconBulletList,
  IconItalicFill,
  IconListBullets,
  IconRecord,
  IconStrikeThroughFill,
} from "justd-icons";

const TiptapEditor = forwardRef((content, ref) => {
  // const [content, setContent] = useState(props.initialContent || "");

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Expose getContent to parent
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (editor) {
        return editor.getHTML();
      }
      return "";
    },
  }));

  return (
    <div className="tiptap-editor">
      {/* Menu Bar */}
      <div className="control-group mt-4 flex gap-1">
        <button
          type="button"
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("paragraph") ? "btn-error" : "btn-neutral"
          }`}
        >
          <IconRecord />
          Paragraph
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("heading", { level: 1 })
              ? "btn-error"
              : "btn-neutral"
          }`}
        >
          <IconRecord />
          H1
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("bold") ? "btn-error" : "btn-neutral"
          }`}
        >
          <IconBoldFill />
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("italic") ? "btn-error" : "btn-neutral"
          }`}
        >
          <IconItalicFill />
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("strike") ? "btn-error" : "btn-neutral"
          }`}
        >
          <IconStrikeThroughFill />
          Strike
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("bulletList") ? "btn-error" : "btn-neutral"
          }`}
        >
          <IconBulletList />
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`btn btn-sm inline-flex items-center gap-1 ${
            editor?.isActive("orderedList") ? "btn-error" : "btn-neutral"
          }`}
        >
          <IconListBullets />
          Ordered List
        </button>
      </div>
      {/* Tiptap Editor */}
      <EditorContent
        editor={editor}
        className="border border-neutral rounded mt-2"
      />
    </div>
  );
});

export default TiptapEditor;
