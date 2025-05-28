import "./index.css";
import "./styles/variables.css";
import App from "./components/App.tsx";
import Layout from "./components/Layout.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./components/Settings.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<div>not found</div>}></Route>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
