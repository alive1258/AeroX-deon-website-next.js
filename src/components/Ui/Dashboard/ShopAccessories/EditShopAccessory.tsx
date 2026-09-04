"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import {
  useGetSingleShopAccessoryQuery,
  useUpdateShopAccessoryMutation,
} from "@/src/redux/api/shopAccessoryApi";

interface EditShopAccessoryProps {
  id: string;
}

interface EditShopAccessoryFormValues {
  name: string;
  price: number;
  icon?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
}

const ALL_SHOP_ACCESSORIES_PATH = "/dashboard/shop-accessories/all-shop-accessories";

const EditShopAccessory = ({ id }: EditShopAccessoryProps) => {
  const router = useRouter();

  const { data: accessoryData, isLoading: isFetching } =
    useGetSingleShopAccessoryQuery(id);
  const [updateShopAccessory, { isLoading: isUpdating }] =
    useUpdateShopAccessoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditShopAccessoryFormValues>();

  useEffect(() => {
    if (accessoryData?.data) {
      const item = accessoryData.data;
      reset({
        name: item.name || "",
        price: item.price,
        icon: item.icon || "",
        button_link: item.button_link || "",
        position: item.position ?? 1,
        is_active: item.is_active ?? true,
      });
    }
  }, [accessoryData, reset]);

  const onSubmit: SubmitHandler<EditShopAccessoryFormValues> = async (values) => {
    try {
      await updateShopAccessory({
        id,
        data: {
          name: values.name,
          price: values.price,
          icon: values.icon || undefined,
          button_link: values.button_link || undefined,
          position:
            values.position !== undefined && !isNaN(values.position)
              ? values.position
              : undefined,
          is_active: values.is_active,
        },
      }).unwrap();

      toast.success("Shop accessory updated successfully!");
      router.push(ALL_SHOP_ACCESSORIES_PATH);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Failed to update shop accessory.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          <span>Loading accessory details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white border-gray-200 overflow-hidden p-6">
      <PageHeader
        title="Edit Shop Accessory"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Shop Accessories", link: ALL_SHOP_ACCESSORIES_PATH },
          { title: "Edit Shop Accessory" },
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
            label="Icon (Optional)"
            text="icon"
            placeholder="BatteryCharging"
            register={register("icon")}
            errors={errors}
            required={false}
          />

          <Input
            label="Button Link (Optional)"
            text="button_link"
            placeholder="/contact"
            register={register("button_link")}
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
            text={isUpdating ? "Updating..." : "Update Accessory"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditShopAccessory;
