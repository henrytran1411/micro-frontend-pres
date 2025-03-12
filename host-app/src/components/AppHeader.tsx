import { Layout, Menu, Typography } from "antd";
import { lazy, useEffect, useState } from "react";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
  const [BasketList, setBasketList] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBasketList(lazy(() => import("basket/BasketList")));
    }
  }, []);

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Text strong style={{ fontSize: "20px", color: "#1677ff" }}>
        My Store
      </Text>
      <Menu
        mode="horizontal"
        style={{ flex: 1, justifyContent: "center" }}
        selectable={false}
      >
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="products">Products</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
      </Menu>
      <ErrorBoundary>{BasketList && <BasketList />}</ErrorBoundary>
    </Header>
  );
};

export default AppHeader;
