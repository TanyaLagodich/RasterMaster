import { useMemo, useState } from 'react';
import { Button, ColorPicker, Space } from "antd";
import type { ColorPickerProps, GetProp } from 'antd';
import { BgColorsOutlined } from "@ant-design/icons";

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

export function BackgroundPicker() {
    const [color, setColor] = useState<Color>('#1677ff');
    const [globalColor, setGlobalColor] = useState<Color>('#ffffff');

    const bgColor = useMemo<string>(
        () => (typeof color === 'string' ? color : color!.toHexString()),
        [color]
    );

    const applyToAllSlides = () => {
        setGlobalColor(color);
    };

    const customPanelRender = (panel) => (
        <div>
            {panel}
            <Button type="primary" style={{ marginTop: 10 }} onClick={applyToAllSlides}>
                Применить ко всем
            </Button>
        </div>
    );

    const btnStyle: React.CSSProperties = {
        backgroundColor: bgColor,
        color: '#fff',
        border: 'none',
    };

    return (
        <ColorPicker value={color} onChange={setColor} panelRender={customPanelRender}>
            <Space>
                <Button type="primary" style={btnStyle} icon={<BgColorsOutlined />}>
                    Фон
                </Button>
            </Space>
        </ColorPicker>
    );
};
