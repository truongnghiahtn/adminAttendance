import React from "react";
import Tilt from "react-tilt";
import { Input, Button, Form } from 'antd';
import { useHistory } from "react-router-dom";
import Logo from "../../images/login/loginUit.png";
import { connect } from "react-redux";
import {Loader } from "components/UI";
import { loginUser } from "redux/actions/auth";
import { IAppState } from "redux/store/types";

interface ILoginProps {
  loginUser:(value:any,histoty:any)=>void;
  auth:any
 }

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [value, setValue] = React.useState({ userName: "", password: "" ,rememberMe: true});
  const onChange = (e) => {
    let { name, value } = e.target;
    setValue(prevState => ({
      ...prevState, [name]: value
    }));
  }
  let history:any = useHistory();
  const submit = (e) => {
    e.preventDefault();
    if(value.userName!==""&&value.password!==""){
      props.loginUser(value, history);
    }

  }
  return (
    <React.Fragment>
      <Loader spinning={props.auth.isLoading} statusOpacity={true} />
      <div className="login-wolves">
        <div className="container">
          <div className="wrapper">
            <Tilt
              className="logo-wolves Tilt"
              options={{ scale: 1.1, perspective: 500, max: 25 }}
            >
              <img className="Tilt-inner" src={Logo} alt="logo" />
            </Tilt>
            <Form className="login-form">
            <span className="login-form-title">ATTENDANCE ADMIN</span>
            <div className="wrap-input">
                 <Form.Item name="userName" 
                 rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                <Input placeholder="Tài khoản" name="userName" onChange={onChange} />
              </Form.Item>
              </div>
              <div className="wrap-input">
                 <Form.Item name="password"   
                 rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                <Input.Password placeholder="Mật khẩu" name="password" onChange={onChange} />
              </Form.Item>
              </div>
              <Form.Item className="container-login-form-btn"  >
                <Button onClick={submit} className="login-form-btn" type="primary" htmlType="submit" >
                  Đăng nhập
              </Button>
              </Form.Item>
              <div className="wrap-login-form-forgot">
                <span>quên </span>
                <a className="forgot-text" href="">
                  Tài khoản / Mật khẩu?
                </a>
              </div>
              
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state: IAppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loginUser,
})(Login);
