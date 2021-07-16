import React from "react";
import Header from "../../components/Layout/Header";
import Sider from "../../components/Layout/Sider";
import { Layout } from "antd";
import styles from "./index.module.scss";
import { Route } from "react-router-dom";
import { logoutUser } from "redux/actions/auth";
import { IAppState } from "redux/store/types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "components/UI";
import {
  Course,
  User,
  Class,
  Subject,
  Student,
  CourseTeacher,
  StudentCourse,
  Schedule,
  Request,
  StudentSchedule,
  RcStudentCourse
} from "layouts";

const { Content, Footer } = Layout;

interface Location {
  pathname: string;
}
interface IPrimaryLayoutProps {
  location: Location;
  logoutUser: () => void;
  auth: any;
}

const PrimaryLayout: React.FunctionComponent<IPrimaryLayoutProps> = ({
  children,
  location,
  logoutUser,
  auth,
  ...rest
}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const history = useHistory();

  const toggle = () => {
    setCollapsed((pre) => !pre);
  };
  const onSignOut = () => {
    logoutUser();
    history.push("/login");
  };
  document.addEventListener("fullscreenchange", function (event) {
    if (document.fullscreenElement) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  });

  return (
    <React.Fragment>
       {auth.isLoading == true ? <Loader spinning={true} />:"" }
      <Layout>
        <Sider collapsed={collapsed} location={location.pathname} />
        <div
          className={styles.container}
          style={{ paddingTop: 72 }}
          id="primaryLayout"
        >
          <Header collapsed={collapsed} toggle={toggle} onSignOut={onSignOut} {...rest} />
          <Content
            className={styles.content}
            style={{ padding: "0", overflow: "initial" }}
          >
            <Route exact path={["", "/khoa_hoc"]} component={Course} />
            <Route path="/lich_hoc" component={Schedule}/>
            <Route path="/hoc_vien-khoa_hoc/:id" component={StudentCourse}/>
            <Route path="/lich_hoc-hoc_vien/:id" component={StudentSchedule}/>
            {auth.User.type==="admin"?<><Route path="/phong_hoc" component={Class} />
            <Route path="/mon_hoc" component={Subject} />
            <Route path="/nguoi_dung/quan_tri" component={User} />
            <Route path="/nguoi_dung/hoc_vien" component={Student} />
            <Route path="/khoa_hoc-giao_vien/:id" component={CourseTeacher} />
            <Route path ="/yeu_cau" component={Request}/>
            <Route path="/dang_ky-khoa_hoc" component={RcStudentCourse}/></>:""}
            
          </Content>
          {/* <BackTop target={() => document.querySelector("#primaryLayout")} />  */}
          {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2018</Footer> */}
        </div>
      </Layout>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IAppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logoutUser,
})(PrimaryLayout);
