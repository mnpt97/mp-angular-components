import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mp-login-dialog',
  templateUrl: './mp-login-dialog.component.html',
  styleUrls: ['./mp-login-dialog.component.scss']
})
export class MpLoginDialogComponent implements OnInit {

  @Input() buttonLabels : {
    login ? : string, 
    toRegister ? : string, 
    backToLogin ? : string,
    register ? : string
  } = {
    login : "Login", 
    toRegister : "Registrieren", 
    backToLogin : "Zurück",
    register : "Registrieren"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
