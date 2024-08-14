import React, { useEffect, useState } from 'react';
import { Space, Table, Typography } from 'antd';
import { getOrders } from '../utils/Api';


const Order = () => {

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then(res => {
      setDataSource(res.products);
      setLoading(false);
    })
  }, []);

  return (
    <Space size={20} direction="vertical">
    <Typography.Title level={4}>Recent Orders</Typography.Title>
    <Table columns={[
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (price) => <span>${price}</span>
      },
      {
        title: "DiscountedPrice",
        dataIndex: "discountedTotal",
        render: (dprice) => <span>${dprice}</span>
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
      {
        title: "Total",
        dataIndex: "total",
        render: (tprice) => <span>${tprice}</span>
      },
      
    ]}
    loading={loading}
    dataSource={dataSource}
    pagination= {{
      showTotal: (total) => `Total ${total} users`,
    }}
    >

    </Table>
    </Space>
  )
}

export default Order;
