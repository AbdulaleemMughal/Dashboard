import { Table, Typography, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../utils/Api";

const Customer = () => {

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    setLoading(true);

    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });

  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customer</Typography.Title>
      <Table columns={[
        {
          title: "User Name",
          dataIndex: "username",
        },
        {
          title: "First Name",
          dataIndex: "firstName",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
        },
        {
          title: "Address",
          dataIndex: "address",
          render: (address) => {
            return <span>{address.address}, {address.city}</span>
          }
        },
      ]}
      loading={loading}
      dataSource={dataSource}
      pagination={{
        pageSize: 5,
        showTotal: (total) => `Total ${total} users`,
      }}
      >

      </Table>
    </Space>
  );
};

export default Customer;
