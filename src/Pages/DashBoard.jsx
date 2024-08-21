import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { getCustomers, getData, getInventory, getOrders, getRevenue } from "../utils/Api";
import Linechart from "../components/Linechart";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from "react-intl";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashBoard = ({locale}) => {
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
    <I18Provider locale={locale}>
    <div>
      <Space direction="vertical" size={10}>
        <Typography.Title level={4}><FormattedMessage id="dashboard" /></Typography.Title>
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
            title={<FormattedMessage id="order" />}
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
            title={<FormattedMessage id="inventory" />}
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
            title={<FormattedMessage id="customers" />}
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
            title={<FormattedMessage id="revenue" />}
            value={revenue}
          />
        </Space>
        <Typography.Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {<FormattedMessage id="recent" />}
        </Typography.Text>
        <Space
          direction="horizantal"
          size={100}
          style={{ alignItems: "center" }}
        >
          <RecentOrders />
          <Card title={<FormattedMessage id="barChart" />}>
            <DashboardChart />
          </Card>
        </Space>
        <Space direction="horizantal" size={200}>
          
          
        </Space>
        {/* component here */}
      </Space>
    </div>
    </I18Provider>
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
      <Table
        columns={[
          {
            title: <FormattedMessage id="title" />,
            dataIndex: "title",
          },
          {
            title: <FormattedMessage id="quantity" />,
            dataIndex: "quantity",
          },
          {
            title: <FormattedMessage id="price" />,
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
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [100, 200, 300, 154, 150, 150, 390, 233, 500, 123, 123, 454],
        backgroundColor: "red",
      },
    ],
  };
  const options = {};

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: data,
        backgroundColor: "red",
      }
      setRevenueData(dataSource);
    });

  }, [])

  return (
    <I18Provider locale={LOCALES.GERMAN}>
      <Bar data={data} options={options} style={{ width: 450 }} />
      </I18Provider>
  );
};

export default DashBoard;
