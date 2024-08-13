import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { getCustomers, getData, getInventory, getOrders } from "../utils/Api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {

  const [order, setOrder] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrder(res.total);
      setRevenue(res.discountedTotal);
    });

    getCustomers().then((res) => {
      setCustomer(res.total);
    });

    getInventory().then((res) => {
      setInventory(res.total);
    })
  }, [])

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

      <RecentOrders />
      <DashboardChart />
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
    })
    setLoading(false);

  }, []);

  return (
    <>
    <Typography.Text style={{fontSize: 20, fontWeight: "bold"}}>Recent Orders</Typography.Text>
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
    >
    </Table>
    </>
  );
};

const DashboardChart = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: 'true',
        text: 'Order Revenue'
      }
    },
  };

  const labels = ["January", "Febuary", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  <Bar options={options} data={data} />
};

export default DashBoard;
