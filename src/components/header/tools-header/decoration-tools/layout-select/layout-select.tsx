import { useState } from 'react';
import { Select, Row, Col, Button } from 'antd';
import { templatesDict } from '@/entities/templates/utils';
import { Template } from '@/types';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';

const { Option } = Select;

const initValue = 'Создать слайд';

export const LayoutSelect = () => {
    const { mediator } = useSlideMediator();
    const [selectedLayout, _] = useState<string>(initValue);

    const handleLayoutSelect = (layout: Template) => {
        mediator.pushSlide(layout);
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
