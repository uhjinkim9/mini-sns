import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Layout from "./ui/common/Layout";
import Login from "./ui/login/Login";

function App() {
  const mainContent = "메인";

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 추후 DB로 관리 */}
          <Route path="/" exact element={<Login />} />
          <Route
            path="/main"
            exact
            element={<Layout mainContent={mainContent} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
