import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'awd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['./about.component.styl']
})

export class AboutComponent implements OnInit{

  constructor(private photoService: PhotoService,){}

  countries: String[] = [];
  imgUrl: String = '';

  ngOnInit() :void{
      this.getRandomPhoto();
  }

// example of getting random photo
  getRandomPhoto(): void {
    this.photoService
        .getRandomPhoto()
        .then(body => {
            this.imgUrl = body;
        });
    }

}
