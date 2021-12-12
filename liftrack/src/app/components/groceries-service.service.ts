import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroceriesServiceService {
  constructor(public httpClient: HttpClient) {
    console.log('Hello GroceriesService');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  items: any = [];
  weights: any = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = 'http://localhost:8080';

  getItems(): Observable<any> {
    return this.httpClient
      .get(this.baseURL + '/api/lifts')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getWeights(): Observable<any> {
    return this.httpClient
      .get(this.baseURL + '/api/weights')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  // remove items
  removeItem(item) {
    console.log('Remove Item - id = ', item._id);
    this.httpClient
      .delete(this.baseURL + '/api/lifts/' + item._id)
      .subscribe((res) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }

  removeWeight(weight) {
    console.log('Remove Weight - id = ', weight._id);
    this.httpClient
      .delete(this.baseURL + '/api/weights/' + weight._id)
      .subscribe((res) => {
        this.weights = res;
        this.dataChangeSubject.next(true);
      });
  }

  editItem(item, id) {
    console.log('updating item ', item._id);
    this.httpClient
      .put(this.baseURL + '/api/lifts/' + item._id, item)
      .subscribe((res) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }

  addItem(item) {
    this.httpClient
      .post(this.baseURL + '/api/lifts/', item)
      .subscribe((res) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }

  addWeight(weight) {
    this.httpClient
      .post(this.baseURL + '/api/weights/', weight)
      .subscribe((res) => {
        this.weights = res;
        this.dataChangeSubject.next(true);
      });
  }
}
