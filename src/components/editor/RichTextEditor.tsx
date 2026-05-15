"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorToolbar";

interface Props {
  content: JSONContent | null;
  onChange: (c: JSONContent) => void;
  placeholder?: string;
  onImageUpload?: () => void;
}

export default function RichTextEditor({ content, onChange, placeholder = "Start writing...", onImageUpload }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      ImageExt.configure({ HTMLAttributes: { class: "rounded-lg max-w-full" } }),
      LinkExt.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-brand-accent hover:text-brand-highlight underline" },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-brand-400 before:float-left before:h-0 before:pointer-events-none",
      }),
    ],
    content: content || undefined,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-brand max-w-none min-h-[300px] p-4 focus:outline-none text-brand-50",
      },
    },
  });

  return (
    <div className="bg-brand-800 border border-brand-700 rounded-lg overflow-hidden">
      <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent editor={editor} />
    </div>
  );
}
