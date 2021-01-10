import { Component, OnInit } from '@angular/core';
import { ScreenPropertiesService } from '../mp-services/screen-properties.service';

@Component({
  selector: 'mp-router-content',
  templateUrl: './mp-router-content.component.html',
  styleUrls: ['./mp-router-content.component.scss']
})
export class MpRouterContentComponent implements OnInit {

  marginTop : number;
  constructor(private screenProps : ScreenPropertiesService) { }

  ngOnInit(): void {

    // this.screenProps.getHeaderHeight().subscribe(height =>{
    //   if(height === this.screenProps.getminHeaderHeight()){
    //     this.marginTop = this.screenProps.getminHeaderHeight() * 2
    //   }else{
    //     this.marginTop = this.screenProps.getMaxHeaderHeight()
    //   }
    // })
    this.marginTop = this.screenProps.getminHeaderHeight()
    
  }

}
