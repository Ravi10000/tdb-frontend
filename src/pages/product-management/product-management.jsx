import styles from "./product-management.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { productInfo } from "#data/product-info";
import ProductCard from "#components/product-card/product-card";
import { deleteProduct, fetchProducts } from "#api/products.req";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "#pages/loading/loading";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import WithPopup from "#components/with-popup/with-popup";
import ProductPopup from "#components/product-popup/product-popup";
import DeletePopup from "#components/delete-popup/delete-popup";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";

function ProductManagement({ pushFlash }) {
  const queryClient = useQueryClient();
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForDeletion, setProductForDeletion] = useState(null);

  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  async function handleFetchProducts() {
    try {
      const response = await fetchProducts(skip);
      if (response.data.status === "success") {
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleFetchPrevProducts() {
    if (skip === 0) return;
    try {
      const res = await fetchProducts(skip - limit);
      if (res.data.status === "success") {
        setSkip(skip - limit);
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log({ err });
    }
  }
  async function handleFetchMoreProducts() {
    if (skip + limit >= totalProducts) return;

    const res = await fetchProducts(skip + limit);
    if (res.data.status === "success") {
      setSkip(skip + limit);
      setProducts(res.data.products);
    }
  }

  const onError = (error) => {
    pushFlash({
      type: "error",
      message: error?.response?.data?.message || "Something went wrong",
    });
    console.log({ error });
  };
  const onSuccess = (successResponse) => {
    pushFlash({
      message: `Product deleted successfully.`,
      type: "success",
    });
    console.log({ successResponse });
    queryClient.invalidateQueries("products");
    close();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (id) => {
      const res = await deleteProduct(id);
      return res.data;
    },
    onSuccess,
    onError,
  });
  useEffect(() => {
    handleFetchProducts();
  }, []);
  return (
    <div className={styles.productManagement}>
      {showPopup && <ProductPopup close={() => setShowPopup(false)} />}
      {selectedProduct && (
        <ProductPopup
          close={() => setSelectedProduct(null)}
          selectedProduct={selectedProduct}
        />
      )}
      {productForDeletion && (
        <DeletePopup
          title="Are you sure about it?"
          subtitle="This action cannot be undone."
          isDeleting={isLoading}
          close={() => setProductForDeletion(null)}
          deleteFn={() => {
            console.log("delete");
            mutate(productForDeletion._id);
          }}
        />
      )}
      <div className="_admin_head">
        <h1>Manage Products</h1>
        <CustomButton
          fit
          onClick={() => {
            setShowPopup(true);
          }}
        >
          Add Product
        </CustomButton>
      </div>

      <div className={styles.productsContainer}>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              editable
              deleteProduct={() => setProductForDeletion(product)}
              editProduct={() => setSelectedProduct(product)}
            />
          ))}
      </div>
      <div className="_pagination">
        <div className="_info">
          <p>
            {skip <= 0 ? 0 : skip}-{skip + products?.length} / {totalProducts}{" "}
          </p>
        </div>
        <div className="_navigation">
          <BiLeftArrowAlt
            className="_nav_icon"
            onClick={handleFetchPrevProducts}
            disabled={skip <= 0}
          />
          <BiRightArrowAlt
            className="_nav_icon"
            onClick={handleFetchMoreProducts}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(null, { pushFlash })(ProductManagement);
