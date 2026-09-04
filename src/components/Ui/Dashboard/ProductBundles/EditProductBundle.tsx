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
import Textarea from "@/src/components/Common/Form/Textarea";
import {
  useGetSingleProductBundleQuery,
  useUpdateProductBundleMutation,
} from "@/src/redux/api/productBundleApi";

interface EditProductBundleProps {
  id: string;
}

interface EditProductBundleFormValues {
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

const EditProductBundle = ({ id }: EditProductBundleProps) => {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [includes, setIncludes] = useState<string[]>([]);
  const [includeItem, setIncludeItem] = useState("");

  const { data: bundleData, isLoading: isFetching } =
    useGetSingleProductBundleQuery(id);
  const [updateProductBundle, { isLoading: isUpdating }] =
    useUpdateProductBundleMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditProductBundleFormValues>();

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
    if (bundleData?.data) {
      const item = bundleData.data;
      reset({
        name: item.name || "",
        price: item.price,
        description: item.description || "",
        featured: item.featured ?? false,
        button_text: item.button_text || "",
        button_link: item.button_link || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setIncludes(item.includes || []);

      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [bundleData, reset]);

  const handleAddInclude = () => {
    if (!includeItem.trim()) return;
    setIncludes((prev) => [...prev, includeItem.trim()]);
    setIncludeItem("");
  };

  const handleRemoveInclude = (index: number) => {
    setIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<EditProductBundleFormValues> = async (values) => {
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

      formData.append("includes", JSON.stringify(includes));

      if (values.image?.[0]) {
        formData.append("image", values.image[0]);
      }

      await updateProductBundle({ id, data: formData }).unwrap();
      toast.success("Product bundle updated successfully!");
      router.push(ALL_PRODUCT_BUNDLES_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update product bundle.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading bundle details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Product Bundle"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Product Bundles", link: ALL_PRODUCT_BUNDLES_PATH },
          { title: "Edit Product Bundle" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name"
            text="name"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          <Input
            label="Price"
            text="price"
            type="number"
            register={register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            errors={errors}
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
              id="featured"
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured (shows &quot;Most Popular&quot; badge)
            </label>
          </div>

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

          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              What&apos;s Included (Optional)
            </label>

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

          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition bg-gray-50/50">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Bundle Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imagePreview ? (
                <div className="relative h-28 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Product Bundle Preview"
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
            text={isUpdating ? "Updating..." : "Update Bundle"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProductBundle;
