import React, { useEffect, useState } from "react";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import { getComments, getOrders } from "../utils/Api";

const Header = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });

    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="header">
      <Image
        width={40}
        src="https://yt3.ggpht.com/ytc/AIdro_ly3xtIB91XFXkosdKSKwBSR3Yv0LGaG42i3XFKpeERrg=s88-c-k-c0x00ffffff-no-rj"
      ></Image>
      <Typography.Title>DashBoard</Typography.Title>
      <Space>
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
        title="Comments"
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
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
      >
        <List>
          {orders.map((comment) => (
            <List.Item key={comment.id}><Typography.Text strong>{comment.title}</Typography.Text> has been orderd.</List.Item>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
