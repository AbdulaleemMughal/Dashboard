import React, { useEffect, useState } from "react";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import { getComments, getOrders } from "../utils/Api";
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from "react-intl";
import SideMenu from "./SideMenu";
import PageContent from "./PageContent";
import Footer from "./Footer";
import { GlobalOutlined } from "@ant-design/icons";

const Header = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });

    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const handleLocale = (e) => {
    setLocale(e.target.value);
  };

  return (
    <>
      <I18Provider locale={locale}>
        <div className="header">
          <Image
            width={40}
            src="https://yt3.ggpht.com/ytc/AIdro_ly3xtIB91XFXkosdKSKwBSR3Yv0LGaG42i3XFKpeERrg=s88-c-k-c0x00ffffff-no-rj"
          ></Image>
          <Typography.Title>
            <FormattedMessage id="dashboard" />
          </Typography.Title>
          <Space size={10}>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <GlobalOutlined /> Select Language
              </button>
              <ul className="dropdown-menu dropdown-menu-light">
                <li className="px-5" onClick={() => setLocale(LOCALES.ENGLISH)}>
                  English
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="px-5" onClick={() => setLocale(LOCALES.GERMAN)}>
                  German
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="px-5" onClick={() => setLocale(LOCALES.FRENCH)}>
                  French
                </li>
              </ul>
            </div>

            <Badge count={comments.length} dot>
              <MailOutlined
                style={{ fontSize: 24 }}
                onClick={() => setCommentsOpen(true)}
              />
            </Badge>
            <Badge count={orders.length}>
              <BellFilled
                style={{ fontSize: 24 }}
                onClick={() => setNotificationsOpen(true)}
              />
            </Badge>
          </Space>
          <Drawer
            title={<FormattedMessage id="comments" />}
            open={commentsOpen}
            onClose={() => {
              setCommentsOpen(false);
            }}
          >
            <List>
              {comments.map((comment) => (
                <List.Item key={comment.id}>{comment.body}</List.Item>
              ))}
            </List>
          </Drawer>
          <Drawer
            title={<FormattedMessage id="notifications" />}
            open={notificationsOpen}
            onClose={() => {
              setNotificationsOpen(false);
            }}
          >
            <List>
              {orders.map((comment) => (
                <List.Item key={comment.id}>
                  <Typography.Text strong>{comment.title}</Typography.Text>{" "}
                  <FormattedMessage id="orders" />
                </List.Item>
              ))}
            </List>
          </Drawer>
        </div>
      </I18Provider>
      <Space className="SideMenuAndPageContent">
        <SideMenu locale={locale} />
        <PageContent locale={locale} />
      </Space>
      <Footer locale={locale} />
    </>
  );
};

export default Header;
