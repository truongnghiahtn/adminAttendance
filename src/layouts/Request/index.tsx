import React from "react";
import { connect } from "react-redux";
import { getNotifications, editNotification, deleteNotification } from "redux/actions/notification";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, List } from "./components";
import { NavLink } from "react-router-dom";
// import Item from "antd/lib/list/Item";


interface IRequestProps {
  notification: any,
  getNotifications: (value: any) => void;
  editNotification: (value: any,param:any) => void;
  deleteNotification: (value: any,param:any) => void
}
interface test{
  Status:boolean,
  Keyword:string, 
  PageIndex:number,
  PageSize:number
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {



  const [valueParam, setValueParam] = React.useState<test>({ Status:true,Keyword: "", PageIndex: 1, PageSize: 20 });
  const [keyUpdate,setKeyUpdate]=React.useState<number>(0);
  React.useEffect(() => {
    props.getNotifications(valueParam);
  }, [valueParam]);
  React.useEffect(() => {
    if(props.notification.notificationList.length===0&&props.notification.pagination.total>0){
      setValueParam(pre => ({
        ...pre,PageIndex:props.notification.pagination.current-1
      }));
    }
  }, [props.notification]);
  const filterProps = {
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value,PageIndex: 1
      }));
    },
    onOptionChange:(value:any)=>{
      setValueParam(pre => ({
        ...pre, Status: value,
      }));
    }
  };
  const listProps = {
    loading: props.notification.isActing || props.notification.isRefreshing,
    dataSource: props.notification.notificationList,
    pagination: props.notification.pagination,
    Status:valueParam.Status,
    onDeleteItem: (id: string) => {
      props.deleteNotification(id,valueParam);
    },
    onChangeIndex:(data:any)=>{
      setValueParam(pre=>({
        ...pre,PageIndex:data.current,PageSize:data.pageSize
      }));
    },
    onProcessItem:(item:any)=>{
      props.editNotification(item,valueParam);
    },
  };

  return (
    <Spin
      spinning={props.notification.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Yêu cầu</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang yêu cầu</h2>
      </div>
      <div style={{ width: "100%", height: "10px" }}></div>
      <div style={{ margin: "10px 20px" }}></div>
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
      </Page>
    </Spin>);
};


const mapStateToProps = (state: IAppState) => ({
  notification: state.notification
});

export default connect(mapStateToProps, {
  getNotifications,
  editNotification,
  deleteNotification,
})(Request);
