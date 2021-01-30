import { Component, OnInit, ContentChildren, QueryList, ElementRef, TemplateRef, ContentChild } from '@angular/core';
import { MpOverlayScrollItemComponent } from './mp-overlay-scroll-item/mp-overlay-scroll-item.component';

@Component({
  selector: 'mp-overlay-scroll',
  templateUrl: './mp-overlay-scroll.component.html',
  styleUrls: ['./mp-overlay-scroll.component.scss']
})
export class MpOverlayScrollComponent implements OnInit {

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @ContentChildren('scrollItem') items: QueryList<MpOverlayScrollItemComponent> = new QueryList();
  constructor() { }

  ngOnInit(): void {
    console.log(this.items);
    
    this.items.forEach(item =>{
      console.log(item);
      
    })
  }
  ngAfterOnInit(){
    this.items.forEach(item =>{
      console.log(item);
      
    })
  }

}
