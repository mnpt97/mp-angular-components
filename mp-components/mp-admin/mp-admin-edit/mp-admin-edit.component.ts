import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MpAdminComponentService} from '../mp-admin-component.service';
import { ScreenPropertiesService } from '../../mp-services/screen-properties.service';
import { TextTemplateTypes } from '../mp-admin-component.service'

@Component({
  selector: 'mp-admin-edit',
  templateUrl: './mp-admin-edit.component.html',
  styleUrls: ['./mp-admin-edit.component.scss']
})
export class MpAdminEditComponent implements OnInit {
  textTemplates : TextTemplateTypes[];

  @ViewChild('editContent') editContent : ElementRef;
  
  constructor(
    private editService : MpAdminComponentService,
    private screenProps : ScreenPropertiesService
    ) { 

  }

  actTemplate : string = 'Templates'


  selectTemplate(temp){
    this.actTemplate = temp.displayName
    this.editContent.nativeElement.focus()
    let doc = this.editContent.nativeElement
    let header1 = `<h1 style = "font-size: 3em; font-weight: bold"></h1>`
    //document.execCommand('insertHTML', false, header1)  
    document.execCommand('styleWithCSS', true, 'false')
    document.execCommand('foreColor', true, '#3030ff')
    document.execCommand('fontSize', true, '7')

    console.log(temp);
    
  }

  setFontStyle(type){
    
    /*if($event.target.classList.contains('active')){
      $event.target.classList.remove('active')
    }else if(!$event.target.classList.contains('active')){
      $event.target.classList.add('active')
    
    }*/
    console.log(type);
    
    this.editContent.nativeElement.focus()
    switch (type) {
      case 'bold':
          document.execCommand('bold')
        break;
      case 'italic':
        document.execCommand('italic')
        break;
      case 'underline':
        document.execCommand('underline')
        break;
      case 'link':
        let linkURL = prompt('Enter a URL:', 'https://');
        document.execCommand('createlink', true, linkURL);
        break;
      case 'list_bulleted':
        document.execCommand("insertunorderedlist", false, null)

        break;

      default:
        break;
    }
    
  }

  getBase64(file : File) {
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
 
  handleImageUpload(file : File){
    console.log(file);
    this.getBase64(file).then(data =>{
      console.log(data);
      this.editContent.nativeElement.focus()
      let imgDom = '<img src="'+ data + '" style = "width: 400px"/>'
      let ht = '<p>Cool</p>'
      console.log(imgDom);
      
      document.execCommand("insertHtml", true, imgDom);
      
    })
    
  }

  ngOnInit(): void {

    this.textTemplates = this.editService.getTextTemplates();
    


  }

  saveEditContent(){
    console.log(this.editContent);
    
    console.log(this.editContent.nativeElement.innerHTML);
    
  }


}
