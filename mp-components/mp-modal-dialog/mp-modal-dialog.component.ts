import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
      transition('close <=> open', animate('{{duration}}ms'), {params: {duration : 300}}),
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

  contentOpen : 'close' | 'onClose' | 'open' | 'none' = 'close';
  wrapperOpen : 'onOpen' | 'onClose' | 'open' | 'close' = 'close';
  touchTranslate : number = 0;
  lastTouchTranslate : number = 0;
  touchStart : number;
  isTouch : boolean; 
  smallScreenSubscription : Subscription
  isSmallScreen : boolean;
  isTouchClass : string;
  isScreenClass : string;

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

  ngOnInit(): void {
    this.isTouch = this.screenProps.getIsTouch()
    if(this.isTouch){
      this.isTouchClass = 'touch'
    }else if(!this.isTouch){
      this.isTouchClass = 'mouse'
    }
    document.body.appendChild(this.element);
    this.modalService.add(this);
    
  }

  open(){
    this.contentOpen = 'open'
    this.wrapperOpen = 'open'
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
    this.modalContent.nativeElement.scrollTo(0,0)
    this.smallScreenSubscription.unsubscribe()
  }


  
  getTouchStart($event){
    this.touchOnBar = true;
    this.touchStart = $event.touches[0].clientY
  }
  barTouchMove($event){
    this.contentOpen = 'none'
    if($event.touches[0].clientY > this.touchStart){
      this.touchTranslate = $event.touches[0].clientY - this.touchStart

    }
    this.contentOpen = 'onClose'
    
    
  }
  onTouchLeave(){
    this.touchOnBar = false
    
    if(this.touchTranslate < (window.innerHeight) * ((100-this.params.height)/100)){
      this.contentOpen = 'open'
      
    }else if(this.touchTranslate >= (window.innerHeight) * ((100-this.params.height)/100)){
      this.close()
      //this.wrapperOpen = 'onClose'
    }
  }
  
  ngOnDestroy(){
    this.modalService.remove(this.id);
    this.element.remove();
  }

}
