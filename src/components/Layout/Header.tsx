import React, { Fragment } from "react";
import { Menu, Layout, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import styles from "./Header.module.scss";
import { IAppState } from "redux/store/types";
import { connect } from "react-redux";
import { isNullishCoalesce } from "typescript";

const { SubMenu } = Menu;

interface IHeaderProps {
  collapsed: boolean;
  auth?:any;
  toggle: () => void;
  onSignOut?: () => void;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { collapsed, toggle, onSignOut } = props;

  const handleClickMenu = (e) => {
    if (onSignOut) {
      e.key === "SignOut" && onSignOut();
    }
  };

  const rightContent = [
    <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: "#999", marginRight: 4 }}>Xin chào,</span>
            <span>{props.auth.User.type==="admin"?"Quản trị viên":"Giáo viên"}</span>
            <Avatar
              style={{ marginLeft: 8 }}
              src="/assets/img/avatar.png"
            />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut" onClick={onSignOut}>
          Đăng xuất
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ];

  return (
    <Layout.Header
      className={classnames(styles.header, styles.fixed, {
        [styles.collapsed]: collapsed,
      })}
    >
      <div className={styles.button} onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.rightContainer}>{rightContent}</div>
    </Layout.Header>
  );
};

const mapStateToProps = (state: IAppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,null)(Header);

