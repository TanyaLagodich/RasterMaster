import { useState } from 'react';
import { Select, Row, Col, Button } from 'antd';

const { Option } = Select;

export function LayoutSelect() {
    const [selectedLayout, setSelectedLayout] = useState<string>('Макет 1');

    const handleLayoutSelect = (layout: string) => {
        setSelectedLayout(layout);
    };

    const dropdownRender = () => (
        <div style={{ padding: '10px' }}>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Button block onClick={() => handleLayoutSelect('Макет 1')}>
                        Макет 1
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block onClick={() => handleLayoutSelect('Макет 2')}>
                        Макет 2
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block onClick={() => handleLayoutSelect('Макет 3')}>
                        Макет 3
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block onClick={() => handleLayoutSelect('Макет 4')}>
                        Макет 4
                    </Button>
                </Col>
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
