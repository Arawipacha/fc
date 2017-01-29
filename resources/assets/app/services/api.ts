import {Injectable} from "@angular/core";
//importar objetos de la libreria http
import {Http, Response, RequestOptions, Headers} from "@angular/http";
//importar la clase Observable delalibreria Reactive Extensions
import {Observable} from "rxjs/Observable";


//import {User} from "./../user.class";
import {contentHeaders} from "./headers";

@Injectable()
export class Api {
  //debemos acostumbranos a que  el api no este junto a los ficheros
  protected urlBase: string = '/api/vetture';

  options = new RequestOptions({ headers: contentHeaders });
  //reclamar la dependencia sobre http
  //se registra en la raiz, pues se le supone un uso comùn a varios objetos
  constructor(protected http: Http) { }

  setUrl(url: string) {
    this.urlBase = url;
  }

  getUrl(): string {
    return this.urlBase;
  }

  register(model: any) {
    let body = JSON.stringify(model)
    //let options= new RequestOptions({headers: contentHeaders});
    return this.http
      .post(`${this.urlBase}`, body, this.options)
    //.map(this.model= new Profile();

    //   .catch(this.handleError);
    //return this.http.post(this.urlBase+'register',body,options);
  }

  getData(id?: string) {
    //let body = JSON.stringify(model)
    //let options= new RequestOptions({headers: contentHeaders});
if (id!==undefined)
  this.setUrl(this.urlBase+ '/'+ id)

    return this.http
      .get(`${this.urlBase}`)

  }



  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
