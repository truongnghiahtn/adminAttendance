import React from "react";
import { connect } from "react-redux";
import { getClasses, addClass, editClass, deleteClass } from "redux/actions/class";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";
// import Item from "antd/lib/list/Item";


interface IRequestProps {
  classes: any,
  getClasses: (value: any) => void;
  addClass: (value: any,param:any) => void;
  editClass: (value: any,param:any) => void;
  deleteClass: (value: any,param:any) => void
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>({ Keyword: "", PageIndex: 1, PageSize: 20 });
  const[update,setUpdate]=React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<object>();
  const [keyUpdate,setKeyUpdate]=React.useState<number>(0);
  React.useEffect(() => {
    props.getClasses(valueParam);
  }, []);
  React.useEffect(() => {
    props.getClasses(valueParam);
  }, [valueParam]);
  React.useEffect(() => {
    if(props.classes.classList.length===0&&props.classes.pagination.total>0){
      setValueParam(pre => ({
        ...pre,PageIndex:props.classes.pagination.current-1
      }));
    }
  }, [props.classes]);
  const filterProps = {
    showCreateModal: () => {
      setModalVisible(true);
      setUpdate(false);
    },
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value,PageIndex: 1
      }));
    },
  };
  const modalProps = {
    item: update===false?{}:currentItem,
    visible: modalVisible,
    updateCustom:update,
    destroyOnClose: true,
    title:update===false? "Tạo phòng học":"Cập nhật phòng học",
    centered: true,
    loading: props.classes.isActing || props.classes.isRefreshing,
    onOk: (data: any) => {
      if(update===false)
       props.addClass(data,valueParam);
       else{
        const id_Class=keyUpdate;
        var value={...data,id_Class};
        props.editClass(value,valueParam);
       }
    },
    onCancel: () => {
      setModalVisible(false);
    },

  };
  const listProps = {
    loading: props.classes.isActing || props.classes.isRefreshing,
    dataSource: props.classes.classList,
    pagination: props.classes.pagination,
    onEditItem: (item: any) => {
      setUpdate(true);
      setModalVisible(true)
      setCurrentItem(item);
      setKeyUpdate(item.key);
    },
    onDeleteItem: (id: string) => {
      props.deleteClass(id,valueParam);
    },
    onChangeIndex:(data:any)=>{
      setValueParam(pre=>({
        ...pre,PageIndex:data.current,PageSize:data.pageSize
      }));
    }
  };

  return (
    <Spin
      spinning={props.classes.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Phòng học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang phòng học</h2>
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
  classes: state.classes
});

export default connect(mapStateToProps, {
  getClasses,
  addClass,
  editClass,
  deleteClass,
})(Request);
