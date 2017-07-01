import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IProject } from '../../shared/models/iproject';
import { GraphService } from '../../shared/models/graph/graph.service';
import { IGraph } from '../../shared/models/graph/igraph';

@Component({
  selector: 'app-footprint',
  templateUrl: './footprint.component.html',
  styleUrls: ['./footprint.component.scss']
})
export class FootprintComponent implements OnInit, OnDestroy {
  projects: Array<IProject>;
  subscription: Subscription;
  graphsData: Observable<any>;
  graphs: {
    waste: IGraph
  };
  constructor(graphService: GraphService) {
    this.graphsData = graphService.getGraphs({
      birthdays: [1980]
    });
    this.projects = [
      {
        title: 'Переработка Тетрапак на бумфабрике в Боровичах',
        description: [
          '<strong>50 тонн/месяц</strong> <br/>уже перерабатывается',
          '<strong>6 рублей/кг</strong> <br/>стоит переработка упаковки Тетрапак'
        ],
        image: './assets/img/pack_borov.jpg'
      }, {
        title: 'Раздельный сбор пластика в Москве и МО',
        description: [
          '<strong>24 тонны</strong> <br/>уже собрано и переработано',
          '<strong>12 тыс рублей</strong> <br/>стоимость 1 контейнера <br/>Каждый контейнер собирает 600 кг в год'
        ],
        image: './assets/img/chistoe_delo.jpg'
      }
    ];
  }

  ngOnInit() {
    this.subscription = this.graphsData.subscribe(data => {
      this.graphs = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
