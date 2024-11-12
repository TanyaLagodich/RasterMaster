import { useState } from 'react';
import { Select, Row, Col, Button } from 'antd';
import { templatesDict } from '@/entities/templates/utils';
import { Template } from '@/entities/templates/types';

const { Option } = Select;

interface IProps {
    pushSlide: (template: Template) => void;
}

export const LayoutSelect = ({pushSlide}: IProps) => {
    const [selectedLayout, setSelectedLayout] = useState<string>('Создать слайд');

    const handleLayoutSelect = (layout: Template) => {
        pushSlide(layout);
        setSelectedLayout(templatesDict[layout]);
    };

    const dropdownRender = () => (
        <div style={{ padding: '10px' }}>
            <Row gutter={[16, 16]}>
                {Object.entries(templatesDict).map(([template, name]) => (
                    <Col span={24} key={template}>
                        <Button block onClick={() => handleLayoutSelect(template as Template)}>
                            {name}
                        </Button>
                    </Col>
                ))}
            </Row>
        </div>
    );

    return (
        <Select
            value={selectedLayout}
            onChange={handleLayoutSelect}
            dropdownRender={dropdownRender}
            style={{ width: 200 }}
        >
            <Option value={selectedLayout}>{selectedLayout}</Option>
        </Select>
    );
};
