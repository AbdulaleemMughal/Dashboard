import React, { useEffect, useState } from 'react';
import { Rate, Space, Table, Typography } from 'antd';
import { getInventory } from '../utils/Api';

const Inventory = () => {

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then(res => {
      setDataSource(res.products);
      setLoading(false);
    })
  }, []);

  return (
    <Space size={20} direction="vertical" style={{width: "100%"}}>
    <Typography.Title level={4}>Inventory</Typography.Title>
    <Table columns={[
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (value) => <span>${value}</span>
      },
      {
        title: "Rating",
        dataIndex: "rating",
        render: (rating) => <Rate value={rating} allowHalf disabled />
      },
      {
        title: "Stock",
        dataIndex: "stock",
      },
      {
        title: "Brand",
        dataIndex: "brand",
      },
      {
        title: "Category",
        dataIndex: "category",
      },
      {
        title: "Warranty",
        dataIndex: "warrantyInformation",
      }
    ]}
    loading={loading}
    dataSource={dataSource}
    pagination= {{
      pageSize: 5,
      showTotal: (total) => `Total ${total} users`,
    }}
    >
    </Table>
    </Space>
  )
}

export default Inventory;
