"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

export default function ArticleContent({ content }: { content: JSONContent | null | undefined }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      ImageExt.configure({ HTMLAttributes: { class: "rounded-lg max-w-full my-6" } }),
      LinkExt.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-brand-accent hover:text-brand-highlight underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Underline,
    ],
    content: content || undefined,
    editable: false,
    editorProps: { attributes: { class: "prose prose-brand prose-lg max-w-none" } },
  });

  if (!content) return null;
  return <EditorContent editor={editor} />;
}
