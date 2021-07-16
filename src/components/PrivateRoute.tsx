import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import PrimaryLayout from "../layouts/PrimaryLayout";
import { IAppState } from "redux/store/types";
import { connect } from "react-redux";
import { getUser } from "./../redux/actions/auth";
interface PrivateRouteProps extends RouteProps {
  getUser: (value: any) => void;
  auth: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const isLoggined = sessionStorage.getItem('accessToken');
  const id = sessionStorage.getItem('id');
  React.useEffect(() => {
    if(id!=null){
      props.getUser(id);
    }
  }, [id]);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggined ? (
          <PrimaryLayout {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: IAppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUser,
})(PrivateRoute);
