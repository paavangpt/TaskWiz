import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import DataContext from "./Contexts/DataContext";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { Home, Layout } from "react-feather";
import HomePage from "./Pages/Home/HomePage";

ReactDOM.createRoot(document.getElementById("root")).render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/app" element={<App />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
);
