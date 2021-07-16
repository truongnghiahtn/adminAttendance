import React from 'react';
import { Button, Row, Col, Form, Input, Select } from "antd";
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;
interface IFilterProps {
    showCreateModal: () => void;
    onFilterChange: (value: string) => void;
    onOptionChange: (value: string) => void;
    auth:any;
}
const ColProps = {
    xs: 24,
    sm: 8,
    style: {
        marginBottom: 16,
    },
};

const Filter: React.FC<IFilterProps> = (props) => {
    const [values, setValues] = React.useState<string>();
    const [tempValue, setTempValue] = React.useState<string>("");
    const [year,setYear] =React.useState<any>("2020-2021")
    const handleOnChange = (e: any) => {
        const { value } = e.target;
        setTimeout(() => {
            setValues(value);
        }, 600);
        setTempValue(value);
    };
    React.useEffect(() => {
        if (values === tempValue) {
            props.onFilterChange(values);
        }
    }, [values, tempValue])

    const onAdd = () => {
        props.showCreateModal();
    }
    const Year = [
        { name: "2019-2020", key: "2019-2020" },
        { name: "2020-2021", key: "2020-2021" },
        { name: "2021-2022", key: "2021-2022" },
        { name: "2022-2023", key: "2022-2023" },
    ]
    const OptionYear = () => {
        return Year.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const onchangOption = (e: any) => {
        setYear(e);
        props.onOptionChange(e);
    }
    return (
        <>
            <Form name="control-ref">
                <Row gutter={24} justify="space-between">
                    <Col {...ColProps} xl={{ span: 12 }} md={{ span: 8 }}>
                        <h2>Khóa học</h2>
                    </Col>
                    <Col xl={{ span: 12 }} md={{ span: 12 }}>
                        <Row gutter={24} justify="end">
                            <Col xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 6 }} xs={{ span: 10 }} >
                                <FormItem
                                    initialValue="2020-2021"
                                >
                                    <Select
                                    value={year}
                                        placeholder="Lựa chọn năm học"
                                        onChange={onchangOption}
                                        style={{ width: "100%" }}
                                    >
                                        {
                                            OptionYear()
                                        }
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 8 }}>
                                <Form.Item name="title">
                                    <Input
                                        placeholder="Tìm kiếm..."
                                        onChange={handleOnChange}
                                    />
                                </Form.Item>
                            </Col>
                            {props.auth.User.type == "admin"?<Col xl={{ span: 4 }} md={{ span: 4 }} sm={{ span: 6 }} xs={{ span: 6 }}>
                                <Button type="ghost" onClick={onAdd} >
                                    Tạo mới
                                </Button>
                            </Col>:("")}
                            
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default Filter
