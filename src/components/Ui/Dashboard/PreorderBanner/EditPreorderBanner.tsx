"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import { PreorderBundleItem } from "@/src/types/preorderBannerType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import Textarea from "@/src/components/Common/Form/Textarea";
import {
  useGetSinglePreorderBannerQuery,
  useUpdatePreorderBannerMutation,
} from "@/src/redux/api/preorderBannerApi";

interface EditPreorderBannerProps {
  id: string;
}

interface EditPreorderBannerFormValues {
  title: string;
  badge_text?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
}

const ALL_PREORDER_BANNER_PATH = "/dashboard/preorder-banner/all-preorder-banner";

const EditPreorderBanner = ({ id }: EditPreorderBannerProps) => {
  const router = useRouter();

  const [bundleItems, setBundleItems] = useState<PreorderBundleItem[]>([]);
  const [itemIcon, setItemIcon] = useState("");
  const [itemLabel, setItemLabel] = useState("");

  const { data: bannerData, isLoading: isFetching } =
    useGetSinglePreorderBannerQuery(id);
  const [updatePreorderBanner, { isLoading: isUpdating }] =
    useUpdatePreorderBannerMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPreorderBannerFormValues>();

  useEffect(() => {
    if (bannerData?.data) {
      const item = bannerData.data;
      reset({
        title: item.title || "",
        badge_text: item.badge_text || "",
        description: item.description || "",
        button_text: item.button_text || "",
        button_link: item.button_link || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });

      setBundleItems(item.bundle_items || []);
    }
  }, [bannerData, reset]);

  const handleAddBundleItem = () => {
    if (!itemIcon.trim() || !itemLabel.trim()) return;
    setBundleItems((prev) => [
      ...prev,
      { icon: itemIcon.trim(), label: itemLabel.trim() },
    ]);
    setItemIcon("");
    setItemLabel("");
  };

  const handleRemoveBundleItem = (index: number) => {
    setBundleItems((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<EditPreorderBannerFormValues> = async (
    values,
  ) => {
    try {
      await updatePreorderBanner({
        id,
        data: {
          title: values.title,
          badge_text: values.badge_text || undefined,
          description: values.description || undefined,
          button_text: values.button_text || undefined,
          button_link: values.button_link || undefined,
          position:
            values.position !== undefined && !isNaN(values.position)
              ? values.position
              : undefined,
          is_active: values.is_active,
          // Always send bundle_items so removals persist (an empty array
          // still needs to reach the backend to clear previously saved values).
          bundle_items: bundleItems,
        },
      }).unwrap();

      toast.success("Preorder banner updated successfully!");
      router.push(ALL_PREORDER_BANNER_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update preorder banner.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading preorder banner details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Preorder Banner"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Preorder Banner", link: ALL_PREORDER_BANNER_PATH },
          { title: "Edit Preorder Banner" },
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

          {/* Badge */}
          <Input
            label="Badge (Optional)"
            text="badge_text"
            placeholder="Limited Offer"
            register={register("badge_text")}
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

          {/* CTA Button */}
          <Input
            label="Button Text"
            text="button_text"
            placeholder="Preorder Now"
            register={register("button_text")}
            errors={errors}
            required={false}
          />
          <Input
            label="Button Link"
            text="button_link"
            placeholder="/shop"
            register={register("button_link")}
            errors={errors}
            required={false}
          />

          {/* Description */}
          <Textarea
            label="Description (Optional)"
            text="description"
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

          {/* Bundle Items */}
          <div className="col-span-full flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Bundle Items (Optional)
            </label>
            <p className="text-xs text-gray-500">
              Shown as bundled perks next to the CTA (e.g. Extra Battery,
              Propeller Guard). Icon name uses Lucide icon names, e.g.
              &quot;BatteryCharging&quot;, &quot;ShieldCheck&quot;,
              &quot;Briefcase&quot;.
            </p>

            {bundleItems.length > 0 && (
              <div className="space-y-2">
                {bundleItems.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex-1 min-w-0 grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-500">{item.icon}</span>
                      <span className="font-medium text-gray-800">
                        {item.label}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBundleItem(index)}
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
                value={itemIcon}
                onChange={(e) => setItemIcon(e.target.value)}
                placeholder="Icon (e.g. BatteryCharging)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={itemLabel}
                onChange={(e) => setItemLabel(e.target.value)}
                placeholder="Label (e.g. Extra Battery)"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddBundleItem}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
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
            text={isUpdating ? "Updating..." : "Update Preorder Banner"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPreorderBanner;
