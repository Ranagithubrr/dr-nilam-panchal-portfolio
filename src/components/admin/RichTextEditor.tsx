"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] rounded-b-2xl border border-t-0 border-white/70 bg-white/90 px-4 py-3 text-sm text-[#2d3b41] outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="rounded-2xl border border-white/70 bg-white/70 shadow-sm">
      <div className="flex flex-wrap gap-2 rounded-t-2xl border-b border-white/70 bg-[#f8f1e3] px-3 py-2 text-xs font-semibold text-[#17323D]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-full px-3 py-1 ${
            editor.isActive("bold") ? "bg-[#17323D] text-white" : "bg-white"
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-full px-3 py-1 ${
            editor.isActive("italic") ? "bg-[#17323D] text-white" : "bg-white"
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded-full px-3 py-1 ${
            editor.isActive("underline") ? "bg-[#17323D] text-white" : "bg-white"
          }`}
        >
          Underline
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-full px-3 py-1 ${
            editor.isActive("bulletList") ? "bg-[#17323D] text-white" : "bg-white"
          }`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded-full px-3 py-1 ${
            editor.isActive("orderedList") ? "bg-[#17323D] text-white" : "bg-white"
          }`}
        >
          Numbered List
        </button>
        <button
          type="button"
          onClick={toggleLink}
          className={`rounded-full px-3 py-1 ${
            editor.isActive("link") ? "bg-[#17323D] text-white" : "bg-white"
          }`}
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
