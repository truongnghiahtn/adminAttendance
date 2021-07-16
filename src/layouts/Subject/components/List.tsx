
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
  dataSource:any;
  onDeleteItem: (id: string) => void;
  onEditItem: (item: any) => void;
  onChangeIndex:(item:any)=>void;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    if (e.key === "1") {
      props.onEditItem(record);
    } else if (e.key === "2") {
      confirm({
        title: "Bạn muốn xóa môn học này?",
        okText: "Xác nhận",
        cancelText: "Thoát",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          props.onDeleteItem(record.key);
        },
        onCancel() {},
      });
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
      title: "Môn học",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "35%",
    },
    {
      title: "Tín chỉ",
      dataIndex: "numberOfCredits",
      key: "numberOfCredits",
      width: "10%",
      align: "center" as "center",
    },
    {
      title: "Buổi học",
      dataIndex: "lesson",
      key: "lesson",
      width: "10%",
      align: "center" as "center",
    },
    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render:( record =>{
        return <ButtonOption
        onMenuClick={(e) => handleMenuClick(record, e)}
        buttonOptions={[
          { key: "1", name: "Cập nhật" },
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
        // dataSource={props.dataSource}
        bordered
        rowClassName="editable-row"
        // pagination={{
        //   ...props.pagination,
        //   showTotal: (total) => `Total ${total} Items`,
        // }}
        className={styles.table}
        scroll={{ x: 500 }}
        rowKey={(record) => record.key}
        onChange={handleTableChange}
      />
    </>
  );
};

export default List;
