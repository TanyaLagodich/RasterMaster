import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { type Slide, Template } from '@/types';
import { SlideFactory } from '@/factories/slide';

const buildLl = (slides: Slide[], context: SlidesList, prev: SlidesListItem) => {
  slides.forEach((slide, i, arr) => {
    const slideItem = new SlidesListItem(slide);
    if (prev) {
      prev.next = slideItem;
    }
    slideItem.prev = prev;
    prev = slideItem;
    slideItem.next = i === arr.length - 1
      ? null
      : new SlidesListItem(arr[i + 1]);
    
    if (i === 0) {
      context.first = slideItem;
    }
    if (i === arr.length - 1) {
      context.last = slideItem;
    }

    context.map.set(slide.id, slideItem);
  })
}

interface SlidesListBuilderArgs {
  slides: Slide[];
  currentSlide: Slide;
  setSlides: Dispatch<SetStateAction<Slide[]>>;
  setCurrentSlide: Dispatch<SetStateAction<Slide>>;
}

export const buildUpSlidesList = (args: SlidesListBuilderArgs): SlidesList => {
  const {slides, currentSlide, setSlides, setCurrentSlide} = args;

  const list = new SlidesList();

  if (slides.length) {
    let prev = null;

    buildLl(slides, list, prev);
  }

  list.registerSlideList(setSlides);
  list.registerCurrentSlide(setCurrentSlide);
  list.setSlides(slides);
  list.setCurrentSlide(currentSlide);

  return list;
}


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
      this.map = new Map()
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
      this.setCurrentSlideIncoming(slide);
      this.currentSlide = slide;
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
      newSlideItem.next = temp;
      if (temp) {
        temp.prev = newSlideItem;
      }
      newSlideItem.prev = currentSlideItem;

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

  public createSlide(event: MouseEvent, id: string, type: Template = Template.DEFAULT) {
      event.stopPropagation();

      if (this.isEmpty()) {
          this.pushSlide(type);
          return;
      }

      const newSlide = SlideFactory.createSlide(type);
      this.insertSlide(id, newSlide);
  }

  public duplicateSlide(event: MouseEvent, id: string, slide: Slide) {
      event.stopPropagation();
  
      if (this.isEmpty()) {
          return;
      }

      const newSlide = slide.clone();
      this.insertSlide(id, newSlide);
  }

  public deleteSlide(event: MouseEvent, id: string) {      
      event.stopPropagation();
      this.resetCurrentSlide(id);

      if (this.map.size === 1) {
        this.first = null;
        this.last = null;

        this.map.delete(id);
        this.setSlides(this.toArray());
        return;
      }

      if (this.first.value.id === id) {
        this.first = this.first.next;
        this.first.prev = null;

        this.map.delete(id);
        this.setSlides(this.toArray());
        return;
      }

      if (this.last.value.id === id) {
        this.last = this.last.prev;
        this.last.next = null;

        this.map.delete(id);
        this.setSlides(this.toArray());
        return;
      }

      const slideToDelete = this.getSlide(id);
      this.map.delete(id);

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

  editCurrentSlide(slide: Slide) {
    const slideItemToEdit = this.getSlide(slide.id);
    slideItemToEdit.value = slide;
    this.setSlides(this.toArray());
  }

  public rebuild(slides: Slide[]) {
    if (!slides.length) {
      return;
    }

    this.first = null;
    this.last = null;
    let prev = null;

    buildLl(slides, this, prev);
    this.setSlides(this.toArray());
  }

  public getIndex() {
    if (!this.first) return 0;

    let current = this.first;
    let index = 1;
    while (current.value.id !== this.currentSlide.id) {
      current = current.next;
      index += 1;
    }
    
    return index;
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
