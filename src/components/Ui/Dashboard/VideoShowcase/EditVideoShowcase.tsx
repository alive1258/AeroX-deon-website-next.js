"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleVideoShowcaseQuery,
  useUpdateVideoShowcaseMutation,
} from "@/src/redux/api/videoShowcaseApi";

interface EditVideoShowcaseProps {
  id: string;
}

interface EditVideoShowcaseFormValues {
  title: string;
  eyebrow?: string;
  video_url?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_VIDEO_SHOWCASE_PATH = "/dashboard/video-showcase/all-video-showcase";

const EditVideoShowcase = ({ id }: EditVideoShowcaseProps) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const { data: itemData, isLoading: isFetching } =
    useGetSingleVideoShowcaseQuery(id);
  const [updateVideoShowcase, { isLoading: isUpdating }] =
    useUpdateVideoShowcaseMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditVideoShowcaseFormValues>();

  const imageFileList = watch("image");

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFileList]);

  useEffect(() => {
    if (itemData?.data) {
      const item = itemData.data;
      reset({
        title: item.title || "",
        eyebrow: item.eyebrow || "",
        video_url: item.video_url || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setThumbnails(item.thumbnails || []);

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [itemData, reset]);

  const handleAddThumbnail = () => {
    if (!thumbnailUrl.trim()) return;
    setThumbnails((prev) => [...prev, thumbnailUrl.trim()]);
    setThumbnailUrl("");
  };

  const handleRemoveThumbnail = (index: number) => {
    setThumbnails((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<EditVideoShowcaseFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("is_active", String(values.is_active));

      if (values.eyebrow) formData.append("eyebrow", values.eyebrow);
      if (values.video_url) formData.append("video_url", values.video_url);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      // Always send thumbnails so removals persist.
      formData.append("thumbnails", JSON.stringify(thumbnails));

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await updateVideoShowcase({ id, data: formData }).unwrap();
      toast.success("Video showcase updated successfully!");
      router.push(ALL_VIDEO_SHOWCASE_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update video showcase.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading video showcase details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Video Showcase"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Video Showcase", link: ALL_VIDEO_SHOWCASE_PATH },
          { title: "Edit Video Showcase" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Eyebrow */}
          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            placeholder="Real Flight, Real Footage"
            register={register("eyebrow")}
            errors={errors}
            required={false}
          />

          {/* Position */}
          <Input
            label="Display Position (Optional)"
            text="position"
            type="number"
            register={register("position", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          {/* Video URL */}
          <Input
            label="Video URL (Optional)"
            text="video_url"
            placeholder="https://www.youtube.com/watch?v=..."
            register={register("video_url")}
            errors={errors}
            required={false}
          />

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-700"
            >
              Active (visible on homepage)
            </label>
          </div>

          {/* Thumbnails */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Filmstrip Thumbnails (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Image URLs shown in the thumbnail row below the main reel.
            </p>

            {thumbnails.length > 0 && (
              <div className="space-y-2">
                {thumbnails.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <span className="flex-1 min-w-0 truncate text-sm text-gray-700">
                      {url}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveThumbnail(index)}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/thumb.jpg"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddThumbnail}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Main Reel Poster Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Video Showcase Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-28 w-full max-w-sm rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400 shrink-0">
                  <Upload size={24} />
                </div>
              )}

              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:font-semibold file:bg-emerald-50
                  file:text-emerald-700 hover:file:bg-emerald-100
                  cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Allowed formats: JPG, PNG, WEBP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium text-gray-700 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Video Showcase"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditVideoShowcase;
