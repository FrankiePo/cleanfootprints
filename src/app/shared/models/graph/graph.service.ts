import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GraphWasteType, GraphWasteTypeDefs } from './graph-waste-type.enum';
import { IGraph } from './igraph';

@Injectable()
export class GraphService {
  private graphUrl = environment.apiUrl + 'calculator/calculator';
  constructor(private http: Http) { }
  getGraphs({ birthdays = [1980] }: {birthdays: number[]}): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    birthdays
      .forEach((year, index) => params.set(`birthdays[${index}]`, year.toString()));
    return this.http.get(this.graphUrl, { search: params })
      .map(this.extractData.bind(this))
      .catch(this.handleError.bind(this));
  }
  private extractData(res: Response) {
    const body = res.json();
    const graphs = {
      waste: this.getWasteGraph(body),
    };
    console.log('-----body: ', body);
    return graphs || { };
  }
  private getWasteGraph(body): IGraph {
    const datasets = Object
      .keys(body.sum_charts)
      .map(key => ({
        label: GraphWasteTypeDefs[key],
        data: Object
          .keys(body.sum_charts[key])
          .map(k => ({x: +k, y: Math.floor(body.sum_charts[key][k])}))
          .filter((item, index) => !(index % 5)),
      }));
    const labels = Object
      .keys(body.sum_charts[GraphWasteType.PLASTIC])
      .filter((item, index) => !(index % 5));
    // TODO: sum
    const options = {
      title: {
        display: true,
        text: 'Суммарная масса попавших на свалку отходов (кг)'
      },
      elements: {
        line: {
          fill: false,
        }
      },
      legend: {
        position: 'bottom',
      }
    };
    return { datasets, labels, options };
  }
  private serialize() {

  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
