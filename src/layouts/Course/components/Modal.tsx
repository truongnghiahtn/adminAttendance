import React from 'react'
import { Form, Input, Modal, Button, DatePicker, Select,ConfigProvider } from "antd";
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
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
    dataTeacher: any;
    dataSubject: any;
    checkupdate:boolean;
}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const { item = {}, onOk, ...modalProps } = props;
    const [dateValue, setdateValue] = React.useState<any>();
    const [nameTeacher,setNameTeacher]=React.useState<string>("");
    const [nameSubject,setNameSubject]=React.useState<string>("");
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
    React.useEffect(() => {
        if(props.checkupdate===true){
            var dataTeacher=props.dataTeacher.find(items=>{
                return items.name==item.nameTeacher
            })
            var dataSubject=props.dataSubject.find(items=>{
                return items.name==item.nameSubject
            })
            setNameTeacher(dataTeacher.key);
            setNameSubject(dataSubject.key);
            console.log(item.dateBegin);
            setdateValue(item.dateBegin);
        }
        else{
            setNameTeacher("");
            setNameSubject("");
            setdateValue("2021-01-01T00:00:00");
        }
      }, [item]);

    const Year = [
        { name: "2019-2020", key: "2019-2020" },
        { name: "2020-2021", key: "2020-2021" },
        { name: "2021-2022", key: "2021-2022" },
        { name: "2022-2023", key: "2022-2023" },
    ]
    const semeterList = [
        { name: "1", key: 1 },
        { name: "2", key: 2 },
        { name: "Học kỳ hè", key: 3 },
    ]
    const OptionTeacher = () => {
        return props.dataTeacher.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionSubject = () => {
        return props.dataSubject.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionYear = () => {
        return Year.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionSemeter = () => {
        return semeterList.map((item: any, index: number) => {
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
                <Button
                    key="Ok"
                    type="primary"
                    loading={props.loading}
                    onClick={handleOk}
                >
                    {props.checkupdate===true?"Cập nhật":"Tạo"}
          </Button>,
            ]}
        >
            <Form
                ref={formRef}
                name="control-ref"
                layout="horizontal"
            >
                <FormItem
                    name="name"
                    rules={[{ required: true, message: "Nhập tên khóa học!" }]}
                    label="Tên khóa học"
                    hasFeedback
                    initialValue={item.name}
                    {...formItemLayout}
                >
                    <Input value={item.name} />
                </FormItem>
                <FormItem
                    name="id_Teacher"
                    label="Giáo viên"
                    rules={[{ required: true, message: "Chọn giáo viên!" }]}
                    hasFeedback
                    initialValue={nameTeacher}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="Lựa chọn giáo viên"
                        allowClear
                    >
                        {
                            OptionTeacher()
                        }
                    </Select>
                </FormItem>
                <FormItem
                    name="id_Subject"
                    label="Môn học"
                    rules={[{ required: true, message: "Chọn môn học!" }]}
                    hasFeedback
                    initialValue={nameSubject}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="Lựa chọn môn học"
                        allowClear
                    >
                        {
                            OptionSubject()
                        }
                    </Select>
                </FormItem>

                <FormItem
                    name="schoolYear"
                    label="Năm học"
                    rules={[{ required: true, message: "Chọn năm học!" }]}
                    hasFeedback
                    initialValue={item.schoolYear}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="Lựa chọn năm học"
                        allowClear
                    >
                        {
                            OptionYear()
                        }
                    </Select>
                </FormItem>

                <FormItem
                    name="semester"
                    label="Học kỳ"
                    rules={[{ required: true, message: "Chọn học kỳ!" }]}
                    hasFeedback
                    initialValue={item.semester}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="Lựa chọn học kỳ"
                        allowClear
                    >
                        {
                            OptionSemeter()
                        }
                    </Select>
                </FormItem>
                <ConfigProvider locale={viVN}>
                <FormItem
                    name="dateBegin"
                    label="Ngày bắt đầu"
                    rules={[{ required: !props.checkupdate, message: "Chọn ngày bắt đầu!" }]}
                    {...formItemLayout}>
                    <DatePicker style={{width:"100%"}} defaultValue={moment(`${dateValue}`, dateFormat)} onChange={checkdate} />
                </FormItem>
                </ConfigProvider>

            </Form>
        </Modal>
    )
}

export default ModalCourse;
