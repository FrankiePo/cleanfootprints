import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GraphWasteType, GraphWasteTypeDefs } from './graph-waste-type.enum';
import { IGraph } from './igraph';
import { IGraphRequest } from './igraph-request';

@Injectable()
export class GraphService {
  private graphUrl = environment.apiUrl + 'calculator';
  private requestOptions = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }),
    withCredentials: true,
  });
  constructor(private http: Http) { }

  getGraphs(req: IGraphRequest): Observable<IGraph> {
    const { birthdays = [1980], privateRecycling = [] } = req;
    // TODO: there is probably a better way
    const private_recycling = privateRecycling.map(
      ({fromYear, type, amountPerMonth}) => ({
        from_year: fromYear,
        type: type,
        amount_per_month: amountPerMonth,
      }));
    const body = JSON.stringify({ birthdays, private_recycling });
    return this.http.post(`${this.graphUrl}/calculate/`, body, this.requestOptions)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err));
  }

  setGraphData(req: IGraphRequest): Observable<IGraph> {
    // Should be authenticated
    return this.getGraphs(req);
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
