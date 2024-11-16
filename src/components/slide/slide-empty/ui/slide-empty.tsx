import { Card, Typography } from 'antd';
import * as s from './slide-empty.module.scss';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';

export function SlideEmpty() {
  const { mediator } = useSlideMediator();

  return (
    <Card
      className={s.root}
      onClick={() => mediator.addSlide()}
    >
      <Typography.Title level={2}>
        Щелкните, чтобы добавить первый слайд
      </Typography.Title>
    </Card>
  )
}