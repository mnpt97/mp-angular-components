import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mpSlideshowItem]'
})
export class MpSlideshowItemDirective {

  constructor(
    public elem : ElementRef
  ) { 
    console.log('slide directive');
    
    
  }

}
