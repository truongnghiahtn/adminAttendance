
import React from "react";
import styles from "./List.module.scss";
import {
  Table,
  Modal,
} from "antd";
import { ButtonOption } from "components/UI";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource: any;
  onDeleteItem: (id: string) => void;
  onProcessItem: (item: any) => void;
  onChangeIndex: (item: any) => void;
  Status: boolean;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    var data = { id: record.key, status: "cancle" };
    switch (e.key) {
      case "1":
        props.onProcessItem(data);
        break;
      case "2":
        confirm({
          title: "Bạn muốn xóa thiết bị này?",
          icon: <ExclamationCircleOutlined />,
          onOk() {
            data = { ...data, status: "agree" }
            props.onProcessItem(data);
          },
          onCancel() { },
        });
        break;
      case "3":
        confirm({
          title: "Bạn muốn xóa yêu cầu này?",
          icon: <ExclamationCircleOutlined />,
          onOk() {
            props.onDeleteItem(record.key);
          },
          onCancel() { },
        });
        break;
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
      width: "15%",
    },
    {
      title: "Thiết bị",
      dataIndex: "nameEquipment",
      key: "nameEquipment",
      width: "15%",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      width: "45%",
    },
    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render: (record => {
        return props.Status === true ? <ButtonOption
          onMenuClick={(e) => handleMenuClick(record, e)}
          buttonOptions={[
            { key: "2", name: "Xác nhận" },
            { key: "1", name: "Xóa" },
            
          ]}
        /> : <ButtonOption
          onMenuClick={(e) => handleMenuClick(record, e)}
          buttonOptions={[
            { key: "3", name: "Xóa" },
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
