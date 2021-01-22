//#########################################################################################
//################ - Angular slideshow - ##################################################
// @author github/mnpt97
// @version 0.0.1


import { Component, OnInit, QueryList, ContentChildren, ElementRef, HostListener, ViewChild, Input, Renderer2, ViewChildren, ComponentFactoryResolver } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'mp-slideshow',
  templateUrl: './mp-slideshow.component.html',
  styleUrls: ['./mp-slideshow.component.scss'],
  animations : [
    trigger(
      'moveSlideTouch' , [
        state('move', style({
            'transform' : 'translate3D({{xPos}}px, 0, 0)'
        }), {params: {xPos : 0}}),
        state('onMove', style({
          'transform' : 'translate3D({{touchX}}px, 0, 0)'
        }), {params: {touchX : 0}}),
        transition('onMove => move', animate('{{duration}}ms'), {params:{duration : 300}}),
        transition('none => move', animate('{{duration}}ms'), {params:{duration : 300}}),
      ]
    ),

    trigger(
      'moveLineIndicator', [
        state('move', style({
          'transform' : 'translate3D({{xPos}}%, 0, 0)'
        }), {params: {xPos : 0}}),
        state('onMove', style({
          'transform' : 'translate3D({{xPos}}%, 0, 0)'
        }), {params: {xPos : 0}}),
        transition('onMove => move', animate('{{duration}}ms'), {params:{duration : 300}}),
      ]
    ), 

    trigger(
      'moveRoundIndicator', [
        state(':increment', style({
          'background-color' : '{{bColor}}'
        }), {params : {bColor : 'transparent'}}),
        state(':decrement', style({
          'background-color' : '{{bColor}}'
        }), {params : {bColor : 'transparent'}}),
        transition('*<=>*', animate('{{duration}}ms'), {params : {duration : 300}})
      ]
    ),

    trigger(
      'moveProgressIndicator', [
        state('move', style({
          'width' : '{{width}}%'
        }), {params: {width : 0}}),
        state('onMove', style({
          'width' : '{{width}}%'
        }), {params: {width : 0}}),
        transition('onMove => move', animate('{{duration}}ms'), {params:{duration : 300}}),
      ]
    )


  ]
})
export class MpSlideshowComponent implements OnInit {

  @ContentChildren('mpslideitem') items : QueryList<any>;
  @ViewChild('mpSlideshow') elem : ElementRef
  @ViewChild('mpSlideshowOuter') outerElem : ElementRef

  @Input() slideshowOptions : MpSlideshowOptions = {
    slideType : "END",
    slideVisuals : {
      slidePadding : 40,
      animationDuration : 400,
      indicators : 'LINE2',
      
      arrows : "ARROW1",
      arrowPosition : "MIDDLE"

    },
    showArrowsOnMobile : false,
    showSlideableOnScroll : true
  
  }

  public isTouchDevice : boolean;

  // indicator options:
  public indicatorClass : "mp-no-indicator" | "mp-indicator-line1" | "mp-indicator-line2" | "mp-indicator-line3" | 
                          "mp-indicator-round1" | "mp-indicator-progress1" |  "mp-indicator-progress2";
  public indicatorLineWidthPercent : number = 80;
  public indicatorLineX : number = 0; // in percent
  public indicatorBarWidth : number = 0; // in percent


  //arrow options:
  public arrowColorLeft : string
  public arrowBackgroundColorLeft : string
  public arrowColorRight : string
  public arrowBackgroundColorRight : string;
  public arrowPosY : string;
  public arrowTopOrBottom : string;
  public arrowClass : 'mp-arrow-top' | 'mp-arrow-middle' | 'mp-arrow-bottom' | 'mp-arrow-panel'
  


  // animation variables
  public animationState : "none" | "onMove" | "move" = 'none';
  public slideItemclass = "mp-slide-item-000"
  private inAnimation : boolean = false;


  //Touch Events
  private touchPosX : number = 0;
  private startTouchPosX : number = 0;
  private startTouchPosY : number = 0;
  private deltaTouchY : number = 0;
  private touched : boolean = false;

  // Slide values
  public translateXValue : number = 0;
  public currentPos : number = 0;
  public slideWidth : number = 4000;
  public slideHeight : number = 0;
  public slideItemWidth : number = 0;
  private itemsArranged : boolean = false;

  private slideScrollTop : number = 0;
  private showedScrollable : boolean = false



  @HostListener('window:resize', ['$event']) onResize(evt : Event) : void {
    console.log('resize');
    this.setSlideshowProperties()
    
  }

  @HostListener('window:scroll', ['$event']) onScroll(evt : Event) : void{
    if(this.slideshowOptions.showSlideableOnScroll){
      this.contentScrolled(evt)
    }
  }


  constructor(
    private renderer : Renderer2,
    private resolver : ComponentFactoryResolver,
    private slideShowRef : ElementRef
  ) { }

  ngOnInit(): void {

    this.isTouchDevice = ('ontouchstart' in document.documentElement);
    

  }

  ngAfterViewInit() {
    this.setSlideshowProperties()
    this.setArrowProperties();
    this.setIndicatorProperties();
    this.slideScrollTop = this.outerElem.nativeElement.offsetTop;
    console.log(this.items);
    
  }


  // touch specific functions 

  public touchStart(evt : TouchEvent) :void{
    this.startTouchPosY= evt.touches[0].clientY
    this.deltaTouchY = 0;
    this.touched = true;
    this.startTouchPosX = evt.touches[0].clientX
    this.touchPosX = this.startTouchPosX
    //document.body.style.overflow = "hidden"
  }

  public touchMove(evt : TouchEvent) : void {
    this.deltaTouchY += evt.touches[0].clientY -  this.startTouchPosY;

    if(Math.abs(this.deltaTouchY) > 30){
      
    }
    if(!(this.currentPos >= this.items.length -1 && (evt.touches[0].clientX - this.touchPosX) < 0)){
      this.slideWhiletouch(evt.touches[0].clientX - this.touchPosX)
      this.touchPosX = evt.touches[0].clientX;
    }
  }

  public touchEnd() : void {
    //document.body.style.overflow = "auto"
    let delta = this.touchPosX - this.startTouchPosX;
    if(delta > 0){
      if(Math.abs(delta) > this.slideItemWidth/3 && this.currentPos < this.items.length && this.currentPos > 0){
        this.currentPos --
      }
    }else{
      console.log('left', Math.abs(delta) > this.slideItemWidth/2 )
      if(Math.abs(delta) > this.slideItemWidth/3 && this.currentPos >= 0 && this.currentPos < this.items.length-1){
        this.currentPos ++       
      }
    }
    this.moveSlides()
  }



  private slideWhiletouch(distX : number){
    //this.animationState = "none"
    if(!(this.currentPos === 0 && distX > 0 || this.currentPos === this.items.length -1 && distX < 0)){
      this.translateXValue += distX
      if(this.slideshowOptions.slideVisuals.indicators !== "NONE"){
        this.slideWhileTouchIndicators(this.translateXValue)
      }
    }
  }


  private slideWhileTouchIndicators(translateX : number){
    this.indicatorLineX = - (translateX / this.slideItemWidth) * 100
  }

  public getAnimationXPos() : number{
    
    return -this.slideItemWidth * this.currentPos
  }


  private moveSlides(){
  
    this.inAnimation = true;
    this.indicatorLineX = 100 * this.currentPos
    this.indicatorBarWidth = 100/this.items.length + this.currentPos * (100/this.items.length)
    this.animationState = 'move'
    setTimeout(() => {
      this.translateXValue = this.getAnimationXPos()
      this.inAnimation = false;
    }, this.slideshowOptions.slideVisuals.animationDuration +1);
    
    
  }


  public showArrows() :  boolean{
    if(!this.isTouchDevice){
      return true
    }else if(this.slideshowOptions.showArrowsOnMobile){
      return true
    }else{
      return false
    }
  }


  public arrowLeftClick(event){
    
    
    if(this.currentPos > 0 && !this.inAnimation){
      this.currentPos --
      this.moveSlides()
    }
  }

  public arrowRightClick(event){
    
    if(this.currentPos < this.items.length-1 && !this.inAnimation){
      //this.translateXValue = this.getAnimationXPos(this.currentPos +1)
     
      this.currentPos ++
      this.moveSlides()      
    }

  }



  //slideshow properties arrangement

  private setSlideshowProperties(){
    console.log(this.outerElem.nativeElement.offsetWidth);
    
    this.slideItemWidth = this.outerElem.nativeElement.offsetWidth
    this.arrangeItems()
    this.itemsArranged = true
    this.slideWidth = (this.items.length) * this.slideItemWidth;
    this.slideHeight = this.elem.nativeElement.offsetHeight;
    //this.renderer.setStyle(this.elem.nativeElement, 'transform3d', '(0,0,0')
  }


  private arrangeItems(){
    let currentLeft : number = 0;
    
    this.items.forEach((it, index : number) =>{
      this.renderer.setStyle(it.nativeElement, 'margin', this.slideshowOptions.slideVisuals.slidePadding + 'px')
      this.renderer.setStyle(it.nativeElement, 'width', this.slideItemWidth - (2*this.slideshowOptions.slideVisuals.slidePadding) + 'px')
    })
  }

  private setArrowProperties(){
    switch(this.slideshowOptions.slideVisuals.arrowPosition){
      case "TOP":
        this.arrowTopOrBottom = "top"
        this.arrowPosY = "30px"
        //this.renderer.setStyle(this.elem.nativeElement, 'padding-top', '20px')
        break;
      case "BOTTOM":
        this.arrowTopOrBottom = "top"
        this.arrowPosY = this.slideHeight + 30 + "px"
        break;
      case "SIDEPANEL":
        this.arrowClass = "mp-arrow-panel"
        break
      default:
        this.arrowClass = "mp-arrow-middle"
        break;
    }
  }

  private setIndicatorProperties(){
    switch (this.slideshowOptions.slideVisuals.indicators) {
      case "LINE":
        this.indicatorClass = "mp-indicator-line1"
        break;
      case "LINE2":
        this.indicatorClass = "mp-indicator-line2"
        break;
      case "LINE3":
        this.indicatorClass = "mp-indicator-line3"
        break;
      case "ROUND":
        this.indicatorClass = "mp-indicator-round1"
        break;
      case "PROGRESSBAR":
        this.indicatorBarWidth = 100/(this.items.length)
        this.indicatorClass = "mp-indicator-progress1"
        break;
      case "PROGRESSBAR2":
        this.indicatorBarWidth = 100/(this.items.length)
        this.indicatorClass = "mp-indicator-progress2"
        break;
      default:
        this.indicatorClass = "mp-no-indicator"
        break;
    }
  }

  setRoundIndicatorOpacity(index : number) : string {
    if(index === this.currentPos){
      console.log(index);
      
      return "black";
    }
    return "transparent";
  }


  private contentScrolled(evt : Event) : void{
    if(window.scrollY> this.slideScrollTop-50 && !this.showedScrollable){
      
    }
    
  }


}

export interface MpSlideshowOptions{
  slideVisuals ? : {
    indicators ? : 'NONE' | 'LINE' | 'LINE2' | 'LINE3' | 'ROUND' | 'PROGRESSBAR' | 'PROGRESSBAR2',
    indicatorType ? : number,
    slidePadding ? : number,
    animationDuration ? : number,
    arrows ? : "ARROW1" | "ARROW2" | "CHEVRON",
    arrowPosition ? : "TOP" | "MIDDLE" | "BOTTOM" | "SIDEPANEL",
  }
  slideType ? : "INFINITE" | "END"
  sliderHeight ? : number,
  slidesToShow ? : number,
  showArrowsOnMobile ? : boolean,
  showSlideableOnScroll ? : boolean 


}
