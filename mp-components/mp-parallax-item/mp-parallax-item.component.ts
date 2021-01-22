import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-parallax-item',
  templateUrl: './mp-parallax-item.component.html',
  styleUrls: ['./mp-parallax-item.component.scss']
})
export class MpParallaxItemComponent implements OnInit {

  @Input() imgSrc : string = null
  constructor() { }

  ngOnInit(): void {
    console.log(this.imgSrc, 'img');
    
  }

}
