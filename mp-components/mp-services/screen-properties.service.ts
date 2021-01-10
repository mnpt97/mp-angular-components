import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'any'
})
export class ScreenPropertiesService {

  private isMobile = new Subject();
  private isTouch;
  public screenWidth: string;
  private _isSmallScreen: boolean;
  private smallScreen : BehaviorSubject<boolean> = new BehaviorSubject(false)
  private screenOrientation : BehaviorSubject<string> = new BehaviorSubject('landscape')
  //private screenSize : BehaviorSubject<{width: number, height: number}> = new BehaviorSubject({width: 0, height: 0})
  private screenSize :  {width: number, height: number}

  private scrollTop : BehaviorSubject<number> = new BehaviorSubject(0);
  private maxHeaderHeight : number = 200;
  private minHeaderHeight : number = 70;


  private headerHeight : BehaviorSubject<number> = new BehaviorSubject(this.maxHeaderHeight)

    constructor() {
        this.checkWidth();
        window.addEventListener('resize', () =>{
          this.checkWidth()
        })
        window.addEventListener('scroll', ()=>{
            
            
            if(this.headerHeight.getValue() > 50){
                
                this.headerHeight.next(this.headerHeight.getValue()- (window.scrollY - this.scrollTop.getValue()))
                if(this.headerHeight.getValue() < 50){
                    this.headerHeight.next(50);
                }
            }
            this.scrollTop.next(window.pageYOffset)
            
        })
    }

    onMobileChange(status: boolean) {
        this.isMobile.next(status);
        this.smallScreen.next(status)
    }

    getSmallScreen() : Observable<boolean>{
      return this.smallScreen.asObservable()
    }

    getMobileStatus(): Observable<any> {
        console.log(this.isMobile);
        
        return this.isMobile.asObservable();
    }
    getHeaderHeight() : Observable<any>{
        return this.headerHeight.asObservable()
    }
    getMaxHeaderHeight() : number {
        return this.maxHeaderHeight
    }
    getminHeaderHeight() : number{
        return this.minHeaderHeight
    }

    getScreenSize() {
        
        return  this.screenSize
    }
    getScrollY() : Observable<number>{
        return this.scrollTop.asObservable()
    }

    getIsTouch() {
      return this.isTouch;
    }

    public getScreenOrientation() : Observable<any>{
        return this.screenOrientation.asObservable()
    }

    public checkWidth() {
        let width = window.innerWidth;
        if (width <= 1200) {
            this.screenWidth = 'sm';
            this._isSmallScreen = true;
            
            this.onMobileChange(true);
        } else {
            this.screenWidth = 'lg';
            this._isSmallScreen = false;

            this.onMobileChange(false);
        }
        let height = window.innerHeight;
        if(width >= height){
            this.screenOrientation.next('landscape')
        }else if(width < height){
            this.screenOrientation.next('portrait')
        }
        this.screenSize = {width: width, height: height};

        this.isTouch = ('ontouchstart' in document.documentElement);
    }
}
