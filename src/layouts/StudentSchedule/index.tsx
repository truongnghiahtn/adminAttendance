import React from "react";
import { connect } from "react-redux";
import { getStudentScheduleList } from "redux/actions/student";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, List } from "./components";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { values } from "lodash";


interface IRequestProps {
  student: any,
  getStudentScheduleList: (value: any) => void;
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {
  const param:any=useParams();

  React.useEffect(() => {
    if(param.id!=null)
    {
      const value={id:param.id}
      props.getStudentScheduleList(value);
    }
  }, [param.id]);

  const filterProps = {
    onFilterChange: (value: string) => {
    },
  };
  const listProps = {
    loading: props.student.isActing || props.student.isRefreshing,
    dataSource: props.student.StudentSheduleList,
    pagination: props.student.pagination,
    onChangeIndex: (data: any) => {
      // setValueParam(pre => ({
      //   ...pre, PageIndex: data.current, PageSiza: data.pageSize
      // }));
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
          <Breadcrumb.Item>Chi tiết lịch học </Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang chi tiết lịch học</h2>
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
  student: state.student,
});

export default connect(mapStateToProps, {
  getStudentScheduleList,
})(Request);
