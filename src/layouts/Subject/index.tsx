import React from "react";
import { connect } from "react-redux";
import { getSubjects, addSubject, editSubject, deleteSubject } from "redux/actions/subject";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";
import Subject from "redux/reducers/subject";
// import Item from "antd/lib/list/Item";




interface IRequestProps {
  subject: any,
  getSubjects: (value: any) => void;
  addSubject: (value: any,param:any) => void;
  editSubject: (value: any,param:any) => void;
  deleteSubject: (value: any,param:any) => void
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {

  const initialParam={
    Keyword:"",
    PageIndex: 1,
    PageSize: 20
  }

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>(initialParam);
  const[update,setUpdate]=React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<object>();
  const [keyUpdate,setKeyUpdate]=React.useState<number>(0);
  React.useEffect(() => {
    props.getSubjects(valueParam);
  }, []);
  React.useEffect(() => {
    props.getSubjects(valueParam);
  }, [valueParam]);
  React.useEffect(() => {
    if(props.subject.subjectList.length===0&&props.subject.pagination.total>0){
      setValueParam(pre => ({
        ...pre,PageIndex:props.subject.pagination.current-1
      }));
    }
  }, [props.subject]);
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
    title:update===false? "Tạo môn học":"Cập nhật môn học",
    centered: true,
    loading: props.subject.isActing || props.subject.isRefreshing,
    onOk: (data: any) => {
      if(update===false)
      {
      props.addSubject(data,valueParam);
      }
       else{
        const id_Subject=keyUpdate;
        var value={...data,id_Subject};
        props.editSubject(value,valueParam);
       }
    },
    onCancel: () => {
      setModalVisible(false);
    },

  };
  const listProps = {
    loading: props.subject.isActing || props.subject.isRefreshing,
    dataSource: props.subject.subjectList,
    pagination: props.subject.pagination,
    onEditItem: (item: any) => {
      setUpdate(true);
      setModalVisible(true)
      setCurrentItem(item);
      setKeyUpdate(item.key);
    },
    onDeleteItem: (id: string) => {
      props.deleteSubject(id,valueParam);
    },
    onChangeIndex:(data:any)=>{
      setValueParam(pre=>({
        ...pre,PageIndex:data.current,PageSize:data.pageSize
      }));
    }
  };

  return (
    <Spin
      spinning={props.subject.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Môn học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang môn học</h2>
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
  subject: state.subject
});

export default connect(mapStateToProps, {
  getSubjects,
  addSubject,
  editSubject,
  deleteSubject,
})(Request);
