import React from 'react'
import { Form, Input, Modal, Button,Select } from "antd";

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
interface IModalProps {
    loading: boolean;
    onOk: (data: any) => void;
    onCancel: () => void;
}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const { onOk, ...modalProps } = props;
    const handleOk = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                var data = {
                    userName:values.user,
                    fullName:values.fullName,
                    password:values.pass,
                    email:values.email,
                    type:values.type
                };
                 onOk(data);

            })
            .catch((errorInfo: any) => {
            });
    };

    const roleList = [
        { name: "Teacher", key: "8125c97d-6048-4d57-7582-08d8ed00ec81" },
        { name: "Admin", key: "8d04dce2-969a-435d-bba4-df3f325983dc" },
    ]
    const OptionRole = () => {
        return roleList.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    return (
        <Modal
            {...modalProps}
            footer={[
                <Button key="cancel" onClick={props.onCancel}>
                    Thoát
          </Button>,

                (<Button
                    key="Ok"
                    type="primary"
                    loading={props.loading}
                    onClick={handleOk}
                >
                    Tạo
                </Button>)
            ]}
        >
            <Form
            autoComplete="off"
                ref={formRef}
                name="control-ref"
                layout="horizontal"
            >
                <FormItem
                    name="firstName"
                    rules={[{ required: true, message: "Nhập tên quản trị!" }]}
                    label="Tên"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="fullName"
                    rules={[{ required: true, message: "Nhập họ tên quản trị!" }]}
                    label="Họ tên"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="user"
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                    label="Tài khoản"
                    hasFeedback
                    
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="pass"
                    rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
                          message: "Mật khẩu chứa ít nhất một số,một chữ cái viết hoa,viết thường,ký tự đặc biệt và ít nhất 8 ký tự trở lên!"
                        }
                      ]} 

                    initialValue=""
                    label="Mật khẩu"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="email"
                    rules={[{ required: true,type:'email', message: "Nhập email cho học viên!" }]}
                    label="Email"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="type"
                    label="Loại người dùng"
                    rules={[{ required: true, message: "Chọn Loại người dùng!" }]}
                    hasFeedback
                    {...formItemLayout}
                >
                    <Select
                        placeholder="Loại người dùng"
                        allowClear
                    >
                        {
                            OptionRole()
                        }
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default ModalCourse;
