import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ScreenPropertiesService } from '../mp-services/screen-properties.service';
import { MpSlideshowOptions } from '../mp-slideshow/mp-slideshow.component';

@Component({
  selector: 'mp-img-gallery',
  templateUrl: './mp-img-gallery.component.html',
  styleUrls: ['./mp-img-gallery.component.scss'],
  animations : [
    trigger('showModal', [
      transition(':enter', [
        style({'opacity' : '0', 'transform' : 'scale(0)'}), 
        animate('400ms', style({'opacity' : '1' , 'transform' : 'scale(1)'}))
      ]), 
      transition(':leave', [
        style({'opacity' : '1', 'transform' : 'scale(1)'}), 
        animate('400ms', style({'opacity' : '0' , 'transform' : 'scale(0)'}))
      ])
    ]), 
  ]
})
export class MpImgGalleryComponent implements OnInit {

  @ViewChildren('galleryImg') imgElements : QueryList<ElementRef>;
  @ViewChild('imgContainer') containerElement : ElementRef;
  @ViewChild('galleryContainer') galleryElement : ElementRef;
  @Input() imgSources : string[] = null;
  @Input() height : number = window.innerHeight - 80
  @Input() properties : {
    
  }

  @Input() slideshowOptions : MpSlideshowOptions = {
    slideType : "END",
    slideVisuals : {
      slidePadding : 10,
      animationDuration : 400,
      indicators : 'LINE2',
      
      arrows : "ARROW1",
      arrowPosition : "TOP"

    },
    initialIndex : 0,
    showArrowsOnMobile : true,
    showSlideableOnScroll : true
  
  }

  public slideshowHeight : number;
  public slideImages : {src : string, zoom : number}[] = null;

  public containerWidth : number = 0;
  public showModal : boolean = false;

  private moveInterval : any;
  public currentTranslateX : number = 0;
  private currentDirection : 'left' | 'right' = 'left';
  public arrangedImages : {id : string, type : 'full' | 'half' , src : string, size : number}[] = []

  public imgWidth : number = 100; 
  public imgHeight : number = 500;
  
  constructor(
    private renderer : Renderer2, 
    private diplayProps : ScreenPropertiesService
  ) { }

  ngOnInit(): void {
    
    if(this.imgSources !== null){
      let zoom : number = 100
      if(window.innerWidth > 800){
        zoom = 80
      }
      this.arrangeImages()
      console.log(this.arrangedImages);
      this.slideImages = this.imgSources.map(img => {
        return {src : img, zoom : zoom}
      })
      
    }
    
  }

  public arrangeImages(){
    let modAdd : number = 3;
    this.arrangedImages = this.imgSources.map((src : string, index : number) => {
      if(index % 6 === 0){
        this.containerWidth += this.height
      }
      if(index === 0 || index % 5 === 0){
        this.containerWidth += this.height;
        return {id : 'img-' + index, type : 'full', src : src, size: this.height * 0.98}
      }else {
        return {id: 'img-'+index, type : 'half', src: src, size : this.height * 0.46}
      }
    })

    console.log(this.containerWidth);
    
    
  }

  public removeAndAddImg(index : number, ref: ElementRef){
    let elem : ElementRef = this.imgElements.first
    console.log(elem);
    //this.imgElements = this.imgElements.map(item => item !== ref)
    //this.containerElement.nativeElement.remove(ref)
    this.renderer.appendChild(this.containerElement.nativeElement, ref.nativeElement)
    
    
    // this.imgElements.map((ref, ind) => {
    //   if(index === ind){
    //     //this.renderer.removeChild()
    //     this.containerElement.nativeElement.remove(ref)
    //     this.renderer.appendChild(this.containerElement.nativeElement, elem.nativeElement)
    //   }
    // })
    //this.renderer.appendChild(this.containerElement.nativeElement, elem.nativeElement)
  }

  private move(){
    let added : boolean = false;
    this.moveInterval = setInterval(() => {
      if(this.currentDirection === 'left'){
        this.currentTranslateX -= 0.7;
      }else if (this.currentDirection === 'right'){
        this.currentTranslateX += 0.7;
      }
      if(this.currentDirection === 'left' && (-this.currentTranslateX + this.galleryElement.nativeElement.offsetWidth >= this.containerElement.nativeElement.offsetWidth)){
        this.currentDirection = 'right'
      }
      if(this.currentDirection === 'right' && this.currentTranslateX >= 0){
        this.currentDirection = 'left'
      }
      this.containerElement.nativeElement.style.transform = `translate3d(${this.currentTranslateX}px, 0, 0)`
    }, 15)
  }
  public stopMove(){
    console.log('stop');
    
    clearInterval(this.moveInterval)
  }
  public startMove(){
    clearInterval(this.moveInterval)
    console.log('start');
    if(this.containerElement.nativeElement.offsetWidth > this.galleryElement.nativeElement.offsetWidth){
      this.move()
    }
    
  }
  ngAfterViewInit(){
    console.log(this.imgElements);
    this.startMove()
    
  }

  public closeSlideshowDialog(){
    this.showModal = false; 
    document.body.style.overflow = 'auto'
    this.startMove()
  }

  public openSlideshowDialog(index : number){
    this.slideshowOptions.initialIndex=index
    window.scrollTo(0, window.scrollY + 1)
    setTimeout(() => {
      this.stopMove()
    }, 300);
    this.showModal = true;
    document.body.style.overflow = 'hidden'
  }

  public getCurrentZoom(scale : {pinch : 'pinch' | 'end', zoom : number}, index){
    if(scale.pinch === 'pinch'){
      this.slideImages[index].zoom = scale.zoom
    }else if(scale.pinch === 'end') {
      if(scale.zoom < 100){
        this.slideImages[index].zoom = 100
      }
    }
  }

}
