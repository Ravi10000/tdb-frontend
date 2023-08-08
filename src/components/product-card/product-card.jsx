import styles from "./product-card.module.scss";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className={styles.productCard} onClick={() => navigate("/shop/0")}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        <div className={styles.regular}>
          <p className={styles.price}>${product.regularPrice}</p>
          <p>REGULAR</p>
        </div>
        <div className={styles.member}>
          <p className={styles.price}>${product.memberPrice}</p>
          <p>MEMBER</p>
        </div>
        <p className={styles.finalPrice}>${product.finalPrice}</p>
      </div>
    </div>
  );
}

export default ProductCard;
