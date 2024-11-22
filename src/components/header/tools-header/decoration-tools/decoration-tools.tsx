import { Space, Row, Col, Checkbox } from 'antd';
import { BackgroundPicker } from './background-piker';
import { ThemeSelect } from './theme-select';
import { LayoutSelect } from './layout-select';
import { useAppActionsContext } from '@/hooks/useAppActionsContext';

export function DecorationTools() {
    const { toggleNumeration } = useAppActionsContext();

    return (
        <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9' }}>
            <Row gutter={16} align="middle">
                {/* Темы */}
                <Col>
                    <Space>
                        <ThemeSelect />
                    </Space>
                </Col>

                {/* Фон */}
                <Col>
                    <Space>
                        <BackgroundPicker />
                    </Space>
                </Col>

                {/* Макет */}
                <Col>
                    <Space>
                        <LayoutSelect />
                    </Space>
                </Col>

                {/* Нумерация */}
                <Col>
                    <Checkbox onChange={toggleNumeration}>Нумерация слайдов</Checkbox>
                </Col>
            </Row>
        </div>
    );
}
