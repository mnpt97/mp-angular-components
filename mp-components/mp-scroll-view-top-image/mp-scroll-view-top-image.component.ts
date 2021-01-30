import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-scroll-view-top-image',
  templateUrl: './mp-scroll-view-top-image.component.html',
  styleUrls: ['./mp-scroll-view-top-image.component.scss']
})
export class MpScrollViewTopImageComponent implements OnInit {


  testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
              ]

  constructor() { }

  ngOnInit(): void {
  }

}
