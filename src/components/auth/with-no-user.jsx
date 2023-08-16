import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "#pages/loading/loading";

function WithNoUser({ currentUser, isFetching, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetching && currentUser) navigate("/");
  }, [isFetching, currentUser]);

  return isFetching ? <LoadingPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  isFetching: state.user.isFetching,
});
export default connect(mapState)(WithNoUser);
