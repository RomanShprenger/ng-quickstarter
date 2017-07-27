import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'awd-post',
  templateUrl: 'post.component.html',
  styleUrls: ['./post.component.styl'],
  host: { '[class]': 'postSize' }
})

export class PostComponent implements OnInit{

  @Input() postSize: string = '';
  @Input() text: string = '';
  postLink: string = '';
  categoryLink: string = '';

  constructor(){}

  ngOnInit() :void{
    this.postLink = 'https://github.com//RomanShprenger';
  }
}
