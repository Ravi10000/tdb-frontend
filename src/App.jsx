import styles from "./App.module.scss";
import Header from "#layouts/header/header";
import ContactPage from "#pages/contact/contact";
import HomePage from "#pages/home/home";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./layouts/footer/footer";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.page}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="*" element={<Navigate replace="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
