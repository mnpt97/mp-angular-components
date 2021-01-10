import { Component, OnInit, ElementRef, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MpModalDialogComponent } from '../mp-modal-dialog/mp-modal-dialog.component';
import { MpModalDialogService } from '../mp-modal-dialog/mp-modal-dialog.service';

@Component({
  selector: 'app-mp-home',
  templateUrl: './mp-home.component.html',
  styleUrls: ['./mp-home.component.scss']
})
export class MpHomeComponent implements OnInit {

  @ViewChildren(MpModalDialogComponent) modals : QueryList<MpModalDialogComponent>;
  
  constructor(
    private modalService : MpModalDialogService
  ) {
    
   }

  ngOnInit(): void {
  }
  openModal(id : string){
    this.modalService.open(id)
    
    
    
  }

}
