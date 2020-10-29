import {Button, Col, Row, Tag} from "antd";
import BackwardOutlined from "@ant-design/icons/lib/icons/BackwardOutlined";
import React from "react";

function HHMemberInfoDetail(props) {
    const {setShowDetailMember} = props;

    const objectMember = [
        {
            key:"Photo",
            value: <Tag color="#337AB7"><i className="fas fa-user"></i></Tag>
        },
        {
            key:"Member Name",
            value: "Longcudailongthong"
        },
        {
            key:"Gender",
            value: "Male"
        },
        {
            key:"Marital status",
            value: "Married"
        },
        {
            key:"Date of birth",
            value: "01/04/1980"
        },
        {
            key:"Relation to household",
            value: "4.Son,Daughter"
        },
        {
            key:"Age",
            value: "40"
        },
        {
            key:"Are you enrolled in school now?",
            value: "Yes"
        },
        {
            key:"What level and class are you enrolled in now?",
            value: "Upper secondary"
        },
        {
            key:"During the past 7 days: Have you worked on your own account or in a business belonging to you or someone in your household?",
            value: "Yes"
        },
        {
            key:"During the past 7 days: Have you performed any activity on agricature by you or member of your household?",
            value: "Yes"
        },
        {
            key:"During the past 7 days: Have you performed any activity for someone who is not living in this household? For example: An enterprise, the public sector, or any other individual?",
            value: "2"
        },
        {
            key:"In the main job that you had during the past 7 days are you",
            value: "5"
        },
        {
            key:"In the main job what are the main goods or services produced at your place of work?",
            value: "1"
        },
        {
            key:"Are you a member of any public health insurance/social health protection schemes?",
            value: "Yes"
        },
        {
            key:"Are you a member of a private health insurance?",
            value: "No"
        },
        {
            key:"Are you currently pregnant?(For only females>=10 y.o.)",
            value: "No"
        },
        {
            key:"Does this person has any disability",
            value: "Does this person has any disability"
        },
        {
            key:"if yes, what type of disabilities",
            value: "0"
        }
    ]

    const renderInformationMember = () => {
        return objectMember.map((value,index) => (
            <Row gutter={24} className="mx-0 py-2 border-bottom" key={index}>
                <Col span={12}>
                    <span className="font-400">{value.key}</span>
                </Col>
                <Col span={12}>
                    {value.value}
                </Col>
            </Row>
        ))
    }

    return (
        <div className="hhMemberInfo">
            <div className="text-right mb-2">
                <Button type="primary" onClick={()=>{setShowDetailMember(false)}}>
                    <BackwardOutlined className="font-16 ant--icon__middle"/> Back
                </Button>
            </div>
            <div className="bg-primary p-2 font-16 font-500 text-white">
                Household Member List
            </div>
            {renderInformationMember()}
        </div>
    )
}

export default HHMemberInfoDetail;