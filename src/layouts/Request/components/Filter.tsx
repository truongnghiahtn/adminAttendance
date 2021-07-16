import React from 'react';
import { Button, Row, Col, Form, Input, Select } from "antd";
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;
interface IFilterProps {
    onFilterChange: (value: string) => void;
    onOptionChange: (value: string) => void;
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
    const [year,setYear] =React.useState<any>(true)
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

    const Status = [
        { name: "Yêu cầu", key: true },
        { name: "Kho lưu trữ", key: false},
    ]
    const OptionStatus = () => {
        return Status.map((item: any, index: number) => {
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
                        <h2>Yêu cầu</h2>
                    </Col>
                    <Col xl={{ span: 12 }} md={{ span: 12 }}>
                        <Row gutter={24} justify="end">
                            <Col xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 6 }} xs={{ span: 10 }} >
                                <FormItem
                                    initialValue={true}
                                >
                                    <Select
                                    value={year}
                                        placeholder="Lựa chọn năm học"
                                        onChange={onchangOption}
                                        style={{ width: "100%" }}
                                    >
                                        {
                                            OptionStatus()
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
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default Filter
