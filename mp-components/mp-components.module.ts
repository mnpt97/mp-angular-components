import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenPropertiesService } from           './mp-services/screen-properties.service';
import { MpModalDialogService } from              './mp-modal-dialog/mp-modal-dialog.service';
import { MpAdminComponentService } from           './mp-admin/mp-admin-component.service';


import { MpHomeComponent } from                   './mp-home/mp-home.component';
import { MpMenuHeaderComponent } from             './mp-menu-header/mp-menu-header.component';
import { MpRouterContentComponent } from          './mp-router-content/mp-router-content.component';
import { MpModalDialogComponent } from            './mp-modal-dialog/mp-modal-dialog.component';
import { MpAdminEditComponent } from              './mp-admin/mp-admin-edit/mp-admin-edit.component';
import { MpAdminComponentWrapperComponent } from  './mp-admin/mp-admin-component-wrapper/mp-admin-component-wrapper.component';
import { MpSlideshowComponent } from              './mp-slideshow/mp-slideshow.component'; 
import { MpScrollViewTopImageComponent } from     './mp-scroll-view-top-image/mp-scroll-view-top-image.component';
import { MpParallaxItemComponent } from            './mp-parallax-item/mp-parallax-item.component'
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MpMaterialModule } from './mp-material/mp-material.module'


const MpComponents = [
  MpHomeComponent, MpMenuHeaderComponent, MpRouterContentComponent, 
  MpModalDialogComponent, MpAdminEditComponent, MpAdminComponentWrapperComponent, 
  MpSlideshowComponent, MpParallaxItemComponent,
  MpScrollViewTopImageComponent
]

@NgModule({
  declarations: [
    MpComponents
  ],
  imports: [
    CommonModule,
    MpMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers : [
    ScreenPropertiesService, MpModalDialogService, MpAdminComponentService
  ],
  exports : [
    MpComponents
  ]
})
export class MpComponentsModule { }
