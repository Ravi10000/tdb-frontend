import styles from "./product-card.module.scss";

function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
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
    