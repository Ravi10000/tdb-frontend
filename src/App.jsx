import styles from "./App.module.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { fetchProfile } from "#api/auth.req";
import { getAccessToken, removeAccessToken, setAccessToken } from "#api/api";
import { endFetching, setUser, startFetching } from "#redux/user/user.actions";

import FlashGroup from "#components/flash-group/flash-group";

import LoadingPage from "#pages/loading/loading";
import ProductManagement from "#pages/product-management/product-management";
import UserManagement from "#pages/user-management/user-management";

const Header = lazy(() => import("#layouts/header/header"));
const Footer = lazy(() => import("#layouts/footer/footer"));
const BookNowButton = lazy(() =>
  import("#components/book-now-button/book-now-button")
);
const AdminSidebar = lazy(() => import("#layouts/admin-sidebar/admin-sidebar"));
const WithAdmin = lazy(() => import("#components/auth/with-admin"));
const WithNoUser = lazy(() => import("#components/auth/with-no-user"));
const WithUser = lazy(() => import("#components/auth/with-user"));
const ContactPage = lazy(() => import("#pages/contact/contact"));
const ShopPage = lazy(() => import("#pages/shop/shop"));
const HomePage = lazy(() => import("#pages/home/home"));
const ProductPage = lazy(() => import("#pages/product/product"));
const SigninPage = lazy(() => import("#pages/signin/signin"));
const SignupPage = lazy(() => import("#pages/signup/signup"));
const VerifyOTPPage = lazy(() => import("#pages/verify-otp/verify-otp"));
const ProfilePage = lazy(() => import("#pages/profile/profile"));
const OurTeamPage = lazy(() => import("#pages/our-team/our-team"));
const MemberPage = lazy(() => import("#pages/member/member"));

function App({ flashList, setUser, startFetching, endFetching }) {
  const { pathname } = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const closeSidebar = () => setIsSidebarVisible(false);
  const openSidebar = () => setIsSidebarVisible(true);

  const isAdmin = pathname.includes("admin");
  const isHome = pathname === "/";

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
  useEffect(() => {
    (async () => {
      if (fetchProfileQuery.error) {
        removeAccessToken();
        await setUser(null);
        await endFetching();
        return;
      }
      if (fetchProfileQuery.data !== undefined) {
        console.log(fetchProfileQuery.data);
        await setUser(fetchProfileQuery.data.user);
        setAccessToken(fetchProfileQuery.data.accessToken);
        await endFetching();
      }
    })();
  }, [fetchProfileQuery.data, fetchProfileQuery.error]);

  return (
    <div className={styles.App}>
      {!isAdmin && (
        <Suspense fallback={<></>}>
          <Header />
        </Suspense>
      )}
      {flashList?.length > 0 && <FlashGroup flashList={flashList} />}
      {!isAdmin && (
        <Suspense fallback={<></>}>
          <BookNowButton />
        </Suspense>
      )}
      <div className={`${styles.page} ${isAdmin ? styles.adminPanel : ""}`}>
        {isAdmin && (
          <Suspense fallback={<></>}>
            <AdminSidebar
              close={closeSidebar}
              open={openSidebar}
              isSidebarVisible={isSidebarVisible}
            />
          </Suspense>
        )}
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
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
            <Route
              path="/signup"
              element={
                <WithNoUser>
                  <SignupPage />
                </WithNoUser>
              }
            />
            <Route
              path="/verify-otp"
              element={
                <WithNoUser>
                  <VerifyOTPPage />
                </WithNoUser>
              }
            />
            <Route
              path="/profile"
              element={
                <WithUser>
                  <ProfilePage />
                </WithUser>
              }
            />
            <Route path="/our-team" element={<OurTeamPage />} />
            <Route path="/members/:name" element={<MemberPage />} />

            {/* <Route
              path="/admin/:panel"
              element={
                <WithAdmin>
                  <AdminPanel />
                </WithAdmin>
              }
            /> */}
            <Route
              path="/admin/products"
              element={
                <WithAdmin>
                  <ProductManagement />
                </WithAdmin>
              }
            />
            <Route
              path="/admin/users"
              element={
                <WithAdmin>
                  <UserManagement />
                </WithAdmin>
              }
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/products" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      {!isAdmin && (
        <Suspense fallback={<></>}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

const mapState = (state) => ({
  flashList: state.flash,
});

export default connect(mapState, { setUser, startFetching, endFetching })(App);
