"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import { ApiError } from "@/src/types/authType";
import PageHeader from "@/src/components/Common/PageHeader/PageHeader";
import GradientButton from "@/src/components/Common/PageHeader/GradientButton";
import Input from "@/src/components/Common/Form/Input";
import { useCreateShopAccessoryMutation } from "@/src/redux/api/shopAccessoryApi";

interface AddShopAccessoryFormValues {
  name: string;
  price: number;
  icon?: string;
  button_link?: string;
  position?: number;
  is_active: boolean;
}

const ALL_SHOP_ACCESSORIES_PATH = "/dashboard/shop-accessories/all-shop-accessories";

const AddShopAccessory = () => {
  const router = useRouter();

  const [createShopAccessory, { isLoading }] = useCreateShopAccessoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddShopAccessoryFormValues>({
    defaultValues: {
      name: "",
      button_link: "/contact",
      position: 1,
      is_active: true,
    },
  });

  const onSubmit: SubmitHandler<AddShopAccessoryFormValues> = async (values) => {
    try {
      await createShopAccessory({
        name: values.name,
        price: values.price,
        icon: values.icon || undefined,
        button_link: values.button_link || undefined,
        position:
          values.position !== undefined && !isNaN(values.position)
            ? values.position
            : undefined,
        is_active: values.is_active,
      }).unwrap();

      toast.success("Shop accessory created successfully!");
      reset();
      router.push(ALL_SHOP_ACCESSORIES_PATH);
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
        title="Add Shop Accessory"
        breadcrumbs={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Shop Accessories", link: ALL_SHOP_ACCESSORIES_PATH },
          { title: "Add Shop Accessory" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name"
            text="name"
            placeholder="Extra Intelligent Battery"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          <Input
            label="Price"
            text="price"
            type="number"
            placeholder="89"
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
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Create Accessory"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddShopAccessory;
