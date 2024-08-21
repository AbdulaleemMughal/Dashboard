import { Table, Typography, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../utils/Api";
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from 'react-intl';

const Customer = ({locale}) => {

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
    <I18Provider locale={locale}>
    <Space size={20} direction="vertical">
      <Typography.Title level={4}><FormattedMessage id="customers" /></Typography.Title>
      <Table columns={[
        {
          title: <FormattedMessage id="userName" />,
          dataIndex: "username",
        },
        {
          title: <FormattedMessage id="firstName" />,
          dataIndex: "firstName",
        },
        {
          title: <FormattedMessage id="lastName" />,
          dataIndex: "lastName",
        },
        {
          title: <FormattedMessage id="email" />,
          dataIndex: "email",
        },
        {
          title: <FormattedMessage id="phone" />,
          dataIndex: "phone",
        },
        {
          title: <FormattedMessage id="address" />,
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
    </I18Provider>
  );
};

export default Customer;
