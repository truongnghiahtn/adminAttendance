import React from 'react'
import { Form, Input, Modal, Button, Select } from "antd";


const FormItem = Form.Item;
const { Option } = Select;
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
    loading: boolean;
    dataStudent: any;
    dataCource: any;
    onOk: (data: any) => void;
    onCancel: () => void;
    searchCource: (value: any) => void;
    searchStudent: (value: any) => void;
}

const ModalRcStudent: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const { onOk, ...modalProps } = props;
    const [searchCource, setSearchCource] = React.useState<string>("");
    const [tempCource, setTeampCource] = React.useState<string>("");
    const [searchSt, setSearchSt] = React.useState<string>("");
    const [tempStudent, setTeampStudent] = React.useState<string>("");
    const [listCource, setListCource] = React.useState<any>([]);
    const [listStudent, setListStudent] = React.useState<any>([]);
    const handleOk = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                onOk(values);

            })
            .catch((errorInfo: any) => {

            });
    };

    React.useEffect(() => {
        if (searchCource === tempCource) {
            props.searchCource(searchCource);
        }
    }, [searchCource, tempCource])
    React.useEffect(() => {
        if (searchSt === tempStudent) {
            props.searchStudent(searchSt)
        }
    }, [searchSt, tempStudent])

    React.useEffect(() => {
        setListCource(props.dataCource)
        setListStudent(props.dataStudent)
    }, [props.dataStudent, props.dataCource])




    function onSearch(val, name) {
        switch (name) {
            case "course":
                setTimeout(() => {
                    setSearchCource(val);
                }, 600);
                setTeampCource(val);
                break;

            case "student":
                setTimeout(() => {
                    setSearchSt(val);
                }, 600);
                setTeampStudent(val);
                break;

            default:
                break;
        }
    }

    const OptionStudent = () => {
        return listStudent.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionCource = () => {
        return listCource.map((item: any, index: number) => {
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
                    Tạo
          </Button>,
            ]}
        >
            <Form
                ref={formRef}
                name="control-ref"
                layout="horizontal"
            >
                <FormItem
                    rules={[{ required: true, message: "Chọn khóa học!" }]}
                    name="id_Course"
                    label="Tên khóa học"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Select
                        showSearch
                        placeholder="chọn khóa học"
                        onSearch={(e) => onSearch(e, "course")}
                        showArrow={false}
                        filterOption={false}
                        defaultActiveFirstOption={false}
                        notFoundContent={null}
                    >
                        {OptionCource()}
                    </Select>
                </FormItem>

                <FormItem

                    name="id_Student"
                    rules={[{ required: true, message: "Chọn học viên!" }]}
                    label="Tên học viên"
                    hasFeedback
                    {...formItemLayout}
                >
                    <Select
                        showSearch
                        placeholder="Tìm kiếm học viên"
                        onSearch={(e) => onSearch(e, "student")}
                        showArrow={false}
                        filterOption={false}
                        defaultActiveFirstOption={false}
                        notFoundContent={null}
                    >
                        {OptionStudent()}
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    )
}


export default ModalRcStudent
