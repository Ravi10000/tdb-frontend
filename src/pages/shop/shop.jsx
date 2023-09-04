import styles from "./shop.module.scss";
import ProductCard from "#components/product-card/product-card";
import { useEffect, useState } from "react";
import { fetchProducts } from "#api/products.req";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const limit = 12;
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
  useEffect(() => {
    handleFetchProducts();
  }, []);
  return (
    <div className={styles.shopPage}>
      <div className={styles.productsContainer}>
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
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

export default ShopPage;
