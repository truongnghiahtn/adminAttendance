import React from "react";
import { connect } from "react-redux";
import { getUsers, addUser, deleteUser } from "redux/actions/user";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";
// import Item from "antd/lib/list/Item";


interface IUserProps {
  user: any,
  auth?:any;
  getUsers: (value: any) => void;
  addUser: (value: any, param: any) => void;
  deleteUser: (value: any, param: any) => void
}

const User: React.FunctionComponent<IUserProps> = (props) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>({ Keyword: "", PageIndex: 1, PageSize: 20 });
  React.useEffect(() => {
    props.getUsers(valueParam);
  }, []);
  React.useEffect(() => {
    props.getUsers(valueParam);
  }, [valueParam]);
  React.useEffect(() => {
    if (props.user.userList.length === 0 && props.user.pagination.total > 0) {
      setValueParam(pre => ({
        ...pre, PageIndex: props.user.pagination.current - 1
      }));
    }
  }, [props.user]);
  const filterProps = {
    showCreateModal: () => {
      setModalVisible(true);
    },
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value, PageIndex: 1
      }));
    },
  };
  const modalProps = {
    visible: modalVisible,
    destroyOnClose: true,
    title: "Tạo học viên",
    centered: true,
    loading: props.user.isActing || props.user.isRefreshing,
    onOk: (data: any) => {
      props.addUser(data, valueParam);
    },
    onCancel: () => {
      setModalVisible(false);
    },

  };
  const listProps = {
    loading: props.user.isActing || props.user.isRefreshing,
    dataSource: props.user.userList,
    auth:props.auth,
    pagination: props.user.pagination,
    onDeleteItem: (id: string) => {
     props.deleteUser(id, valueParam);
    },
    onChangeIndex: (data: any) => {
      setValueParam(pre => ({
        ...pre, PageIndex: data.current, PageSize: data.pageSize
      }));
    }
  };

  return (
    <Spin
      spinning={props.user.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Quản trị viên</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang quản trị viên</h2>
      </div>
      <div style={{ width: "100%", height: "10px" }}></div>
      <div style={{ margin: "10px 20px" }}></div>
      <Page inner>
        <Filter {...filterProps} />
        <Modal {...modalProps} />
        <List {...listProps} />
      </Page>
    </Spin>);
};


const mapStateToProps = (state: IAppState) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUsers,
  addUser,
  deleteUser,
})(User);
