import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'awd-post-section',
  templateUrl: 'post-section.component.html',
  styleUrls: ['./post-section.component.styl'],
})

export class PostSectionComponent implements OnInit{

  title: string = '';
  link: string = '';
  postSize: string = '';
  arr: string[] = [];

  constructor(){}

  ngOnInit() :void{
    this.postSize = 'sm'; // postSize should be one type from sm, md and lg
    this.arr = ['Mongo', 'Express', 'Angular', 'NodeJS'];
  }

}
