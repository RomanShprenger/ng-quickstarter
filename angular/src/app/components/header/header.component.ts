import { Component } from '@angular/core';

declare var $:any;

@Component({
  selector: 'awd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.styl']
})

export class HeaderComponent {

  constructor(){}


  ngOnInit() {

  }

  navbarCollapse(event){
    if(event.target.parentElement.className == 'navbar-brand'){
      if(!$('#menu').hasClass('collapse')){
        $('#menu').toggleClass('collapse');
      }
    }
    else{
      $('#menu').toggleClass('collapse');
    }
  }
}
