import styles from "./product.module.scss";
import { useParams } from "react-router-dom";
import { productInfo } from "#data/product-info";

function ProductPage() {
  const { id } = useParams();
  const product = productInfo?.[typeof id === "number" ? id : 0];
  return (
    <div className={styles.productPage}>
      <div className={styles.imageContainer}>
        <img src={product?.image} alt={product?.name} />
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
