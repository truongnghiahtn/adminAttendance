import React from "react";
import { connect } from "react-redux";
import { getStudents, addStudent, deleteStudent,editStudent } from "redux/actions/student";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";
// import Item from "antd/lib/list/Item";


interface IStudentProps {
  student: any,
  getStudents: (value: any) => void;
  addStudent: (value: any,param:any) => void;
  deleteStudent: (value: any,param:any) => void;
  editStudent:(value:any,param:any)=>void;
}

const Student: React.FunctionComponent<IStudentProps> = (props) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>({ Keyword: "", PageIndex: 1, PageSize: 20 });
  const[update,setUpdate]=React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<object>();
  const [keyUpdate,setKeyUpdate]=React.useState<any>("");
  React.useEffect(() => {
    props.getStudents(valueParam);
  }, []);
  React.useEffect(() => {
    props.getStudents(valueParam);
  }, [valueParam]);
  React.useEffect(() => {
    if(props.student.studentList.length===0&&props.student.pagination.total>0){
      setValueParam(pre => ({
        ...pre,PageIndex:props.student.pagination.current-1
      }));
    }
  }, [props.student]);
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
    title:update===false? "Tạo học viên":"Cập nhật học viên",
    centered: true,
    loading: props.student.isActing || props.student.isRefreshing,
    onOk: (data: any) => {
       
       if(update===false)
       props.addStudent(data,valueParam);
       else{
         props.editStudent(data,valueParam);
       }
    },
    onCancel: () => {
      setModalVisible(false);
    },

  };
  const listProps = {
    loading: props.student.isActing || props.student.isRefreshing,
    dataSource: props.student.studentList,
    pagination: props.student.pagination,
    onDeleteItem: (id: string) => {
      props.deleteStudent(id,valueParam);
    },
    onChangeIndex:(data:any)=>{
      setValueParam(pre=>({
        ...pre,PageIndex:data.current,PageSize:data.pageSize
      }));
    },
    onEditItem: (item: any) => {
      setUpdate(true);
      setModalVisible(true)
      setCurrentItem(item);
      setKeyUpdate(item.key);
    },
  };

  return (
    <Spin
      spinning={props.student.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Học viên</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang học viên</h2>
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
  student: state.student
});

export default connect(mapStateToProps, {
  getStudents,
  addStudent,
  deleteStudent,
  editStudent,
})(Student);
