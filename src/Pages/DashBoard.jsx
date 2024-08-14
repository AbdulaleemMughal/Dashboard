import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { getCustomers, getData, getInventory, getOrders } from "../utils/Api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashBoard = () => {
  const [order, setOrder] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrder(res.totalProducts);
      setRevenue(res.total);
    });

    getCustomers().then((res) => {
      setCustomer(res.total);
    });

    getInventory().then((res) => {
      setInventory(res.total);
    });
  }, []);

  return (
    <>
      <Space direction="vertical" size={20}>
        <Typography.Title level={4}>DashBoard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  backgroundColor: "rgba(0, 255, 0, 0.25)",
                  color: "green",
                  borderRadius: 16,
                  padding: 12,
                  fontSize: 24,
                }}
              />
            }
            title={"Orders"}
            value={order}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  backgroundColor: "rgba(0, 0, 255, 0.25)",
                  color: "blue",
                  borderRadius: 16,
                  padding: 12,
                  fontSize: 24,
                }}
              />
            }
            title={"Inventory"}
            value={inventory}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  backgroundColor: "rgba(0, 2655, 255, 0.25)",
                  color: "purple",
                  borderRadius: 16,
                  padding: 12,
                  fontSize: 24,
                }}
              />
            }
            title={"Customer"}
            value={customer}
          />
          <DashboardCard
            icon={
              <DollarOutlined
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.25)",
                  color: "red",
                  borderRadius: 16,
                  padding: 12,
                  fontSize: 24,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          />
        </Space>
        <Space direction="horizantal" size={100}>
          <RecentOrders />
          <Card>
            <DashboardChart />
          </Card>
        </Space>
      </Space>
    </>
  );
};

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card>
      <Space>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

const RecentOrders = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setDataSource(res.products);
    });
    setLoading(false);
  }, []);

  return (
    <>
      <Typography.Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Recent Orders
      </Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedTotal",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
};

const DashboardChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Branch",
        data: [100, 200, 300, 154, 150, 150, 390, 233, 989, 123, 123, 454],
        backgroundColor: "red",
      },
    ],
  };
  const options = {};

  return (
    <div>
      <Bar data={data} options={options} style={{width: 450}}/>
    </div>
  );
};

export default DashBoard;
