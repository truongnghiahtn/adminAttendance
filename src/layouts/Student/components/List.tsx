
import React from "react";
import styles from "./List.module.scss";
import {
  Table,
  Modal,
  Image
} from "antd";
import { ButtonOption } from "components/UI";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource: any;
  onEditItem: (item: any) => void;
  onDeleteItem: (id: string) => void;
  onChangeIndex: (item: any) => void;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    if (e.key === "1") {
      confirm({
        title: "Bạn muốn xóa học viên này?",
        icon: <ExclamationCircleOutlined />,
        okText:"Xác nhận",
        cancelText:"Thoát",
        onOk() {
          props.onDeleteItem(record.key);
        },
        onCancel() { },
      });
    }
    else {
      props.onEditItem(record);
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
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",

    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",

    },
    {
      title: "Hình ảnh",
      dataIndex: "urlImg",
      key: "urlImg",
      width: "20%",
      align: "center" as "center",
      render: ((record,key) => {
        return (
          <Image
            width={100}
            height={100}
            src={`https://www.appattendance.somee.com/${key.urlImg}`}
            alt="Hình ảnh"
          />
        )
      })
    },
    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render: (record => {
        return <ButtonOption
          onMenuClick={(e) => handleMenuClick(record, e)}
          buttonOptions={[
            { key: "1", name: "Xóa" },
            { key: "2", name: "Cập nhật" },
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
