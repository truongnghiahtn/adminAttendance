
import React from "react";
import styles from "./List.module.scss";
import {
  Table,
  Modal,
} from "antd";
import { ButtonOption } from "components/UI";
const { confirm } = Modal;
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource:any;
  onDetailItem: (item: any) => void;
  onChangeIndex:(item:any)=>void;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    if (e.key === "1") {
      props.onDetailItem(record);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      width: "10%",
      align: "center" as "center",
    },
    {
      title: "Học viên",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Khóa học",
      dataIndex: "nameCource",
      key: "nameCource",
      width: "15%",
    },
    {
      title: "Điểm danh",
      key: "attendance",
      width: "15%",
      align:"center" as "center",
      render:(record=>{
        return <p>{record.dayAttendances.length}/{record.numberDay}</p>
      })
    },
    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render:( record =>{
        return <ButtonOption
        onMenuClick={(e) => handleMenuClick(record, e)}
        buttonOptions={[
          { key: "1", name: "Chi tiết" },
        ]}
      />
      })
    },
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
