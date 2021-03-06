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
                    firstName:values.firstName,
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
                    "firstName",
                    values.firstName,
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
                    Tho??t
          </Button>,
                props.updateCustom === false ?
                    (<Button
                        key="Ok"
                        type="primary"
                        loading={props.loading}
                        onClick={handleOk}
                    >
                        T???o
                    </Button>) : (<Button
                        key="Ok"
                        type="primary"
                        loading={props.loading}
                        onClick={handleUpdate}
                    >
                        C???p nh???t
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
                    name="firstName"
                    rules={[{ required: true, message: "Nh???p t??n h???c vi??n!" }]}
                    label="T??n h???c vi??n"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="fullName"
                    rules={[{ required: true, message: "Nh???p h??? t??n h???c vi??n!" }]}
                    label="H??? t??n h???c vi??n"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                {props.updateCustom == false ? <FormItem
                    name="user"
                    rules={[{ required: true, message: "Nh???p t??i kho???n!" }]}
                    label="T??i kho???n"
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
                            message: "M???t kh???u ch???a ??t nh???t m???t s???,m???t ch??? c??i vi???t hoa,vi???t th?????ng,k?? t??? ?????c bi???t v?? ??t nh???t 8 k?? t??? tr??? l??n!"
                        }
                    ]}

                    initialValue=""
                    label="M???t kh???u"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem> : ""}

                <FormItem
                    name="email"
                    rules={[{ required: true, type: 'email', message: "Nh???p email cho h???c vi??n!" }]}
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
                    label="H??nh ???nh"
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
