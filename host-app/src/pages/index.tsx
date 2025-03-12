import { Layout, Spin } from "antd";
import React, { lazy, Suspense, useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import ErrorBoundary from "@/components/ErrorBoundary";

const { Content } = Layout;

const Home = () => {
  const [ProductPageComponent, setProductPageComponent] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setProductPageComponent(lazy(() => import("products/ProductPage")));
    }
  }, []);
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px", backgroundColor: "white" }}>
        <ErrorBoundary>
          <Suspense fallback={<Spin size="large" />}>
            {ProductPageComponent && <ProductPageComponent />}
          </Suspense>
        </ErrorBoundary>
      </Content>
    </Layout>
  );
};

export default Home;
