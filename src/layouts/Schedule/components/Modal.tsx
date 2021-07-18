import React from 'react'
import { Form, Input, Modal, Button,Select,InputNumber,ConfigProvider,DatePicker } from "antd";
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';


const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
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
    item: any;
    loading: boolean;
    onOk: (data: any) => void;
    onCancel: () => void;
    updateCustom: boolean;
    dataClass:any;
    checkupdate:boolean;
}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const [dateValue, setdateValue] = React.useState<any>();
    const [nameClass,setNameClass]=React.useState<string>("");
    const { item = {}, onOk, ...modalProps } = props;
    React.useEffect(() => {
        if(props.checkupdate===true){
            var dataClass=props.dataClass.find(items=>{
                return items.name===item.nameClass
            })
            setNameClass(dataClass.key);
            setdateValue(item.date);
        }
        else{
            setNameClass("");
            setdateValue("2021-01-01T00:00:00");
        }
      }, [item]);
    const handleOk = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                var data = {
                    ...values,
                };
                data = { ...data, dateBegin: dateValue };
                onOk(data);
            })
            .catch((errorInfo: any) => {
            });
    };
    const checkdate = (date, dateString) => {
        setdateValue(dateString);
    }
    const OptionClass = () => {
        return props.dataClass.map((item: any, index: number) => {
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
                    name="id_Class"
                    label="Lớp học"
                    rules={[{ required: true, message: "Chọn Lớp học!" }]}
                    hasFeedback
                    initialValue={nameClass}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="Lựa chọn lớp học"
                        allowClear
                    >
                        {
                            OptionClass()
                        }
                    </Select>
                </FormItem>
                <FormItem
                    name="timeBegin"
                    rules={[{ required: true, message: "Nhập tiết bắt đầu!" }]}
                    label="Tiết bắt đầu"
                    hasFeedback
                    {...formItemLayout}
                >
                    <InputNumber  style={{width:"100%"}} min={1} max={10}/>
                </FormItem>
                <FormItem
                    name="timeEnd"
                    rules={[{ required: true, message: "Nhập tiết kết thúc!" }]}
                    label="Tiết kết thúc"
                    hasFeedback
                    {...formItemLayout}
                >
                    <InputNumber style={{width:"100%"}} min={1} max={10}/>
                </FormItem>
                <ConfigProvider locale={viVN}>
                <FormItem
                    name="dateBegin"
                    label="Ngày học"
                    hasFeedback
                    rules={[{ required: !props.checkupdate, message: "Chọn ngày !" }]}
                    {...formItemLayout}>
                    <DatePicker style={{width:"100%"}} defaultValue={moment(`${dateValue}`, dateFormat)} onChange={checkdate}  />
                </FormItem>
                </ConfigProvider>
            </Form>
        </Modal>
    )
}

export default ModalCourse;
