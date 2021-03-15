import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'mp-wysiwyg',
  templateUrl: './mp-wysiwyg.component.html',
  styleUrls: ['./mp-wysiwyg.component.scss']
})
export class MpWysiwygComponent implements OnInit {

  content : string;
  constructor(
    private renderer : Renderer2
  ) { }

  ngOnInit(): void {
  }

}
