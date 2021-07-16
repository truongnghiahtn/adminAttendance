import React from "react";
import styles from "./Sider.module.scss";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { arrayToTree, queryAncestors } from "../../utils";
import iconMap from "../../utils/iconMap";
import { routes } from "../../routes";
import { pathToRegexp } from "path-to-regexp";
import Logo from "../../images/login/logoicon.png";
import { IAppState } from "redux/store/types";
import { connect } from "react-redux";

const { SubMenu } = Menu;
interface ISiderProps {
  collapsed: boolean;
  location: string;
  auth?: any;
}

const Sider: React.FunctionComponent<ISiderProps> = ({
  collapsed,
  location,
  auth,
  ...rest
}) => {
  const generateMenus = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <React.Fragment>
                {item.icon && iconMap[item.icon]}
                <span>{item.name}</span>
              </React.Fragment>
            }
          >
            {generateMenus(item.children)}
          </SubMenu>
        );
      }

      return (
        item.id !== "14" &&
        item.id !== "15" &&
        item.id !== "18" &&(
          <Menu.Item key={item.id}>
            <NavLink to={item.route || "#"}>
              {item.icon && iconMap[item.icon]}
              <span>{item.name}</span>
            </NavLink>
          </Menu.Item>
        )
      );
     
    });
  };

  const menuTree = arrayToTree( auth.User.type == "admin"
  ? routes
  : routes.filter((item) => item.role != "admin"), "id", "menuParentId");

  let currentMenu = routes.find(
    (_) => _.route && pathToRegexp(_.route).exec(location)
  );

  if (currentMenu === undefined) {
    currentMenu = routes[0];
  }

  const selectedKeys = currentMenu
    ? queryAncestors(routes, currentMenu, "menuParentId").map((_) => _.id)
    : [];

  return (
    <Layout.Sider
      width={256}
      theme="light"
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      //onBreakpoint={!isMobile && onCollapseChange}
      className={styles.sider}
    >
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img alt="logo" src={Logo} />
          {!collapsed && <h1>Attendance Admin</h1>}
        </div>
      </div>
      <div className={styles.menuContainer}>
        <Menu theme="light" mode="inline" selectedKeys={selectedKeys}>
          {menuTree && generateMenus(menuTree)}
        </Menu>
      </div>
    </Layout.Sider>
  );
};

const mapStateToProps = (state: IAppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,null)(Sider);
