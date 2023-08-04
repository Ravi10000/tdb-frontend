import Header from "#layouts/header/header";
import HomePage from "#pages/home/home";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate replace="/" />} />
      </Routes>
    </div>
  );
}

export default App;
