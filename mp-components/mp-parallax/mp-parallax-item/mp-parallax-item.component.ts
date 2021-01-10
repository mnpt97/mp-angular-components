import { Component, OnInit, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ScreenPropertiesService } from '../../mp-services/screen-properties.service';

@Component({
  selector: 'mp-parallax-item',
  templateUrl: './mp-parallax-item.component.html',
  styleUrls: ['./mp-parallax-item.component.scss']
})
export class MpParallaxItemComponent implements OnInit {


  @Input() type : 'STEADY' | 'SCROLL'
  @Input() width : number;

  paraY : number = 0;
  lastScroll : number;

  paraSpeed : number = 0.2

  @Input() position : 'FOREGROUND' | 'MIDDLEGROUND' | 'BACKGROUND'

  styling : any
  translateY : number;
  scrollTop : number 

  constructor(private elemRef : ElementRef, private screenProps : ScreenPropertiesService,
    private renderer : Renderer2
  ) { }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll($event: any): void {
    this.scrollTop = window.pageYOffset;
    //window.scrollTo(0, this.topOffSet+662);
    console.log(this.scrollTop);

    if(this.type === "SCROLL"){
      if(this.scrollTop >= this.getOffset(this.elemRef.nativeElement).top - window.innerHeight){
        this.transformParallax()
      }
    }
    this.lastScroll = this.scrollTop

    
  }

  ngOnInit(): void {
    if(this.type === "SCROLL"){
      
    }
  }

  transformParallax(){
    this.paraY += (this.scrollTop - this.lastScroll) * this.paraSpeed;
    console.log('para start', this.paraY);
    
    this.renderer.setStyle(this.elemRef.nativeElement, 'transform', `translateY(${this.paraY}px)`)
    //this.elemRef.nativeElement.style.transform = `translateY(${this.paraY} px)`
  }





  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

}
