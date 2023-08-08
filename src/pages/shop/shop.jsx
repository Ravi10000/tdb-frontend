import styles from "./shop.module.scss";
import logo from "#assets/images/logos/tdb-logo.png";
import { productInfo } from "#data/product-info";
import ProductCard from "#components/product-card/product-card";

function ShopPage() {
  return (
    <div className={styles.shopPage}>
      <div className={styles.productsContainer}>
        {productInfo.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
