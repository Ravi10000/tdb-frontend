import styles from "./product.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProductPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      navigate("/shop");
    }
  }, [state]);
  return (
    <div className={styles.productPage}>
      <div className={styles.imageContainer}>
        <img
          src={`${import.meta.env.VITE_BASE_SERVER_URL}/images/${
            product.image
          }`}
          alt={product?.name}
        />
      </div>
      <div className={styles.info}>
        <h1>{product?.name}</h1>
        <div className={styles.prices}>
          <div className={styles.priceContainer}>
            <p className={styles.price}>${product?.regularPrice}</p>
            <p>REGULAR</p>
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.price}>${product?.memberPrice}</p>
            <p>MEMBER</p>
          </div>
        </div>
        <p className={styles.description}>{product?.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
