
import React from "react";
import styles from "./List.module.scss";
import {
  Table,
  Modal,
} from "antd";
import { ButtonOption } from "components/UI";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { confirm } = Modal;
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource:any;
  onChangeIndex:(item:any)=>void;
  onConfirm:(item:any)=>void;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    if (e.key === "1") {
      let data={id:record.key,status:true}
      props.onConfirm(data);
    }
    else{
      let data={id:record.key,status:false}
      props.onConfirm(data);
    }
  };

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
      dataIndex: "nameUser",
      key: "nameUser",
      width: "25%",
    },
    {
      title: "Khóa học",
      dataIndex: "nameCourse",
      key: "nameCourse",
      width: "30%",
    },
 

    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render:( record =>{
        return <ButtonOption
        onMenuClick={(e) => handleMenuClick(record, e)}
        buttonOptions={[
          { key: "1", name: "Xác nhận" },
          { key: "2", name: "Xóa" },
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
