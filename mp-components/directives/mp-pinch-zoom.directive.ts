import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[mpPinchZoom]'
})
export class MpPinchZoomDirective {

  @Output() zoom : EventEmitter<{pinch : 'pinch' | 'end', zoom : number}> = new EventEmitter()
  @Input() initZoom : number = 100;
  private lastZoom : number = 100;
   

  @HostListener('touchstart',['$event']) pinchStart(evt : TouchEvent){
    console.log('start');
    if(evt.touches[1] !== undefined){
      this.touches = {
        first : {x : evt.touches[0].clientX, y : evt.touches[0].clientY}, 
        second : {x : evt.touches[1].clientX, y : evt.touches[1].clientY},
        // ((y2^2 - y1^2) + (x2^2 - x1^2)) ^-1/2 
        distance : this.getDistance(evt.touches[0].clientX, evt.touches[1].clientX,
          evt.touches[0].clientY, evt.touches[1].clientY)
      }
    }
    // this.initZoom = this.getDistance(evt.touches[0].clientX, evt.touches[1].clientX,
    //       evt.touches[0].clientY, evt.touches[1].clientY)
    
    console.log(this.touches);
    //this.zoom.emit(JSON.stringify(this.touches))
    
  }
  @HostListener('touchmove', ['$event']) pinchMove(evt : TouchEvent){
    let newDistance : number = this.getDistance(evt.touches[0].clientX, evt.touches[1].clientX,
      evt.touches[0].clientY, evt.touches[1].clientY)
    this.lastDistance = newDistance
    this.zoom.emit({pinch : 'pinch', zoom : (newDistance / this.touches.distance) * 100 + this.lastZoom - 100})
    
  }

  @HostListener('touchend', ['$event']) pinchEnd(){
    this.zoom.emit({pinch : 'end', zoom : (this.lastDistance/ this.touches.distance) * 100 + this.lastZoom - 100})
    this.lastZoom = (this.lastDistance/ this.touches.distance) * 100 + this.lastZoom - 100
    this.lastZoom < 100 ? this.lastZoom = 100 : this.lastZoom = this.lastZoom
  }

  private scale : number;
  private lastDistance : number = null;
  private touches : {first : {x : number, y : number}, second : {x : number, y : number}, distance : number} = 
    {first : {x : null, y :null}, second : {x : null, y : null}, distance : null} 
  constructor() { }
  private getDistance(x1 : number, x2 : number, y1 : number, y2 : number) : number{
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
  }


  

}
