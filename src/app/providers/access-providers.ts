import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/timeout' ;
@Injectable()
export class AccessProviders{

    //url behind api json php
    server : string = 'http://localhost/Ionic/register/php/';

    constructor(public http:HttpClient){}

    postData(body,file){
        let headers =new HttpHeaders({
            'Content-Type':'application/json; charset=UTF-8'
        });
        let options = {
            headers : headers,
        }

        return this.http.post(this.server + file,JSON.stringify(body),options).timeout(60000)//60 sec
        .map(res => res) ;

    }


}