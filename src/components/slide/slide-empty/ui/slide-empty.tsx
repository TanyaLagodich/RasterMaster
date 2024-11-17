import { Card, Typography } from 'antd';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import * as s from './slide-empty.module.scss';

export function SlideEmpty() {
  const { mediator } = useSlideMediator();

  return (
    <Card
      className={s.root}
      onClick={() => mediator.pushSlide()}
    >
      <Typography.Title level={2}>
        Щелкните, чтобы добавить первый слайд
      </Typography.Title>
    </Card>
  )
}