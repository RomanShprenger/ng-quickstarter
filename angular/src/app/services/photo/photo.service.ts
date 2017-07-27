import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { urlAPI } from '../../shared/configAPI.class';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PhotoService {

  private url = urlAPI;

  constructor(
    private http: Http
  ){ }

  private extractData(res: Response) {
    let img = res.url;
    return img || '';
  }

  getRandomPhoto(): Promise<any>{
    let url = this.url  + '/random/600x400';
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(function(err){
        console.error('An error occurred', err.message); // for demo purposes only
        return Promise.reject(err.message || err);
      });
  }
}
