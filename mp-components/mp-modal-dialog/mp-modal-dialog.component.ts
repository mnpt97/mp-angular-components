import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, animate, transition, group} from '@angular/animations';
import { ScreenPropertiesService } from '../mp-services/screen-properties.service';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { MpModalDialogService } from './mp-modal-dialog.service';



@Component({
  selector: 'mp-modal-dialog',
  templateUrl: './mp-modal-dialog.component.html',
  styleUrls: ['./mp-modal-dialog.component.scss'],
  animations : [
    trigger('openCloseBackground', [
        state('open', style({
          'display' : 'block'
          
        })),
        state('close', style({
          'display' : 'none',
        })),
        state('onClose', style({
          //'display' : 'block', 
          'background-color' : 'rgba(255,255,255,0)'
        })),
        state('onOpen', style({

        })),
        transition('open => onOpen', animate('{{duration}}ms'), {params: {duration : 300}}),
        transition('open => onClose', animate('{{duration}}ms'), {params: {duration : 300}})
      ]
    ),
    trigger('openCloseContent', [
      state('onClose', style({
        'transform' : 'translateY({{touchY}}px)'
      }), {params : {touchY:0}}),
      state('close', style({
          'transform' : 'translateY(105%)'
      })),
      state('open', style({
          'transform' : 'translateY(0)'
      })),
      state('reopen', style({
        'height' : '90%'
      })),
      transition('close <=> open', animate('{{duration}}ms'), {params: {duration : 300}}),
      transition('open <=> reopen', animate('{{duration}}ms'), {params: {duration : 300}}),
      transition('onClose => open, onClose => close', animate('{{duration}}ms'), {params: {duration : 150}})

    ]), 
    trigger('barTouch', [
      state('touch', style({
        'width' : '100px'
      })),
      state('noTouch', style({
        'width' : '60px'
      })),
      transition('touch <=> noTouch' , animate('200ms'))
    ])
  ]
})
export class MpModalDialogComponent implements OnInit {

  @ViewChild('mpModalContent') modalContent : ElementRef<any>;

  contentOpen : 'close' | 'onClose' | 'open' | 'none' | 'reopen'= 'close';
  wrapperOpen : 'onOpen' | 'onClose' | 'open' | 'close' = 'close';
  touchTranslate : number = 0;
  lastTouchTranslate : number = 0;
  
  isTouch : boolean; 
  smallScreenSubscription : Subscription
  isSmallScreen : boolean;
  isTouchClass : string;
  isScreenClass : string;

  public currentHeight : number = 0;
  public touchYOld : number = null; 
  public swipeSpeedY : number =null;
  public touchYBar : number = null;


  touchOnBar : boolean = false;

  private element :any;

  @Input() id : string;

  @Input() params : {
    height : number, // percentage
    animationDuration : number
  }
  
  constructor(
    private screenProps : ScreenPropertiesService,
    private modalService: MpModalDialogService,
    private elRef : ElementRef
  ) { 
    this.element = elRef.nativeElement;
  }

  onTouchStart($event : TouchEvent){
    console.log($event.touches[0], this.modalContent.nativeElement.scrollTop);
    this.touchYOld = $event.touches[0].clientY
    
  } 

  onTouchMove($event : TouchEvent, onBar : boolean = false){
    let scrollY = this.modalContent.nativeElement.scrollTop
    let touchY = $event.touches[0].clientY
    let scrollBool : boolean = onBar ? true : scrollY === 0
    if(scrollBool && this.currentHeight < window.innerHeight * 0.9 && touchY < this.touchYOld){
      console.log(touchY, this.touchYOld, onBar);
      this.touchOnBar = true;
      
      this.currentHeight += this.touchYOld - touchY
      if(this.currentHeight >= window.innerHeight *0.9){
        this.modalContent.nativeElement.style.overflowY = 'scroll'
      }
    }
    if(scrollBool &&  touchY > this.touchYOld){
      
      this.currentHeight += this.touchYOld - touchY
      this.touchOnBar = true;
    }
    this.swipeSpeedY = touchY - this.touchYOld
    this.touchYOld = touchY;

  }

  onTouchEnd($event: TouchEvent, onBar : boolean = false){
    let scrollY = this.modalContent.nativeElement.scrollTop
    this.touchOnBar = false
    console.log(this.swipeSpeedY);
    let scrollBool : boolean = onBar ? true : scrollY === 0
    
    if(scrollBool&& this.swipeSpeedY > 15){
      this.close()
    }else if(scrollBool  && this.currentHeight < window.innerHeight * 0.48){
      this.close()
    }

  }

  ngOnInit(): void {
    console.log('on init', this.currentHeight);
    this.isTouch = window.matchMedia("(pointer: coarse)").matches
    //this.isTouch = this.screenProps.getIsTouch()
    if(this.isTouch){
      this.isTouchClass = 'touch'
      this.currentHeight = window.innerHeight * 0.9
    }else if(!this.isTouch){
      this.isTouchClass = 'mouse'
      this.currentHeight = window.innerHeight * 0.9
      
    }
    document.body.appendChild(this.element);
    this.modalService.add(this);
    
  }

  ngAfterViewInit(){
    console.log(this.modalContent.nativeElement.scrollTop, 'view init');
    
    if(this.isTouch){
      //this.modalContent.nativeElement.style.overflowY = 'hidden'
    }
  }

  open(){
    this.contentOpen = 'open'
    this.wrapperOpen = 'open'
    
    if(this.isTouch){
      this.currentHeight = window.innerHeight * 0.9
      //this.modalContent.nativeElement.style.overflowY = 'hidden'
    } 
    console.log(this.currentHeight);
    
    this.smallScreenSubscription = this.screenProps.getSmallScreen().subscribe(small =>{
      this.isSmallScreen = small
      if(this.isSmallScreen){
        this.isScreenClass = 'small'
      }else{
        this.isScreenClass = 'large'
      }
    })
    document.body.style.overflow = 'hidden'
  }

  close(){
    this.contentOpen ='close'
    //this.wrapperOpen = 'onClose'
    setTimeout(() =>{
      this.wrapperOpen = 'close'
      document.body.style.overflow = 'auto'
    }, this.params.animationDuration)
    console.log(this.modalContent);
    //this.currentHeight = 0.6 * window.innerHeight
    this.modalContent.nativeElement.scrollTo(0,0)
    this.smallScreenSubscription.unsubscribe()
  }


  
  getTouchStart($event){
    this.touchOnBar = true;
    this.touchYBar = $event.touches[0].clientY
  }
  barTouchMove($event){
    let touchY = $event.touches[0].clientY
    if(this.currentHeight < window.innerHeight * 0.9 && touchY < this.touchYBar){
      console.log(touchY, this.touchYOld);
      this.touchOnBar = true;
      
      this.currentHeight += this.touchYBar - touchY
      if(this.currentHeight >= window.innerHeight *0.9){
        this.modalContent.nativeElement.style.overflowY = 'scroll'
      }
    }
    if(touchY > this.touchYBar){
      this.currentHeight += this.touchYBar - touchY
      this.touchOnBar = true;
    }
    
    
  }
  onTouchLeave(){
    
  }
  
  ngOnDestroy(){
    this.modalService.remove(this.id);
    this.element.remove();
  }

}
