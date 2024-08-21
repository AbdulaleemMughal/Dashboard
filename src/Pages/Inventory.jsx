import React, { useEffect, useState } from 'react';
import { Card, Rate, Space, Table, Typography } from 'antd';
import { getInventory } from '../utils/Api';
import Linechart from '../components/Linechart';
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from 'react-intl';

const Inventory = ({locale}) => {

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
  <I18Provider locale={locale}>
    <Typography.Title level={4}><FormattedMessage id='inventory' /></Typography.Title>
    <Space size={20} direction="horizantal" style={{width: "100%"}}>
    <Table columns={[
      {
        title: <FormattedMessage id="title" />,
        dataIndex: "title",
      },
      {
        title: <FormattedMessage id="price" />,
        dataIndex: "price",
        render: (value) => <span>${value}</span>
      },
      {
        title: <FormattedMessage id="rating" />,
        dataIndex: "rating",
        render: (rating) => <Rate value={rating} allowHalf disabled />
      },
      {
        title: <FormattedMessage id="stock" />,
        dataIndex: "stock",
      },
      {
        title: <FormattedMessage id="brand" />,
        dataIndex: "brand",
      },
      {
        title: <FormattedMessage id="warranty" />,
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
    <Card title={<FormattedMessage id="lineChart" />} style={{width: "600px"}}>
            <Linechart />
          </Card>
    </Space>
    </I18Provider>
  );
};

export default Inventory;
