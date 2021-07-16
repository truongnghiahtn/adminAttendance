import React from "react";
import { connect } from "react-redux";
import { getStudentCource } from "redux/actions/student";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, Modal, List } from "./components";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Item from "antd/lib/list/Item";


interface IRequestProps {
  student: any,
  getStudentCource: (value: any) => void;
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [valueParam, setValueParam] = React.useState<object>({Keyword: "", PageIndex: 1, PageSize: 20 });
  const [currentItem, setCurrentItem] = React.useState<object>();
  const param:any=useParams();
  React.useEffect(() => {
    if(param.id!=null)
    {
      setValueParam((pre)=>({
        ...pre,idCource:param.id
      }))
    }
    
  }, [param.id]);
  React.useEffect(() => {
      props.getStudentCource(valueParam);
  }, [valueParam]);

  const filterProps = {
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value,PageIndex: 1
      }));
    },
  };
  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    destroyOnClose: true,
    title: "Chi tiết học viên",
    centered: true,
    loading: props.student.isActing || props.student.isRefreshing,
    onCancel: () => {
      setModalVisible(false);
    },

  };
  const listProps = {
    loading: props.student.isActing || props.student.isRefreshing,
    dataSource: props.student.studentCourceList,
    pagination: props.student.pagination,
    onDetailItem: (item: any) => {
      setModalVisible(true)
      setCurrentItem(item);
    },
    onChangeIndex:(data:any)=>{
      setValueParam(pre=>({
        ...pre,PageIndex:data.current,PageSize:data.pageSize
      }));
    }
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
          <Breadcrumb.Item>Chi tiết khóa học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang chi tiết khóa học</h2>
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
  getStudentCource,
})(Request);
