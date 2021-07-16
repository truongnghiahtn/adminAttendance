import React from 'react';
import { Button, Row, Col, Form, Select } from "antd";

const { Option } = Select;
interface IFilterProps {
    datacourse: any;
    isloading: any;
    dataOption: any;
    showCreateModal: () => void;
    onChangeOption: (value: any) => void;
    onChangeCourse: (value: any) => void;
}
const Filter: React.FC<IFilterProps> = (props) => {
    const [semeter, setSemeter] = React.useState<any>({ Keyword: "", SchoolYear: "2020-2021", Semester: 1 })
    const [keyCourse, setKeyCourse] = React.useState<any>(null);
    const[keySemeter,setKeySemeter]=React.useState<any>();
    const[keySchoolYear,setKeySchoolYear]=React.useState<any>();

    React.useEffect(() => {
        props.onChangeOption(semeter)
    }, [semeter])
    React.useEffect(() => {
        if (props.dataOption.course !== 0) {
            setKeyCourse(props.dataOption.course)
        }
        setKeySemeter(props.dataOption.semeter);
        setKeySchoolYear(props.dataOption.year);
    }, [props.dataOption])
    const onchangOption = (e: any, name: string) => {
        setSemeter(pre => ({
            ...pre, [name]: e
        }))
        switch (name) {
            case "SchoolYear":
                setKeySchoolYear(e);
                break;

            case "Semester":
                setKeySemeter(e);
                break;
        }
        setKeyCourse(null)
    }
    const onchangCourse = (e: any, name: string) => {
        setKeyCourse(e);
        props.onChangeCourse(e);
    }
    const onAdd = () => {
        props.showCreateModal();
    }

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
    const OptionYear = () => {
        return Year.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionCourse = () => {
        return props.datacourse.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionSemeter = () => {
        return semeterList.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    return (
        <>
            <Form name="control-ref">
                <Row gutter={24} justify="space-between">
                    <Col style={{ marginBottom: "16px" }} xl={{ span: 8 }} md={{ span: 6 }} sm={{ span: 24 }}>
                        <h2>Lịch học</h2>
                    </Col>
                    <Col xl={{ span: 16 }} md={{ span: 18 }} sm={{ span: 24 }}>
                        <Row gutter={24} justify="end">
                            <Col xl={{ span: 5 }} md={{ span: 5 }} sm={{ span: 8 }} >
                                <Select
                                    value={keySchoolYear}
                                    placeholder="Lựa chọn năm học"
                                    onChange={(e) => onchangOption(e, "SchoolYear")}
                                    style={{ width: "100%" }}
                                >
                                    {
                                        OptionYear()
                                    }
                                </Select>
                            </Col>
                            <Col xl={{ span: 3 }} md={{ span: 3 }} sm={{ span: 8 }}  >

                                <Select
                                    value={keySemeter}
                                    placeholder="Lựa chọn học kỳ"
                                    onChange={(e) => onchangOption(e, "Semester")}
                                    style={{ width: "100%" }}
                                >
                                    {
                                        OptionSemeter()
                                        
                                    }
                                </Select>

                            </Col>
                            <Col xl={{ span: 4 }} md={{ span: 4 }} sm={{ span: 6 }} >
                                <Select
                                    value={keyCourse}
                                    loading={props.isloading}
                                    placeholder="Lựa chọn khóa học"
                                    onChange={(e) => onchangCourse(e, "Course")}
                                    style={{ width: "100%" }}
                                >
                                    {
                                        OptionCourse()
                                    }
                                </Select>
                            </Col>
                            <Col xl={{ span: 4 }} md={{ span: 4 }}   >
                                <Button type="ghost" onClick={onAdd} >
                                    Tạo mới
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
