import { Menu } from "antd";
import React from "react";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from "react-intl";

const SideMenu = ({locale}) => {

  const navigate = useNavigate();

  return (
    <I18Provider locale={locale}>
    <div className="sideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: <FormattedMessage id="dashboard"/>,
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: <FormattedMessage id="inventory"/>,
            icon: <ShopOutlined />,
            key: "/inventory",
          },
          {
            label: <FormattedMessage id="order"/>,
            icon: <ShoppingCartOutlined />,
            key: "/orders",
          },
          {
            label: <FormattedMessage id="customers"/>,
            icon: <UserOutlined />,
            key: "/customer",
          },
        ]}
      ></Menu>
    </div>
    </I18Provider>
  );
};

export default SideMenu;
