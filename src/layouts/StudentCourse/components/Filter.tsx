import React from 'react';
import { Button, Row, Col, Form, Input, Radio } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

interface IFilterProps {
    onFilterChange:(value:string)=>void;
    cource:any;
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
    const[tempValue,setTempValue]=React.useState<string>("");
    const handleOnChange = (e: any) => {
        const { value } = e.target;
        setTimeout(() => {
            setValues(value);
        }, 600);
        setTempValue(value);
    };
    React.useEffect(()=>{
        if(values===tempValue){
            props.onFilterChange(values);
        }
    },[values,tempValue])

    return (
        <>
            <Form name="control-ref">
                <Row gutter={24} justify="space-between">
                    <Col {...ColProps} xl={{ span: 12 }} md={{ span: 8 }}>
                        <h2>Chi tiết khóa học</h2>
                    </Col>
                    <Col xl={{ span: 12 }} md={{ span: 12 }}>
                        <Row gutter={24} justify="end">
                            <Col xs={{ span: 14 }} sm={{ span: 16 }} xl={{ span: 12 }}>
                                <Form.Item name="title">
                                    <Input
                                        placeholder="Tìm kiếm..."
                                        onChange={handleOnChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                                <Button href={`https://www.attendancev2.somee.com/Export/Excel?Id=${props.cource.idCource}`} type="primary" icon={<DownloadOutlined />} >
                                    Download
                                </Button>
                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default Filter
