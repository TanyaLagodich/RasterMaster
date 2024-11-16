import { Card, Dropdown, Button, type MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { Slide } from '@/types';
import * as s from './slide-preview.module.scss';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';

export function SlidePreview ({
    slide,
    isActive,
}: {slide: Slide; isActive: boolean}) {
  const { mediator } = useSlideMediator();
  
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Создать',
      onClick: () => mediator.createSlide(slide.id),
    },
    {
      key: 2,
      label: 'Дублировать',
      onClick: () => mediator.duplicateSlide(slide.id, slide),
    },
    {
      key: 3,
      label: 'Удалить',
      onClick: () => mediator.deleteSlide(slide.id),
    },
  ];
  
  return (
    <Card
      size="small"
      className={`${s.root} ${isActive ? s.active : ''}`}
      cover={slide.preview ? <img alt="preview" src={slide.preview} height="100%" /> : ''}
      hoverable
    >
      {isActive && <Dropdown menu={{ items }} placement="bottomLeft">
        <Button
          className={s.button}
          icon={<EllipsisOutlined />}
        />
      </Dropdown>}
    </Card>
  );
}
