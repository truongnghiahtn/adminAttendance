import React from 'react'
import { Form, Input, Modal, Button, Upload, message,ConfigProvider } from "antd";
import viVN from 'antd/lib/locale/vi_VN';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
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
    updateCustom: boolean;
    item: any;
}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const [loading, setLoangding] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>(null);
    const { item = {}, onOk, ...modalProps } = props;
    const handleOk = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                var data = {
                    userName: values.user,
                    fullName: values.fullName,
                    password: values.pass,
                    email: values.email
                };
                onOk(data);

            })
            .catch((errorInfo: any) => {
            });
    };

    const handleUpdate = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                const formData = new FormData();
                if(image?.name){
                    formData.append(
                        "ThumbnailImage",
                        image,
                        image.name
                    );
                };
                formData.append(
                    "email",
                    values.email,
                );
                formData.append(
                    "fullName",
                    values.fullName,
                );
                formData.append(
                    "Id_User",
                    item.key
                );
                 onOk(formData);

            })
            .catch((errorInfo: any) => {
            });
    };

    const onchangeImg = (e) => {
        setImage(e.target.files[0])

    }

    return (
        <Modal
            {...modalProps}
            footer={[
                <Button key="cancel" onClick={props.onCancel}>
                    Thoát
          </Button>,
                props.updateCustom === false ?
                    (<Button
                        key="Ok"
                        type="primary"
                        loading={props.loading}
                        onClick={handleOk}
                    >
                        Tạo
                    </Button>) : (<Button
                        key="Ok"
                        type="primary"
                        loading={props.loading}
                        onClick={handleUpdate}
                    >
                        Cập nhật
                    </Button>),
            ]}
        >
            <Form
                autoComplete="off"
                ref={formRef}
                name="control-ref"
                initialValues={{ ...item }}
                layout="horizontal"
            >
                <FormItem
                    name="fullName"
                    rules={[{ required: true, message: "Nhập tên học viên!" }]}
                    label="Tên học viên"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                {props.updateCustom == false ? <FormItem
                    name="user"
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                    label="Tài khoản"
                    hasFeedback

                    {...formItemLayout}
                >
                    <Input />
                </FormItem> : ""}
                {props.updateCustom == false ? <FormItem
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
                </FormItem> : ""}

                <FormItem
                    name="email"
                    rules={[{ required: true, type: 'email', message: "Nhập email cho học viên!" }]}
                    label="Email"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                    
                </FormItem>
                
                {props.updateCustom == true ? <>
                    <ConfigProvider locale={viVN}>
                <FormItem
                    name="ThumbnailImage"
                    label="Hình ảnh"
                    hasFeedback


                    {...formItemLayout}
                >
                    

                    <Input onChange={onchangeImg} type="file" accept="image/*" />
                </FormItem>
                </ConfigProvider>
                 </> : ""}
                


            </Form>
        </Modal>
    )
}

export default ModalCourse;
