import { Component, OnInit, ViewChildren } from '@angular/core';
import { ScreenPropertiesService } from 'src/app/services/screen-properties.service';

@Component({
  selector: 'mp-overlay-scroll-item',
  templateUrl: './mp-overlay-scroll-item.component.html',
  styleUrls: ['./mp-overlay-scroll-item.component.scss']
})
export class MpOverlayScrollItemComponent implements OnInit{
  _height : number;
  constructor(private screenProperties : ScreenPropertiesService) { }
  

  ngOnInit(): void {
    this._height = this.screenProperties.getScreenSize().height

  }

}
