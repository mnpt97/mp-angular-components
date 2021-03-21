import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenPropertiesService } from           './mp-services/screen-properties.service';
import { MpModalDialogService } from              './mp-modal-dialog/mp-modal-dialog.service';
import { MpAdminComponentService } from           './mp-admin/mp-admin-component.service';


import { MpHomeComponent } from                   './mp-home/mp-home.component';
import { MpMenuHeaderComponent } from             './mp-menu-header/mp-menu-header.component';
//import { MpRouterContentComponent } from          './mp-router-content/mp-router-content.component';
import { MpModalDialogComponent } from            './mp-modal-dialog/mp-modal-dialog.component';
import { MpAdminEditComponent } from              './mp-admin/mp-admin-edit/mp-admin-edit.component';
import { MpAdminComponentWrapperComponent } from  './mp-admin/mp-admin-component-wrapper/mp-admin-component-wrapper.component';
import { MpSlideshowComponent } from              './mp-slideshow/mp-slideshow.component'; 
import { MpScrollViewTopImageComponent } from     './mp-scroll-view-top-image/mp-scroll-view-top-image.component';
import { MpParallaxItemComponent } from            './mp-parallax-item/mp-parallax-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MpMaterialModule } from './mp-material/mp-material.module'
import { RouterModule } from '@angular/router';
import { MpSlideshowItemDirective } from './mp-slideshow/mp-slideshow-item.directive';
import { MpHeaderNavigationComponent } from './mp-menu-header/mp-header-navigation/mp-header-navigation.component';
import { MpLoginDialogComponent } from './mp-login-dialog/mp-login-dialog.component';
import { MpImgGalleryComponent } from './mp-img-gallery/mp-img-gallery.component';
import { MpPinchZoomDirective } from './directives/mp-pinch-zoom.directive';
import { MpWysiwygComponent } from './mp-wysiwyg/mp-wysiwyg.component';
import { MpFroalaFireUploadEditorComponent } from './firebase-admin/mp-froala-fire-upload-editor/mp-froala-fire-upload-editor.component';


const MpComponents = [
  MpHomeComponent, MpMenuHeaderComponent,// MpRouterContentComponent, 
  MpModalDialogComponent, MpAdminEditComponent, MpAdminComponentWrapperComponent, 
  MpSlideshowComponent, MpParallaxItemComponent,
  MpScrollViewTopImageComponent, MpHeaderNavigationComponent, MpImgGalleryComponent
]

@NgModule({
  declarations: [
    MpComponents,
    MpSlideshowItemDirective,
    MpLoginDialogComponent,
    MpPinchZoomDirective,
    MpWysiwygComponent,
    MpFroalaFireUploadEditorComponent,
  ],
  imports: [
    CommonModule,
    MpMaterialModule,
    //AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers : [
    ScreenPropertiesService, MpModalDialogService, MpAdminComponentService
  ],
  exports : [
    MpComponents, MpSlideshowItemDirective
  ]
})
export class MpComponentsModule { }
