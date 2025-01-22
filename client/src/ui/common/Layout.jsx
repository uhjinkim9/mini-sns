import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PersistentDrawerRight from "./PersistentDrawerRight";

export default function Layout({ mainContent }) {
  return (
    <>
      <PersistentDrawerRight mainContent={mainContent} />
    </>
  );
}
