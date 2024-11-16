import { type Slide, SlideTypes } from '@/types';
import { SlideFactory } from '@/factories/slide';

export class SlideMediator {
  private slides: Slide[];
  private currentSlide: Slide | null = null;
  private setSlides: React.Dispatch<React.SetStateAction<Slide[]>> | null = null;
  private setCurrentSlide: React.Dispatch<React.SetStateAction<Slide | null>> | null = null;

  registerSlideList(setSlides: React.Dispatch<React.SetStateAction<Slide[]>>) {
      this.setSlides = setSlides;
  }

  registerCurrentSlide(setCurrentSlide: React.Dispatch<React.SetStateAction<Slide>>) {
      this.setCurrentSlide = setCurrentSlide;
  }

  public setSlide(slide: Slide) {
    if (this.setCurrentSlide && JSON.stringify(slide) !== JSON.stringify(this.currentSlide)) {
      this.currentSlide = slide;
      this.setCurrentSlide(slide);
    }
  }
  
  setSlidesList(slides: Slide[]) {
    if (this.setSlides && JSON.stringify(slides) !== JSON.stringify(this.slides)) {
      this.slides = slides;
      this.setSlides(slides);
    }
  }

  private findSlideIndex(id: string) {
    let prevIndex: number;

    this.slides.forEach((slide, index) => {
      if (slide.id === id) {
        prevIndex = index;
        return;
      }
    });

    return prevIndex;
  }

  private insertSlide(id: string, slide: Slide) {
    const prevIndex = this.findSlideIndex(id);
    this.setSlides(prevSlides => [...prevSlides.slice(0, prevIndex + 1), slide, ...prevSlides.slice(prevIndex + 1)]);
    this.setCurrentSlide(slide);
  }

  pushSlide(type: SlideTypes = SlideTypes.EMPTY) {
    const newSlide = SlideFactory.createSlide(type);
    this.setSlides(prev => [...prev, newSlide]);
    this.setCurrentSlide(newSlide);
  }

  createSlide(id: string, type: SlideTypes = SlideTypes.EMPTY) {
    const newSlide = SlideFactory.createSlide(type);
    this.insertSlide(id, newSlide);
  }

  duplicateSlide(id: string, slide: Slide) {
    const newSlide = slide.clone();
    this.insertSlide(id, newSlide);
  }

  private resetCurrentSlide(id: string) {
    if (this.currentSlide && this.currentSlide.id !== id) {
      return;
    }

    let result: Slide | null;

    if (this.slides.length === 1) {
      result = null;
    } else {
      for (let i = 0; i < this.slides.length; i += 1) {
        const slide = this.slides[i];
        const arr = this.slides;
  
        if (i === arr.length - 1) {
            result = this.slides[i - 1];
            break;
        }
        if (slide.id === id) {
            result = this.slides[i + 1];
            break;
        }
      }
    }

    this.setCurrentSlide(result);
  }

  deleteSlide(slideId: string) {
    this.resetCurrentSlide(slideId)
    this.setSlides(prev => prev.filter(slide => slide.id !== slideId));
  }

  editCurrentSlide(slide: Partial<Slide>) {
    // TODO: need refactoring
    this.setCurrentSlide(prev => Object.assign(Object.create(Object.getPrototypeOf(prev)), prev, slide));
    this.setSlides(prev => prev.map(s => (s.id === slide.id ? Object.assign(Object.create(Object.getPrototypeOf(s)), s, slide) : s)));  
  }

  selectSlide(slide: Slide) {
      // const selectedSlide = this.slides.find(slide => slide.id === slideId);
      if (this.setCurrentSlide) this.setCurrentSlide(slide);
  }
}