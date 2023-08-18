import styles from "./product-card.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, editable, editProduct, deleteProduct }) {
  const navigate = useNavigate();
  return (
    <div className={styles.productCard} onClick={() => navigate("/shop/0")}>
      <div className={styles.imageContainer}>
        <img
          src={`${import.meta.env.VITE_BASE_SERVER_URL}/images/${
            product.image
          }`}
          alt={product.name}
        />
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
      {editable && (
        <div className={styles.actions}>
          <p className={styles.status}>
            status:{" "}
            <span className={styles?.[product?.status]}>{product?.status}</span>
          </p>
          <CustomButton
            onClick={(e) => {
              e.stopPropagation();
              editProduct();
            }}
          >
            Edit
          </CustomButton>
          <CustomButton
            outlined
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct();
            }}
          >
            Delete
          </CustomButton>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
