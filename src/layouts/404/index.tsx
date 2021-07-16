import React from "react";

interface PageNotFoundProps {}

const PageNotFound: React.FunctionComponent<PageNotFoundProps> = (props) => {
  return <div className="page-not-found">
    <img alt="logo" src="./assets/img/img-404.png" />
  </div>;
};

export default PageNotFound;
