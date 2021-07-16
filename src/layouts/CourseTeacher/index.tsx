import React from "react";
import { connect } from "react-redux";
import { getCoursesByTeacher } from "redux/actions/course";
import { Breadcrumb, Spin } from "antd";
import { IAppState } from "redux/store/types";
import { Page, } from "components/UI";
import { Filter, List } from "./components";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";


interface IRequestProps {
  course: any,
  getCoursesByTeacher: (value: any) => void;
}

const Request: React.FunctionComponent<IRequestProps> = (props) => {
  const [valueParam, setValueParam] = React.useState<object>({ Keyword: "", PageIndex: 1, PageSize: 5,id:"" });
  const param:any=useParams();

  React.useEffect(() => {
    if(param.id!=null)
    {
      setValueParam((pre)=>({
        ...pre,id:param.id
      }))
    }
  
  }, [param.id]);
  React.useEffect(() => {
      props.getCoursesByTeacher(valueParam);
  }, [valueParam]);

  const filterProps = {
    onFilterChange: (value: string) => {
      setValueParam(pre => ({
        ...pre, Keyword: value, PageIndex: 1
      }));
    },
  };
  const listProps = {
    loading: props.course.isActing || props.course.isRefreshing,
    dataSource: props.course.courseList,
    pagination: props.course.pagination,
    onChangeIndex: (data: any) => {
      setValueParam(pre => ({
        ...pre, PageIndex: data.current, PageSize: data.pageSize
      }));
    }
  };

  return (
    <Spin
      spinning={props.course.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div className="header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to={"/"}>Trang chủ</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Khóa học</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{ marginTop: "13px" }}> Trang khóa học</h2>
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
  course: state.course,
  teacher:state.teacher,
  subject:state.subject
});

export default connect(mapStateToProps, {
  getCoursesByTeacher,
})(Request);
