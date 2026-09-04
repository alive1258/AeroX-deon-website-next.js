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
import { PerformanceFeature } from "@/src/types/performanceType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import {
  useGetSinglePerformanceQuery,
  useUpdatePerformanceMutation,
} from "@/src/redux/api/performanceApi";

interface EditPerformanceProps {
  id: string;
}

interface EditPerformanceFormValues {
  title: string;
  eyebrow?: string;
  description?: string;
  rating_value?: string;
  rating_label?: string;
  community_text?: string;
  community_subtext?: string;
  button_text?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_PERFORMANCE_PATH = "/dashboard/performance/all-performance";

const EditPerformance = ({ id }: EditPerformanceProps) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [features, setFeatures] = useState<PerformanceFeature[]>([]);
  const [featureIcon, setFeatureIcon] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");

  const { data: itemData, isLoading: isFetching } = useGetSinglePerformanceQuery(id);
  const [updatePerformance, { isLoading: isUpdating }] = useUpdatePerformanceMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditPerformanceFormValues>();

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
        description: item.description || "",
        rating_value: item.rating_value || "",
        rating_label: item.rating_label || "",
        community_text: item.community_text || "",
        community_subtext: item.community_subtext || "",
        button_text: item.button_text || "",
        button_link: item.button_link || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setFeatures(item.features || []);

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [itemData, reset]);

  const handleAddFeature = () => {
    if (!featureIcon.trim() || !featureTitle.trim() || !featureDescription.trim())
      return;
    setFeatures((prev) => [
      ...prev,
      {
        icon: featureIcon.trim(),
        title: featureTitle.trim(),
        description: featureDescription.trim(),
      },
    ]);
    setFeatureIcon("");
    setFeatureTitle("");
    setFeatureDescription("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<EditPerformanceFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("is_active", String(values.is_active));

      if (values.eyebrow) formData.append("eyebrow", values.eyebrow);
      if (values.description) formData.append("description", values.description);
      if (values.rating_value) formData.append("rating_value", values.rating_value);
      if (values.rating_label) formData.append("rating_label", values.rating_label);
      if (values.community_text)
        formData.append("community_text", values.community_text);
      if (values.community_subtext)
        formData.append("community_subtext", values.community_subtext);
      if (values.button_text) formData.append("button_text", values.button_text);
      if (values.button_link) formData.append("button_link", values.button_link);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      formData.append("features", JSON.stringify(features));

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await updatePerformance({ id, data: formData }).unwrap();
      toast.success("Performance section updated successfully!");
      router.push(ALL_PERFORMANCE_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update performance section.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading performance details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Performance Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Performance Section", link: ALL_PERFORMANCE_PATH },
          { title: "Edit Performance" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            placeholder="Next-Gen Aerial System"
            register={register("eyebrow")}
            errors={errors}
            required={false}
          />

          <Input
            label="Display Position (Optional)"
            text="position"
            type="number"
            register={register("position", { valueAsNumber: true })}
            errors={errors}
            required={false}
          />

          <Input
            label="Button Text"
            text="button_text"
            placeholder="Explore Features"
            register={register("button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Button Link"
            text="button_link"
            placeholder="/features"
            register={register("button_link")}
            errors={errors}
            required={false}
          />

          <Input
            label="Rating Value (Optional)"
            text="rating_value"
            placeholder="4.9/5"
            register={register("rating_value")}
            errors={errors}
            required={false}
          />
          <Input
            label="Rating Label (Optional)"
            text="rating_label"
            placeholder="from verified pilots"
            register={register("rating_label")}
            errors={errors}
            required={false}
          />

          <Input
            label="Community Text (Optional)"
            text="community_text"
            placeholder="Join 12,000+"
            register={register("community_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Community Subtext (Optional)"
            text="community_subtext"
            placeholder="Happy Flyers"
            register={register("community_subtext")}
            errors={errors}
            required={false}
          />

          <Textarea
            label="Description (Optional)"
            text="description"
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
          />

          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (visible on homepage)
            </label>
          </div>

          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Features (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Shown as the feature list beside the image. Icon name uses Lucide
              icon names, e.g. &quot;MapPin&quot;, &quot;ShieldCheck&quot;,
              &quot;BatteryCharging&quot;.
            </p>

            {features.length > 0 && (
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    key={`${feature.title}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex-1 min-w-0 grid grid-cols-3 gap-2 text-sm">
                      <span className="text-gray-500">{feature.icon}</span>
                      <span className="font-medium text-gray-800">
                        {feature.title}
                      </span>
                      <span className="text-gray-600">{feature.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
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
                value={featureIcon}
                onChange={(e) => setFeatureIcon(e.target.value)}
                placeholder="Icon (e.g. MapPin)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={featureTitle}
                onChange={(e) => setFeatureTitle(e.target.value)}
                placeholder="Title (e.g. GPS Assisted Flight)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={featureDescription}
                onChange={(e) => setFeatureDescription(e.target.value)}
                placeholder="Description"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Performance Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Performance Image Preview"
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
            text={isUpdating ? "Updating..." : "Update Performance"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPerformance;
