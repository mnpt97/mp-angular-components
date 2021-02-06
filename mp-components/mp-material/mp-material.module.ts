import { NgModule } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

const MaterialComponents = [
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatMenuModule,
  MatButtonModule,
  MatButtonToggleModule,
]


@NgModule({
  imports: [
    MaterialComponents
  ], 
  exports : [
    MaterialComponents
  ]
})
export class MpMaterialModule { 

}
