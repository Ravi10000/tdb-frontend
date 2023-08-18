import styles from "./profile.module.scss";

import CustomButton from "#components/custom-button/custom-button";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "#api/api";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { setUser } from "#redux/user/user.actions";
function ProfilePage({ pushFlash, setUser, currentUser }) {
  const navigate = useNavigate();
  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <h1>
          {currentUser?.firstName} {currentUser?.lastName}
        </h1>
        <h2>{currentUser?.email}</h2>
        <h2>{currentUser?.usertype}</h2>
        <CustomButton
          onClick={() => {
            removeAccessToken();
            setUser(null);
            navigate("/");
            pushFlash({
              type: "success",
              message: "signed out successfully",
            });
          }}
        >
          sign out
        </CustomButton>
      </div>
    </div>
  );
}
const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapState, { pushFlash, setUser })(ProfilePage);
