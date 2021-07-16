import React from 'react'
import { Form, Input, Modal, Button, List } from "antd";
import Moment from 'react-moment';

const dateFormat = 'DD-MM-YYYY';
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
    onCancel: () => void;

}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const { item = {}, ...modalProps } = props;
    return (

        <Modal
            {...modalProps}
            footer={[
                <Button key="cancel" onClick={props.onCancel}>
                    Thoát
          </Button>
            ]}
        >
            <div className=" bodyDetailSt">
                <div> <p>Tên học viên :{item.name}</p> </div>
                <List
                    itemLayout="horizontal"
                    dataSource={item.dayAttendances}
                    renderItem={(items: any) => (
                        <List.Item>
                            <List.Item.Meta
                                description={<p>Điểm danh khóa học {item.nameCource} : <Moment format={dateFormat}>
                                {items.date}
                              </Moment> </p>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Modal>
    )
}

export default ModalCourse;
