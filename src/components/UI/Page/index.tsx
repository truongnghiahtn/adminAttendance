import React from "react";
import classnames from "classnames";
import Loader from "../Loader";
import styles from "./Page.module.scss";

interface PageProps {
  className?: string;
  loading?: boolean;
  inner: boolean;
}

const Page: React.FC<PageProps> = (props) => {
  const { className, children, loading = false, inner = false } = props;
  const loadingStyle = {
    height: "calc(100vh - 184px)",
    overflow: "hidden",
  };
  return (
    <div
      className={classnames(className, {
        [styles.contentInner]: inner,
      })}
      style={loading ? loadingStyle : {}}
    >
      {loading ? <Loader spinning /> : ""}
      {children}
    </div>
  );
};

export default Page;
