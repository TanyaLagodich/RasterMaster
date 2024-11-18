import { Dispatch, SetStateAction } from 'react';
import { type Slide, Template } from '@/types';
import { SlideFactory } from '@/factories/slide';

// export class SlideMediator {
//   private slides: Slide[];
//   private currentSlide: Slide | null = null;
//   private setSlides: React.Dispatch<React.SetStateAction<Slide[]>> | null = null;
//   private setCurrentSlide: React.Dispatch<React.SetStateAction<Slide | null>> | null = null;

//   registerSlideList(setSlides: React.Dispatch<React.SetStateAction<Slide[]>>) {
//       this.setSlides = setSlides;
//   }

//   registerCurrentSlide(setCurrentSlide: React.Dispatch<React.SetStateAction<Slide>>) {
//       this.setCurrentSlide = setCurrentSlide;
//   }

//   public setSlide(slide: Slide) {
//     if (this.setCurrentSlide && JSON.stringify(slide) !== JSON.stringify(this.currentSlide)) {
//       this.currentSlide = slide;
//       this.setCurrentSlide(slide);
//     }
//   }

//   setSlidesList(slides: Slide[]) {
//     if (this.setSlides && JSON.stringify(slides) !== JSON.stringify(this.slides)) {
//       this.slides = slides;
//       this.setSlides(slides);
//     }
//   }

//   private findSlideIndex(id: string) {
//     let prevIndex: number;

//     this.slides.forEach((slide, index) => {
//       if (slide.id === id) {
//         prevIndex = index;
//         return;
//       }
//     });

//     return prevIndex;
//   }

//   private insertSlide(id: string, slide: Slide) {
//     const prevIndex = this.findSlideIndex(id);
//     this.setSlides(prevSlides => [...prevSlides.slice(0, prevIndex + 1), slide, ...prevSlides.slice(prevIndex + 1)]);
//     this.setCurrentSlide(slide);
//   }

//   pushSlide(type: Template = Template.DEFAULT) {
//     const newSlide = SlideFactory.createSlide(type)
//     this.setSlides(prev => [...prev, newSlide]);
//     this.setCurrentSlide(newSlide);
//   }

//   createSlide(id: string, type: Template = Template.DEFAULT) {
//     const newSlide = SlideFactory.createSlide(type);
//     this.insertSlide(id, newSlide);
//   }

//   duplicateSlide(id: string, slide: Slide) {
//     const newSlide = slide.clone();
//     this.insertSlide(id, newSlide);
//   }

//   private resetCurrentSlide(id: string) {
//     if (this.currentSlide && this.currentSlide.id !== id) {
//       return;
//     }

//     let result: Slide | null;

//     if (this.slides.length === 1) {
//       result = null;
//     } else {
//       for (let i = 0; i < this.slides.length; i += 1) {
//         const slide = this.slides[i];
//         const arr = this.slides;

//         if (i === arr.length - 1) { // last
//             result = this.slides[i - 1];
//             break;
//         }
//         if (slide.id === id) { // next
//             result = this.slides[i + 1];
//             break;
//         }
//       }
//     }

//     this.setCurrentSlide(result);
//   }

//   deleteSlide(slideId: string) {
//     this.resetCurrentSlide(slideId)
//     this.setSlides(prev => prev.filter(slide => slide.id !== slideId));
//   }

//   editCurrentSlide(slide: Partial<Slide>) {
//     // TODO: need refactoring
//     this.setCurrentSlide(prev => Object.assign(Object.create(Object.getPrototypeOf(prev)), prev, slide));
//     this.setSlides(prev => prev.map(s => (s.id === slide.id ? Object.assign(Object.create(Object.getPrototypeOf(s)), s, slide) : s)));
//   }

//   selectSlide(slide: Slide) {
//       // const selectedSlide = this.slides.find(slide => slide.id === slideId);
//       if (this.setCurrentSlide) this.setCurrentSlide(slide);
//   }
// }

///

export class SlidesListItem {
  value: Slide;
  next: SlidesListItem | null;
  prev: SlidesListItem | null;

  constructor(
      value: Slide,
      next: SlidesListItem | null = null, 
      prev: SlidesListItem | null = null, 
  ) {
      this.value = value;
      this.next = next;
      this.prev = prev;
  }
}

export class SlidesList {
  first: SlidesListItem | null;
  last: SlidesListItem | null;
  map: Map<string, SlidesListItem>;
  currentSlide: Slide | null;
  currentItem: SlidesListItem | null; // For iterator
  private setSlidesIncoming: Dispatch<SetStateAction<Slide[]>> | null;
  private setCurrentSlideIncoming: Dispatch<SetStateAction<Slide | null>> | null;

  constructor() {
      this.first = null;
      this.last = null;
      this.map = new Map();
      this.currentSlide = null;
      this.currentItem = this.first;
      this.setSlidesIncoming = null;
      this.setCurrentSlideIncoming = null;
  }

  public registerSlideList(setSlides: Dispatch<SetStateAction<Slide[]>>) {
    this.setSlidesIncoming = setSlides;
  }

  public registerCurrentSlide(setCurrentSlide: Dispatch<SetStateAction<Slide>>) {
    this.setCurrentSlideIncoming = setCurrentSlide;
  }

  public setSlides(slides: Slide[]) {
    if (this.setSlidesIncoming) {
      this.setSlidesIncoming(slides);
    }
  }

  public setCurrentSlide(slide: Slide) {
    if (this.setCurrentSlideIncoming) {
      console.log('setCurrentSlideIncoming', slide);
      this.setCurrentSlideIncoming(slide);
    }
  }

  private getSlide(id) {
    return this.map.get(id);
  }

  private isEmpty() {
    return this.map.size === 0;
  }

  private insertSlide(id: string, slide: Slide) {
      const newSlideItem = new SlidesListItem(slide);
      const currentSlideItem = this.getSlide(id);

      this.map.set(slide.id, newSlideItem);

      const temp = currentSlideItem.next;
      currentSlideItem.next = newSlideItem;
      newSlideItem.prev = currentSlideItem;
      newSlideItem.next = temp;

      if (this.last.value.id === id) {
          this.last = newSlideItem;
      }

      this.setSlides(this.toArray());
      this.setCurrentSlide(slide);
  }

  public pushSlide(type: Template = Template.DEFAULT) {    
      const newSlide = SlideFactory.createSlide(type);
      const newSlideItem = new SlidesListItem(newSlide);
      
      if (this.isEmpty()) {
          this.map.set(newSlide.id, newSlideItem);
        
          this.first = newSlideItem;
          this.last = newSlideItem;
          this.setSlides(this.toArray());          
          this.setCurrentSlide(newSlide);

          return;
      }
      
      this.map.set(newSlide.id, newSlideItem);

      this.last.next = newSlideItem;
      newSlideItem.prev = this.last;
      this.last = newSlideItem;

      this.setSlides(this.toArray());
      this.setCurrentSlide(newSlide);
  }

  public createSlide(id: string, type: Template = Template.DEFAULT) {
      if (this.isEmpty()) {
          this.pushSlide(type);
          return;
      }

      const newSlide = SlideFactory.createSlide(type);
      this.insertSlide(id, newSlide);
  }

  public duplicateSlide(id: string, slide: Slide) {
      if (this.isEmpty()) {
          return;
      }

      const newSlide = slide.clone();
      this.insertSlide(id, newSlide);
  }

  public deleteSlide(id: string) {
      this.resetCurrentSlide(id);

      this.map.delete(id);

      if (this.first.value.id === id) {
        this.first = this.first.next;
        this.first.prev = null;

        this.setSlides(this.toArray());
        return;
      }

      if (this.last.value.id === id) {
        this.last = this.last.prev;
        this.last.next = null;

        this.setSlides(this.toArray());
        return;
      }

      const slideToDelete = this.getSlide(id);
      const prevSlide = slideToDelete.prev;
      const nextSlide = slideToDelete.next;

      prevSlide.next = nextSlide;
      nextSlide.prev = prevSlide;

      this.setSlides(this.toArray());
  }

  private resetCurrentSlide(id: string) {
      if (this.currentSlide.id !== id) {
        return;
      }
      
      if (this.map.size === 1) {
        this.setCurrentSlide(null);
        return;
      }

      if (this.last.value.id === id) {
        this.setCurrentSlide(this.last.prev.value);
        return;
      }

      const currentSlideItem = this.getSlide(id);
      this.setCurrentSlide(currentSlideItem.next.value);
  }

  public selectSlide(slide: Slide) {
    this.setCurrentSlide(slide);
  }

  editCurrentSlide(slide: Partial<Slide>) {
    // TODO: need refactoring
    this.setCurrentSlideIncoming(prev => Object.assign(Object.create(Object.getPrototypeOf(prev)), prev, slide));
    this.setSlidesIncoming(prev => prev.map(s => (s.id === slide.id ? Object.assign(Object.create(Object.getPrototypeOf(s)), s, slide) : s)));
  }

  private toArray() {
    return [...this];
  }

  [Symbol.iterator]() {
    this.currentItem = this.first;
    return this;
  }

  next() {
    if (!this.currentItem) {
      return {done: true, value: undefined};
    }

    const saved = this.currentItem;
    this.currentItem = this.currentItem.next;
    return {done: false, value: saved.value};
  }
}