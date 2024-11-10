import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Card } from 'antd';
import type { MenuProps } from 'antd';
import { Slide } from '@/types';
import * as s from './slide-preview.module.scss';

interface SlidePreviewProps {
  slide: Slide;
  isActive: boolean;
  onCreateSlide: () => void;
  onRemoveSlide: (id: string) => void;
  onDuplicateSlide: (slide: Slide) => void;
}

export function SlidePreview ({
    slide,
    isActive,
    onCreateSlide,
    onRemoveSlide,
    onDuplicateSlide,
}: SlidePreviewProps) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Создать',
      onClick: () => onCreateSlide(),
    },
    {
      key: '2',
      label: 'Дублировать',
      onClick: () => onDuplicateSlide(slide),
    },
    {
      key: '3',
      label: 'Удалить',
      onClick: () => onRemoveSlide(slide.id),
    },
  ];
  
  return (
    <Card
      hoverable
      cover={slide.preview ? <img src={slide.preview} alt="Preview" /> : null}
      className={`${s.root} ${isActive ? s.active : ''}`}
    >
      {isActive &&
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button
            className={s.settings}
            icon={<EllipsisOutlined />}
          />
        </Dropdown>
      }
    </Card>
  );
}
