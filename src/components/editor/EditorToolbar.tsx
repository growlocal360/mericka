"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
} from "lucide-react";
import clsx from "clsx";

interface Props {
  editor: Editor | null;
  onImageUpload?: () => void;
}

export default function EditorToolbar({ editor, onImageUpload }: Props) {
  if (!editor) return null;

  const Btn = ({
    onClick,
    active,
    label,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    label: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={clsx(
        "p-2 rounded transition-colors text-brand-200 hover:bg-brand-700 hover:text-white",
        active && "bg-brand-700 text-white"
      )}
    >
      {children}
    </button>
  );

  const promptLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-0.5 p-2 border-b border-brand-700 bg-brand-900">
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} label="Heading 1">
        <Heading1 className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Heading 2">
        <Heading2 className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Heading 3">
        <Heading3 className="w-4 h-4" />
      </Btn>
      <span className="w-px bg-brand-700 mx-1" />
      <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
        <Bold className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
        <Italic className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} label="Underline">
        <UnderlineIcon className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Strikethrough">
        <Strikethrough className="w-4 h-4" />
      </Btn>
      <span className="w-px bg-brand-700 mx-1" />
      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bullet list">
        <List className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Ordered list">
        <ListOrdered className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Blockquote">
        <Quote className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Horizontal rule">
        <Minus className="w-4 h-4" />
      </Btn>
      <span className="w-px bg-brand-700 mx-1" />
      <Btn onClick={promptLink} active={editor.isActive("link")} label="Link">
        <LinkIcon className="w-4 h-4" />
      </Btn>
      {onImageUpload && (
        <Btn onClick={onImageUpload} label="Image">
          <ImageIcon className="w-4 h-4" />
        </Btn>
      )}
      <span className="w-px bg-brand-700 mx-1" />
      <Btn onClick={() => editor.chain().focus().undo().run()} label="Undo">
        <Undo className="w-4 h-4" />
      </Btn>
      <Btn onClick={() => editor.chain().focus().redo().run()} label="Redo">
        <Redo className="w-4 h-4" />
      </Btn>
    </div>
  );
}
