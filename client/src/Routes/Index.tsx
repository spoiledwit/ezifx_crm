import React from "react";
import { Route, Routes } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import Layout from "Layout";
import NonAuthLayout from "Layout/NonLayout";
import AuthProtected from "./AuthProtected";
import { useAuthStore } from "store/useAuthStore";
import KycPage from "pages/KYC";

const RouteIndex = () => {
  const { user } = useAuthStore();

  if (user && !user.hasKYC) {
    return (
      <Routes>
        <Route path="*" element={<KycPage />} />
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <Routes>
        {authProtectedRoutes.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AuthProtected>
                <Layout>
                  <route.component />
                </Layout>
              </AuthProtected>
            }
          />
        ))}
        {publicRoutes.map((route: any, idx: number) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <NonAuthLayout>
                <route.component />
              </NonAuthLayout>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default RouteIndex;
