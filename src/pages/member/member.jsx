import styles from "./member.module.scss";
import { Navigate, useParams } from "react-router-dom";
import employeeImage from "#assets/images/employees/design-destrict/employee.jpg";
import { Balancer } from "react-wrap-balancer";

function MemberPage() {
  const { name } = useParams();
  if (!name) return <Navigate to="/" replace />;
  return (
    <div className={styles.memberPage}>
      <div className={styles.heroSection}>
        <h1>
          <Balancer>{name}</Balancer>
        </h1>
      </div>
      <div className={styles.about}>
        <p>@Pause_For_Applause</p>
        <p>
          <Balancer>
            Is a Vallejo native. She began developing her barber skills in 2013
            Hinton Barber college. Upon completion of barber college in 2014 she
            spent short time in an Oakland barbershop. She later found a home at
            Double edged where she provides haircuts, skin, scalp and facial
            services.
          </Balancer>
        </p>
        <div className={styles.workImages}>
          <img src="/work images/work.jpg" alt="" />
          <img src="/work images/work2.jpg" alt="" />
          <img src="/work images/work3.jpg" alt="" />
        </div>
        <div className={styles.buttonContainer}>
          <button>Book With {name}</button>
        </div>
      </div>
    </div>
  );
}

export default MemberPage;
