"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// components
import Navbar from "@/components/Navbar";

// hooks
import useUploadImage from "@/hooks/_uploadImage";
import { useUpdateNews } from "@/hooks/useNews";

// API and models
import { getNewsBySlug } from "@/api/NewsAction";
import { FormDataNews, ResultApiNewsBySlug } from "@/models/News";

// icons
import {
  IconArrowLeft,
  IconBoldFill,
  IconBulletList,
  IconItalicFill,
  IconListBullets,
  IconStrikeThroughFill,
} from "justd-icons";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IconRecord } from "justd-icons";

export default function NewsEditPage() {
  const { slug } = useParams();
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataNews>({
    cover: null,
    title: "",
    description: "",
    body: "",
  });

  // Query untuk mendapatkan data berita
  const { data: news } = useQuery<ResultApiNewsBySlug>({
    queryKey: ["news", slug],
    queryFn: () => getNewsBySlug(typeof slug === "string" ? slug : ""),
    enabled: Boolean(slug),
  });

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // Default content
  });

  // Update state dan editor saat data dari server didapat
  useEffect(() => {
    if (news) {
      setFormData({
        title: news.data.title,
        description: news.data.description,
        cover: null,
        body: news.data.body,
      });
      setBannerPreview(news.data.cover);

      // Mengisi konten editor Tiptap dengan body dari data berita
      if (editor) {
        editor.commands.setContent(news.data.body);
      }
    }
  }, [news, editor]);

  const mutationUpdateNews = useUpdateNews();
  const mutationUploadImage = useUploadImage();

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({ ...prev, cover: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.body) {
      alert("Semua field harus diisi.");
      return;
    }

    const editorContent = editor?.getHTML() || ""; // Ambil konten editor

    if (formData.cover) {
      // Jika ada cover, jalankan upload image terlebih dahulu
      const formDataObj = new FormData();
      formDataObj.append("cover", formData.cover);

      mutationUploadImage.mutate(formDataObj, {
        onSuccess: (response) => {
          const uploadedCover = response.data.cover.replace("news/", "");

          mutationUpdateNews.mutate({
            slug: typeof slug === "string" ? slug : "",
            data: {
              title: formData.title,
              description: formData.description,
              body: editorContent,
              cover: uploadedCover,
            },
          });
        },
        onError: (err) => {
          console.error("Upload gagal:", err);
        },
      });
    } else {
      // Jika tidak ada cover, langsung update berita
      mutationUpdateNews.mutate({
        slug: typeof slug === "string" ? slug : "",
        data: {
          title: formData.title,
          description: formData.description,
          body: editorContent,
          cover: news?.data.cover || "", // Gunakan cover sebelumnya jika ada
        },
      });
    }
  };

  return (
    <>
      <Navbar active={2} />
      <main className="px-20 mt-10">
        <section className="card bg-base-100 shadow-md p-7 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">Edit NEWS</h2>
            <Link href="/news" className="btn btn-neutral">
              <IconArrowLeft className="w-5" />
              Back
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-7">
            <div className="relative">
              <div className="sticky top-0">
                <div className="mb-10">
                  <label className="label-text" htmlFor="banner">
                    Banner
                  </label>
                  <label htmlFor="banner">
                    <img
                      src={bannerPreview || "/img-placeholder.png"}
                      alt="bannerPreview"
                      className="rounded cursor-pointer w-[700px] h-[300px] object-cover mx-auto"
                    />
                    <input
                      id="banner"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBannerChange}
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Title</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Description</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div>
                  <button className="btn btn-neutral" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="mb-5">
                <label htmlFor="content">Content</label>
                <div className="tiptap-editor">
                  {/* Menu Bar */}
                  <div className="control-group mt-4 flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().setParagraph().run()
                      }
                      className={`btn btn-sm inline-flex items-center gap-1 ${
                        editor?.isActive("paragraph")
                          ? "btn-error"
                          : "btn-neutral"
                      }`}
                    >
                      <IconRecord />
                      Paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 1 })
                          .run()
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
                      disabled={
                        !editor?.can().chain().focus().toggleBold().run()
                      }
                      className={`btn btn-sm inline-flex items-center gap-1 ${
                        editor?.isActive("bold") ? "btn-error" : "btn-neutral"
                      }`}
                    >
                      <IconBoldFill />
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      disabled={
                        !editor?.can().chain().focus().toggleItalic().run()
                      }
                      className={`btn btn-sm inline-flex items-center gap-1 ${
                        editor?.isActive("italic") ? "btn-error" : "btn-neutral"
                      }`}
                    >
                      <IconItalicFill />
                      Italic
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleStrike().run()
                      }
                      disabled={
                        !editor?.can().chain().focus().toggleStrike().run()
                      }
                      className={`btn btn-sm inline-flex items-center gap-1 ${
                        editor?.isActive("strike") ? "btn-error" : "btn-neutral"
                      }`}
                    >
                      <IconStrikeThroughFill />
                      Strike
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                      }
                      className={`btn btn-sm inline-flex items-center gap-1 ${
                        editor?.isActive("bulletList")
                          ? "btn-error"
                          : "btn-neutral"
                      }`}
                    >
                      <IconBulletList />
                      Bullet List
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                      }
                      className={`btn btn-sm inline-flex items-center gap-1 ${
                        editor?.isActive("orderedList")
                          ? "btn-error"
                          : "btn-neutral"
                      }`}
                    >
                      <IconListBullets />
                      Ordered List
                    </button>
                  </div>
                  {/* Tiptap Editor */}
                  <EditorContent
                    editor={editor}
                    className="border rounded mt-2"
                  />
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
