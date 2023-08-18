import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingPage from "#pages/loading/loading";

function WithAdmin({ currentUser, isFetching, children }) {
  console.log({ currentUser, isFetching });
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetching && currentUser?.usertype !== "admin") {
      console.log("not admin, redirecting to homepage");
      navigate("/signin");
    }
  }, [isFetching, currentUser]);

  return isFetching ? <LoadingPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  isFetching: state.user.isFetching,
});
export default connect(mapState)(WithAdmin);
