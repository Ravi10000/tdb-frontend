import styles from "./App.module.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { fetchProfile } from "#api/auth.req";
import { getAccessToken, removeAccessToken, setAccessToken } from "#api/api";
import { endFetching, setUser, startFetching } from "#redux/user/user.actions";

import Header from "#layouts/header/header";
import Footer from "./layouts/footer/footer";
import BookNowButton from "#components/book-now-button/book-now-button";
import FlashGroup from "#components/flash-group/flash-group";
import WithNoUser from "#components/auth/with-no-user";

import LoadingPage from "#pages/loading/loading";

const ContactPage = lazy(() => import("#pages/contact/contact"));
const ShopPage = lazy(() => import("#pages/shop/shop"));
const HomePage = lazy(() => import("#pages/home/home"));
const ProductPage = lazy(() => import("#pages/product/product"));
const SigninPage = lazy(() => import("#pages/signin/signin"));
const SignupPage = lazy(() => import("#pages/signup/signup"));
const VerifyOTPPage = lazy(() => import("#pages/verify-otp/verify-otp"));

function App({ flashList, setUser, startFetching, endFetching }) {
  const fetchProfileQuery = useQuery(
    ["profile"],
    async () => {
      startFetching();
      const res = await fetchProfile();
      return res.data;
    },
    {
      retry: false,
      enabled: !getAccessToken() ? false : true,
    }
  );
  if (fetchProfileQuery.error) {
    removeAccessToken();
    setUser(null);
    endFetching();
  }
  if (fetchProfileQuery.data !== undefined) {
    console.log(fetchProfileQuery.data);
    setUser(fetchProfileQuery.data.user);
    setAccessToken(fetchProfileQuery.data.accessToken);
    endFetching();
  }

  return (
    <div className={styles.App}>
      <Header />
      {flashList?.length > 0 && <FlashGroup flashList={flashList} />}
      <BookNowButton />
      <div className={styles.page}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/shop/:id" element={<ProductPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route
              path="/signin"
              element={
                <WithNoUser>
                  <SigninPage />
                </WithNoUser>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="*" element={<Navigate replace="/" />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

const mapState = (state) => ({
  flashList: state.flash,
});

export default connect(mapState, { setUser, startFetching, endFetching })(App);
