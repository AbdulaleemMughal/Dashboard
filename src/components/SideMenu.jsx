import { Menu } from "antd";
import React from "react";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const SideMenu = () => {

  const navigate = useNavigate();

  return (
    <div className="sideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "DashBoard",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Inventory",
            icon: <ShopOutlined />,
            key: "/inventory",
          },
          {
            label: "Orders",
            icon: <ShoppingCartOutlined />,
            key: "/orders",
          },
          {
            label: "Customers",
            icon: <UserOutlined />,
            key: "/customer",
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
