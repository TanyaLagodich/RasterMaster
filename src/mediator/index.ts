import { nanoid } from 'nanoid';
import { type Slide, SlideTypes } from '@/types';
import { SlideFactory } from '@/factories/slide';

export class SlideMediator {
  private slides: Slide[];
  private setSlides: React.Dispatch<React.SetStateAction<Slide[]>> | null = null;
  private setCurrentSlide: React.Dispatch<React.SetStateAction<Slide | null>> | null = null;
  
  registerSlideList(setSlides: React.Dispatch<React.SetStateAction<Slide[]>>) {
      this.setSlides = setSlides;
  }

  registerCurrentSlide(setCurrentSlide: React.Dispatch<React.SetStateAction<Slide>>) {
      this.setCurrentSlide = setCurrentSlide;
  }
  
  setSlidesList(slides: Slide[]) {
    if (this.setSlides && JSON.stringify(slides) !== JSON.stringify(this.slides)) {
      this.slides = slides;
      this.setSlides(slides);
    }
  }

  addSlide(type: SlideTypes = SlideTypes.EMPTY) {
      const newSlide = SlideFactory.createSlide(type)
      console.log(this);
      this.setSlides(prev => [...prev, newSlide]);
      this.setCurrentSlide(newSlide);
  }

  duplicateSlide(slide: Slide) {
    const newSlide = slide.clone();
    this.setSlides(prev => [...prev, newSlide]);
    this.setCurrentSlide(newSlide);
  }

  deleteSlide(slideId: string) {
      this.setSlides(prev => prev.filter(slide => slide.id !== slideId));
      // TODO надо чтобы выбирался другой активный слайд. ниже не работает
      this.setCurrentSlide(prev => Object.assign(Object.create(Object.getPrototypeOf(prev)), prev, this.slides[this.slides.length - 1]));
  }

  editCurrentSlide(slide: Partial<Slide>) {
    // TODO: need refactoring
    this.setCurrentSlide(prev => Object.assign(Object.create(Object.getPrototypeOf(prev)), prev, slide));
    this.setSlides(prev => prev.map(s => (s.id === slide.id ? Object.assign(Object.create(Object.getPrototypeOf(s)), s, slide) : s)));  
  }

  selectSlide(slideId: string) {
      const selectedSlide = this.slides.find(slide => slide.id === slideId);
      if (this.setCurrentSlide && selectedSlide) this.setCurrentSlide(selectedSlide);
  }
}
