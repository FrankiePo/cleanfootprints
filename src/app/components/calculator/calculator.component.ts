import { Component, OnInit } from '@angular/core';
import { IProject } from '../../shared/models/iproject';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  wasteGraphData: Array<any>;
  wasteGraphLabels: Array<any>;
  projects: Array<IProject>;
  constructor() {
    const rawData = {
      plastic: {
        1985: 0,
        1990: 500,
        1995: 1500,
        2000: 3000,
        2005: 5000,
        2010: 7000,
        2015: 9500,
        2020: 12000,
        2025: 15000,
        2030: 18500,
        2035: 22000,
        2040: 26000
      },
      paper: {
        1985: 0,
        1990: 600,
        1995: 1800,
        2000: 3600,
        2005: 6000,
        2010: 8400,
        2015: 11400,
        2020: 14400,
        2025: 18000,
        2030: 22200,
        2035: 26400,
        2040: 31200
      },
      glass: {
        1985: 0,
        1990: 150,
        1995: 450,
        2000: 900,
        2005: 1500,
        2010: 2100,
        2015: 2850,
        2020: 3600,
        2025: 4500,
        2030: 5550,
        2035: 6600,
        2040: 7800
      },
      metal: {
        1985: 0,
        1990: 50,
        1995: 150,
        2000: 300,
        2005: 500,
        2010: 700,
        2015: 950,
        2020: 1200,
        2025: 1500,
        2030: 1850,
        2035: 2200,
        2040: 2600
      },
      textile: {
        1985: 0,
        1990: 250,
        1995: 750,
        2000: 1500,
        2005: 2500,
        2010: 3500,
        2015: 4750,
        2020: 6000,
        2025: 7500,
        2030: 9250,
        2035: 11000,
        2040: 13000
      },
      food_debris: {
        1985: 0,
        1990: 1000,
        1995: 3000,
        2000: 6000,
        2005: 10000,
        2010: 14000,
        2015: 19000,
        2020: 24000,
        2025: 30000,
        2030: 37000,
        2035: 44000,
        2040: 52000
      },
      sum: {
        1985: 0,
        1990: 2550,
        1995: 7650,
        2000: 15300,
        2005: 25500,
        2010: 35700,
        2015: 48450,
        2020: 61200,
        2025: 76500,
        2030: 94350,
        2035: 112200,
        2040: 132600
      }
    };
    const wasteTypes = {
      plastic: 'Пластик',
      paper: 'Макулатура',
      glass: 'Стекло',
      metal: 'Металл',
      textile: 'Текстиль',
      food_debris: 'Пищевые отходы',
      sum: 'Итого'
    };
    this.wasteGraphData = Object.keys(rawData).map(key => {
      return {
        data: Object.keys(rawData[key]).map(k => rawData[key][k]),
        label: wasteTypes[key]
      };
    });
    this.wasteGraphLabels = Object.keys(rawData.plastic);

    this.projects = [
      {
        title: 'Переработка Тетрапак на бумфабрике в Боровичах',
        description: [
          '50 тонн/месяц <br/>уже перерабатывается',
          '6 рублей/кг <br/>стоит переработка упаковки Тетрапак'
        ],
        image: './assets/img/pack_borov.jpg'
      }, {
        title: 'Раздельный сбор пластика в Москве и МО',
        description: [
          '24 тонны <br/>уже собрано и переработано',
          '12 тыс рублей <br/>стоимость 1 контейнера <br/>Каждый контейнер собирает 600 кг в год'
        ],
        image: './assets/img/pack_borov.jpg'
      }
    ];
  }

  ngOnInit() {
  }

}
