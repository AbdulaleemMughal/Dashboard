import React, { useEffect, useState } from "react";
import { Card, Space, Table, Typography } from "antd";
import { getOrders } from "../utils/Api";
import DoughnutChart from "../components/DoughnutChart";
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from 'react-intl';

const Order = ({locale}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <I18Provider locale={locale}>
      <Typography.Title level={4}>Recent Orders</Typography.Title>
      <Space size={20} direction="horizantal">
        <Table
          columns={[
            {
              title: <FormattedMessage id="title" />,
              dataIndex: "title",
            },
            {
              title: <FormattedMessage id="price" />,
              dataIndex: "price",
              render: (price) => <span>${price}</span>,
            },
            {
              title: <FormattedMessage id="dTotal" />,
              dataIndex: "discountedTotal",
              render: (dprice) => <span>${dprice}</span>,
            },
            {
              title: <FormattedMessage id="quantity" />,
              dataIndex: "quantity",
            },
            {
              title: <FormattedMessage id="total" />,
              dataIndex: "total",
              render: (tprice) => <span>${tprice}</span>,
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={{
            showTotal: (total) => `Total ${total} users`,
          }}
        ></Table>
        <Card title={<FormattedMessage id="pieChart" />}>
          <DoughnutChart />
        </Card>
      </Space>
      </I18Provider>
  );
};

export default Order;
