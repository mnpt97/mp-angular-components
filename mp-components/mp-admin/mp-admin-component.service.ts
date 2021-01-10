import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MpAdminComponentService {

  textTemplates : TextTemplateTypes[] = [
    {
      displayName : 'Header 1',
      type: 'header1',
      style : {
        'font-size' : '2.5em',
        'font-weight' : 'bold'
        
      },
      insertStyle : {
        fontSize : 'xx-large',
        decoration : 'bold'
      }
      
    },
    {
      displayName : 'Header 2',
      type: 'header2',
      style : {
        'font-size' : '1.5em',
        'font-weight' : 'bold'
      },
      insertStyle : {
        fontSize : 'large',
        decoration : 'bold'
      }
    },
    {
      displayName : 'Paragraph',
      type: 'paragraph',
      style : {
        'font-size' : '1.0em'
      },
      insertStyle : {
        fontSize : 'small'
      }
    },
  ]

  // font size=1 = font-size:x-small
  // font size=2 = font-size:small
  // font size=3 = font-size:medium
  // font size=4 = font-size:large
  // font size=5 = font-size:x-large
  // font size=6 = font-size:xx-large
  
  constructor() { }


  getTextTemplates(){
    return this.textTemplates
  }

}


interface ComponentOptions{
  type : string;

}

export interface TextTemplateTypes{
  displayName : string,
  type: string; 
  style : any;
  insertStyle : any

}