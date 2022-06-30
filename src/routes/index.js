import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import Detail from '../pages/detail/Detail'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import CatalogPage from "../pages/CatalogPage";

function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthRequire>
                        <MainLayout />
                    </AuthRequire>
                }
            >

                <Route
                    path='/'
                    exact
                    element={<HomePage />}
                />
                <Route
                    path='/:category'
                    element={<CatalogPage />}
                />

                <Route
                    path='/:category/search/:keyword'
                    element={<CatalogPage />}
                />
                <Route
                    path='/:category/:id'
                    element={<Detail />}
                />
            </Route>

            <Route element={<BlankLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default Router;