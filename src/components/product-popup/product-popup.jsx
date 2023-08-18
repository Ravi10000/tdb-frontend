import styles from "./product-popup.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import ImageInput from "#components/image-input/image-input";
import WithPopup from "#components/with-popup/with-popup";
import { useForm } from "react-hook-form";
import CustomTextarea from "#components/custom-textarea/custom-textarea";
import StatusSelect from "#components/status-select/status-select";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { imageTypes } from "#data/image-types";
import { createProduct, updateProduct } from "#api/products.req";

function ProductPopup({ close, pushFlash, selectedProduct }) {
  const queryClient = useQueryClient();
  const schema = z.object({
    name: z.string().min(1, "Product name requried"),
    regularPrice: z.string().min(1, "Regular price requried"),
    memberPrice: z.string().min(1, "Member price requried"),
    description: z.string().min(1, "Description requried"),
    image: z
      .any()
      .refine(
        (file) => (selectedProduct ? true : file?.[0]),
        selectedProduct ? true : "Image Required."
      )
      .refine((file) => {
        return selectedProduct
          ? file?.[0]
            ? imageTypes.includes(file?.[0]?.type)
            : true
          : imageTypes.includes(file?.[0]?.type);
      }, "Only .jpg, .jpeg, .png and .webp, .svg formats are supported.")
      .refine(
        (file) =>
          selectedProduct
            ? file?.[0]
              ? file?.[0]?.size <= 50_00_000
              : true
            : file?.[0]?.size <= 50_00_000,
        `Max image size is 5MB.`
      ),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selectedProduct?.name,
      regularPrice: selectedProduct?.regularPrice?.toString(),
      memberPrice: selectedProduct?.memberPrice?.toString(),
      description: selectedProduct?.description,
    },
  });
  console.log({ errors });
  const [selectedStatus, setSelectedStatus] = useState("active");
  const image = watch("image");
  const description = watch("description");

  const onError = (error) => {
    pushFlash({
      type: "error",
      message: error?.response?.data?.message || "Something went wrong",
    });
    console.log({ error });
  };
  const onSuccess = (successResponse) => {
    pushFlash({
      message: `Product ${
        selectedProduct ? "updated" : "created"
      } successfully.`,
      type: "success",
    });
    console.log({ successResponse });
    queryClient.invalidateQueries("products");
    close();
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await createProduct(data);
      return res.data;
    },
    onSuccess,
    onError,
  });
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const res = await updateProduct(data);
      return res.data;
    },
    onSuccess,
    onError,
  });
  const handleProductSubmission = (data) => {
    data.status = selectedStatus;
    if (data.image?.[0]?.size) data.image = data?.image[0];

    if (selectedProduct) {
      data.productId = selectedProduct._id;
      console.log({ data });
      console.log("update");
      return update(data);
    }
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleProductSubmission)}>
      <WithPopup
        title="Add Product"
        close={close}
        isSubmitting={isLoading || isUpdating}
      >
        <ImageInput
          register={{ ...register("image") }}
          image={image?.[0]}
          defaultValue={selectedProduct?.image}
          error={errors?.image?.message}
        />
        <CustomInput
          placeholder="Product Name"
          register={{ ...register("name") }}
          error={errors?.name?.message}
        />
        <CustomInput
          maxLength="6"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          placeholder="Regular price"
          register={{ ...register("regularPrice") }}
          error={errors?.regularPrice?.message}
        />
        <CustomInput
          maxLength="6"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          placeholder="Member price"
          register={{ ...register("memberPrice") }}
          error={errors?.memberPrice?.message}
        />
        <CustomTextarea
          label="Product description"
          text={description}
          error={errors?.description?.message}
          register={{ ...register("description") }}
        />
        <StatusSelect selected={selectedStatus} setStatus={setSelectedStatus} />
      </WithPopup>
    </form>
  );
}

export default connect(null, { pushFlash })(ProductPopup);
