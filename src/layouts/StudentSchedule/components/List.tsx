
import React from "react";
import styles from "./List.module.scss";
import {
  Table,
  Tag 
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Moment from 'react-moment';
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource: any;
  onChangeIndex: (item: any) => void;
}
const List: React.FC<IListProps> = (props) => {

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      width: "5%",
      align: "center" as "center",
    },
    {
      title: "Học viên",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Ngày ",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render:(record=>{
      return <Moment format="DD-MM-YYYY">
      {record.date}
    </Moment>
      })
    },
    {
      title: "Điểm danh",
      width: "10%",
      key:"status",
      render: (record => {
        return ( 
          record.status==true?
          <Tag color="blue">Đã điểm danh</Tag>:
          <Tag color="red">Chưa điểm danh</Tag>
        )

      })
    }
  ];
  const handleTableChange = (pagination) => {
    props.onChangeIndex(pagination);
  };


  return (
    <>
      <Table
        {...props}
        columns={columns}
        bordered
        rowClassName="editable-row"
        className={styles.table}
        scroll={{ x: 500 }}
        rowKey={(record) => record.key}
        onChange={handleTableChange}
      />
    </>
  );
};

export default List;
