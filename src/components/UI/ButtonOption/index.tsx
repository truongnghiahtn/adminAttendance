import React from "react";
import { Button } from "antd";
import styles from "./Button.module.scss";

interface ButtonOptionProps {
  onMenuClick: (e) => void;
  buttonOptions: Array<OptionType>;
  buttonStyle?: React.CSSProperties;
  dropdownProps?: object;
  disabled?: boolean;
}

interface OptionType {
  key: string;
  name?: string;
}

const ButtonOption: React.FC<ButtonOptionProps> = ({
  onMenuClick,
  buttonOptions = [],
  buttonStyle,
  disabled,
  dropdownProps,
}) => {
  const renderButton = buttonOptions.map((item, index) => (
    <Button key={item.key} onClick={() => onMenuClick({ key: item.key })}>
      {item.name}
    </Button>
  ));

  return <div className={styles.operationBtn}>{renderButton}</div>;
};

export default ButtonOption;
