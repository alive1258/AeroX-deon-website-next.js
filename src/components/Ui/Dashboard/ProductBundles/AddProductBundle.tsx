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
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import { useCreateProductBundleMutation } from "@/src/redux/api/productBundleApi";

interface AddProductBundleFormValues {
  name: string;
  price: number;
  description?: string;
  featured: boolean;
  button_text?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
  image?: FileList;
}

const ALL_PRODUCT_BUNDLES_PATH = "/dashboard/product-bundles/all-product-bundles";

const AddProductBundle = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [includes, setIncludes] = useState<string[]>([]);
  const [includeItem, setIncludeItem] = useState("");

  const [createProductBundle, { isLoading }] = useCreateProductBundleMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddProductBundleFormValues>({
    defaultValues: {
      name: "",
      featured: false,
      button_text: "Preorder",
      button_link: "/contact",
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

  const handleAddInclude = () => {
    if (!includeItem.trim()) return;
    setIncludes((prev) => [...prev, includeItem.trim()]);
    setIncludeItem("");
  };

  const handleRemoveInclude = (index: number) => {
    setIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<AddProductBundleFormValues> = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("price", String(values.price));
      formData.append("is_active", String(values.is_active));
      formData.append("featured", String(values.featured));

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

      if (includes.length > 0) {
        formData.append("includes", JSON.stringify(includes));
      }

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await createProductBundle(formData).unwrap();
      toast.success("Product bundle created successfully!");
      reset();
      setImagePreview(null);
      setIncludes([]);
      router.push(ALL_PRODUCT_BUNDLES_PATH);
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
        title="Add Product Bundle"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Product Bundles", link: ALL_PRODUCT_BUNDLES_PATH },
          { title: "Add Product Bundle" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Input
            label="Name"
            text="name"
            placeholder="Standard"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          {/* Price */}
          <Input
            label="Price"
            text="price"
            type="number"
            placeholder="899"
            register={register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            errors={errors}
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

          {/* CTA Button */}
          <Input
            label="Button Text"
            text="button_text"
            placeholder="Preorder"
            register={register("button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Button Link"
            text="button_link"
            placeholder="/contact"
            register={register("button_link")}
            errors={errors}
            required={false}
          />

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
            placeholder="The essential AeroX Max Pro kit."
            register={register("description")}
            errors={errors}
            required={false}
            className="col-span-full"
          />

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured (shows &quot;Most Popular&quot; badge)
            </label>
          </div>

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
              Active (visible on shop page)
            </label>
          </div>

          {/* Includes */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              What&apos;s Included (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Line items shown in the bundle&apos;s checklist, e.g.
              &quot;AeroX Max Pro drone&quot;, &quot;1 intelligent flight
              battery&quot;.
            </p>

            {includes.length > 0 && (
              <div className="space-y-2">
                {includes.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <span className="flex-1 text-sm text-gray-800">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInclude(index)}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={includeItem}
                onChange={(e) => setIncludeItem(e.target.value)}
                placeholder="AeroX Max Pro drone"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddInclude}
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
              Bundle Image
            </label>

            {imagePreview ? (
              <div className="relative mb-4 h-40 w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Product Bundle Preview"
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
            text={isLoading ? "Saving..." : "Create Bundle"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductBundle;
