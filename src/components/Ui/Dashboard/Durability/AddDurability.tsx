"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft, Upload, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ApiError } from "@/src/types/authType";
import { DurabilitySpec } from "@/src/types/durabilityType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateDurabilityMutation } from "@/src/redux/api/durabilityApi";

interface AddDurabilityFormValues {
  title: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_DURABILITY_PATH = "/dashboard/durability/all-durability";

const AddDurability = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [specs, setSpecs] = useState<DurabilitySpec[]>([]);
  const [specValue, setSpecValue] = useState("");
  const [specLabel, setSpecLabel] = useState("");

  const [createDurability, { isLoading }] = useCreateDurabilityMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddDurabilityFormValues>({
    defaultValues: {
      title: "",
      button_text: "View Specifications",
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

  const handleAddSpec = () => {
    if (!specValue.trim() || !specLabel.trim()) return;
    setSpecs((prev) => [
      ...prev,
      {
        value: specValue.trim(),
        label: specLabel.trim(),
      },
    ]);
    setSpecValue("");
    setSpecLabel("");
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<AddDurabilityFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("is_active", String(values.is_active));

      if (values.description) formData.append("description", values.description);
      if (values.button_text) formData.append("button_text", values.button_text);
      if (values.button_link) formData.append("button_link", values.button_link);

      if (
        values.position !== undefined &&
        values.position !== null &&
        !isNaN(values.position)
      ) {
        formData.append("position", String(values.position));
      }

      if (specs.length > 0) {
        formData.append("specs", JSON.stringify(specs));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createDurability(formData).unwrap();
      toast.success("Durability section created successfully!");
      reset();
      setImagePreview(null);
      setSpecs([]);
      router.push(ALL_DURABILITY_PATH);
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
        title="Add Durability Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Durability Section", link: ALL_DURABILITY_PATH },
          { title: "Add Durability" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <Textarea
            label="Title"
            text="title"
            placeholder={"Made to Move.\nBuilt to Last."}
            register={register("title", { required: "Title is required" })}
            errors={errors}
            className="col-span-full"
          />

          {/* CTA Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Button Text
              </label>
              <input
                type="text"
                placeholder="View Specifications"
                {...register("button_text")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Button Link
              </label>
              <input
                type="text"
                placeholder="/features"
                {...register("button_link")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Display Position (Optional)
              </label>
              <input
                type="number"
                {...register("position", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
            placeholder="Foldable design. Aerospace-grade materials. Ready for every adventure."
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

          {/* Specs */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Spec Highlights (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Shown as quick spec callouts (e.g. Weight, Flight Time, Weather
              Resistance).
            </p>

            {specs.length > 0 && (
              <div className="space-y-2">
                {specs.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex-1 min-w-0 grid grid-cols-2 gap-2 text-sm">
                      <span className="font-medium text-gray-800">
                        {spec.value}
                      </span>
                      <span className="text-gray-600">{spec.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
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
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="Value (e.g. 1.2 kg)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={specLabel}
                onChange={(e) => setSpecLabel(e.target.value)}
                placeholder="Label (e.g. Lightweight)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Section Image
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Durability Image Preview"
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
            text={isLoading ? "Saving..." : "Create Durability"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDurability;
