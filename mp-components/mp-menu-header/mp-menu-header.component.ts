import { Component, OnInit, Input } from '@angular/core';
import { NavigationItem } from '../mp-interfaces/mp-global-interfaces'
import { ScreenPropertiesService } from '../mp-services/screen-properties.service'
import { trigger, state, style, animate, transition, group} from '@angular/animations';


@Component({
  selector: 'mp-menu-header',
  templateUrl: './mp-menu-header.component.html',
  styleUrls: ['./mp-menu-header.component.scss'],
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state('topX', style({
        transform: 'rotate(45deg)', 
        transformOrigin: 'left',
        margin: '6px'
      })),
      state('hide', style({
        opacity: 0
      })),
      state('bottomX', style({
        transform: 'rotate(-45deg)',
        transformOrigin: 'left',
        margin: '6px'
      })),
      transition('* => *', [
        animate('0.2s')
      ]),
    ]),
    trigger('menuTrigger', [
      state('open', style({
        'transform' : 'translateY(0)', 
        'opacity' : '1',
      })),
      state('close', style({

      })), 
      transition('open <=> close', animate('350ms'))
    ]),
    
    trigger('showHeader', [
      state('hide', style({
        'transform' : 'translateY(-100%'
      })),
      state('show', style({
        'transform' : 'translateY(0)'
      })), 
      transition('hide<=>show', animate('250ms'))
    ])

  ],
})
export class MpMenuHeaderComponent  implements OnInit {

  @Input() navItems : NavigationItem[]
  @Input() params: {
    hideHeader : boolean
  } = {
    hideHeader : false
  }

  scrollYLast : number =  0;
  scrollYNow : number = 0;

  constructor(
    private responsive : ScreenPropertiesService
  ) { }

  public isSmallScreen : boolean = false;
  public isTouch : boolean = false;

  public screenTypeClass : 'type-touch' | 'type-mouse';
  public screenSizeClass : 'large-screen' | 'small-screen'

  menuOpenClass : string = 'menuClose';
  screenClass : string = 'desktop'
  menuOpenCloseState : string = 'close'
  menuOpenClose : boolean = false
  public isHamburguer : boolean = true;

  showHeader : boolean = true

  headerHeight : number; 

  navItemStates : any = [];


  onClickHambuger() {
    this.menuOpenClose = !this.menuOpenClose;
    if(this.menuOpenClose){
      document.body.style.overflow = 'hidden'
    }else if(!this.menuOpenClose){
      document.body.style.overflow = 'auto'
    }
    
  }
  expandPanel($event, expand : boolean){
    console.log($event.target.children);
    if(expand){
      $event.target.children[1].style.display= "inline"
    }else{
      $event.target.children[1].style.display= "none"
    }
  }
  expandPanelMobile($event){
    console.log($event.target);
    if($event.target.innerHTML === 'keyboard_arrow_down'){
      $event.target.parentNode.parentNode.children[1].style.display = "inline"
      $event.target.innerHTML = 'keyboard_arrow_up'
    }else if($event.target.innerHTML === 'keyboard_arrow_up'){
      $event.target.parentNode.parentNode.children[1].style.display = "none"
      $event.target.innerHTML = 'keyboard_arrow_down'
    }
    
  }

  addNavItemStates(navItems: NavigationItem[]){
    navItems.forEach((item) =>{
      this.navItemStates.push({open: false})
    })
  }

  ngOnInit(): void {
    console.log('menu open close', this.menuOpenClose);

    
    this.responsive.getSmallScreen().subscribe((status) =>{
      this.isSmallScreen = status
      this.isSmallScreen ? this.screenClass = 'mobile' : this.screenClass = 'desktop'
      this.isSmallScreen ? this.screenSizeClass = 'small-screen' : this.screenSizeClass = 'large-screen'
      
    })
    this.isTouch = this.responsive.getIsTouch() 
    this.isTouch ? this.screenTypeClass = 'type-touch' : this.screenTypeClass = 'type-mouse'

    if(this.params.hideHeader){
      this.responsive.getScrollY().subscribe(scrollY =>{
        this.scrollYLast = this.scrollYNow;
        this.scrollYNow = scrollY;
        if(this.scrollYNow > this.scrollYLast && this.scrollYNow > 30){
          this.showHeader = false
        }else if(this.scrollYNow < this.scrollYLast){
          this.showHeader = true
        }
      })
    }
    // this.responsive.getHeaderHeight().subscribe((height) => {
    //   this.headerHeight = height
    // })
    this.headerHeight = this.responsive.getminHeaderHeight()
    

  }

  public getCloseMenu($event : any){
    console.log($event);
    if($event === true){
      this.onClickHambuger()
    }
    
  }

}
