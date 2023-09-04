import styles from "./our-team.module.scss";
import { Balancer } from "react-wrap-balancer";
import employeeImage from "#assets/images/employees/design-destrict/image.jpg";
import { useNavigate } from "react-router-dom";

function OurTeamPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.ourTeamPage}>
      <div className={styles.heading}>
        <h1>
          <Balancer>
            BOOK YOUR APPOINTMENT WITH YOUR SELECTED PROFESSIONAL
          </Balancer>
        </h1>
      </div>
      <div className={styles.container}>
        <div className={styles.membersContainer}>
          {[...Array(9)].map((_, i) => (
            <div
              className={styles.memberInfo}
              key={i}
              onClick={() => navigate("/members/patrice johnson")}
            >
              <img src={employeeImage} alt="" />
              <p>Patrice Johnson</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeamPage;
