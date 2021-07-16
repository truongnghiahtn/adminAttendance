import React from "react";
import { BarsOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Button, Menu } from "antd";

interface DropOptionProps {
  onMenuClick: (e) => void;
  menuOptions: Array<OptionType>;
  buttonStyle?: React.CSSProperties;
  dropdownProps?: object;
  disabled?: boolean;
}

interface OptionType {
  key: string;
  name?: string;
}

const DropOption: React.FC<DropOptionProps> = ({
  onMenuClick,
  menuOptions = [],
  buttonStyle,
  disabled,
  dropdownProps,
}) => {
  const menu = menuOptions.map((item) => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ));

  return (
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
      disabled={disabled}
      {...dropdownProps}
    >
      <Button style={{ border: "none", ...buttonStyle }}>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropOption;
