import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../mp-interfaces/mp-global-interfaces';

@Component({
  selector: 'mp-header-navigation',
  templateUrl: './mp-header-navigation.component.html',
  styleUrls: ['./mp-header-navigation.component.scss'],
  animations: [
    trigger('linkExpansionIcon', [
        state('expandLeft', style({
          'transform': 'rotate(45deg)',
          'top' : '25%'
        })),
        state('expandRight', style({
          'transform': 'rotate(-45deg)',
          'top' : '25%'
        })),
        state('notExpand', style({

        })),
        transition('expandLeft <=> notExpand, expandRight <=> notExpand', animate('0.25s'))
      ]),trigger('linkExpansionBody', [
        state('expand', style({
          'max-height' : '500px',
        })),
        state('notExpand', style({
          'max-height' : '0px',
          
        })),
        transition('notExpand => expand', animate('400ms ease-in')),
        transition('expand => notExpand', animate('400ms ease-out'))
      ]
    ),
    trigger('showHeader', [
      state('hide', style({
        'transform' : 'translateY(-100%'
      })),
      state('show', style({
        'transform' : 'translateY(0)'
      })), 
      transition('hide<=>show', animate('250ms'))
    ])

  ],
})
export class MpHeaderNavigationComponent implements OnInit {

  @Input() navItems : NavigationItem[]
  @Input() screenTypeClass : 'type-touch' | 'type-mouse';
  @Input() screenSizeClass : 'large-screen' | 'small-screen'

  @Output() closeMenu : EventEmitter<boolean> = new EventEmitter()
  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    
  }

  public getActiveNav(path : string) : ' active-nav' | ''{
    
    if('/' + path === this.router.url){
      return ' active-nav'
    }else {
      return ''
    }
  }

  public itemClicked(){
    console.log('emit true');
    
    this.closeMenu.emit(true)
  }

}
