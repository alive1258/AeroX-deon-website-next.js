"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateGimbalBannerMutation } from "@/src/redux/api/gimbalBannerApi";

interface AddGimbalBannerFormValues {
  title: string;
  eyebrow?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_GIMBAL_BANNER_PATH = "/dashboard/gimbal-banner/all-gimbal-banner";

const AddGimbalBanner = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createGimbalBanner, { isLoading }] = useCreateGimbalBannerMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddGimbalBannerFormValues>({
    defaultValues: {
      title: "",
      button_text: "Learn More",
      button_link: "/features",
      position: 1,
      is_active: true,
    },
  });

  const imageFileList = watch("image");

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFileList]);

  const onSubmit: SubmitHandler<AddGimbalBannerFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("is_active", String(values.is_active));

      if (values.eyebrow) formData.append("eyebrow", values.eyebrow);
      if (values.description)
        formData.append("description", values.description);
      if (values.button_text)
        formData.append("button_text", values.button_text);
      if (values.button_link)
        formData.append("button_link", values.button_link);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createGimbalBanner(formData).unwrap();
      toast.success("Gimbal banner created successfully!");
      reset();
      setImagePreview(null);
      router.push(ALL_GIMBAL_BANNER_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Add Gimbal Banner"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Gimbal Banner", link: ALL_GIMBAL_BANNER_PATH },
          { title: "Add Gimbal Banner" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eyebrow */}
          <Input
            label="Eyebrow (Optional)"
            text="eyebrow"
            placeholder="Precision Engineering"
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

          {/* Title */}
          <Textarea
            label="Title"
            text="title"
            placeholder={"Stabilized.\nPrecise.\nProfessional."}
            register={register("title", { required: "Title is required" })}
            errors={errors}
            className="col-span-full"
          />
          <p className="col-span-full -mt-4 text-xs text-gray-500">
            Each new line becomes its own line on the homepage banner.
          </p>

          {/* CTA Button */}
          <Input
            label="Button Text"
            text="button_text"
            placeholder="Learn More"
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

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
            placeholder="Advanced gimbal + EIS ensure buttery smooth footage, every time."
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
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

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Banner Image
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Gimbal Banner Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mb-4 h-40 w-full max-w-md rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 text-gray-400">
                <Upload size={24} />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-full
              file:border-0
              file:font-semibold
              file:bg-emerald-50
              file:text-emerald-700
              hover:file:bg-emerald-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Create Gimbal Banner"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddGimbalBanner;
