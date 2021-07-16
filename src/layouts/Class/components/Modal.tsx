import React from 'react'
import { Form, Input, Modal, Button } from "antd";

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
    item: any;
    loading: boolean;
    onOk: (data: any) => void;
    onCancel: () => void;
    updateCustom:boolean;
}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const { item = {}, onOk, ...modalProps } = props;
    const handleOk = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                const data = {
                    ...values,
                };
                onOk(data);
            })
            .catch((errorInfo: any) => {
            });
    };
    return (
        <Modal
            {...modalProps}
            footer={[
                <Button key="cancel" onClick={props.onCancel}>
                    Thoát
          </Button>,
          props.updateCustom===false?
                (<Button
                    key="Ok"
                    type="primary"
                    loading={props.loading}
                    onClick={handleOk}
                >
                    Tạo
          </Button>):(<Button
                    key="Ok"
                    type="primary"
                    loading={props.loading}
                    onClick={handleOk}
                >
                    Cập nhật
          </Button>),
            ]}
        >
            <Form
                ref={formRef}
                name="control-ref"
                initialValues={{ ...item }}
                layout="horizontal"
            >
                <FormItem
                    name="name"
                    rules={[{ required: true, message: "Nhập tên phòng học!" }]}
                    label="Tên phòng học"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="description"
                    rules={[{ required: true, message: "Nhập mô tả cho phòng học!" }]}
                    label="Mô tả"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Input.TextArea />
                </FormItem>
            </Form>
        </Modal>
    )
}

export default ModalCourse;
