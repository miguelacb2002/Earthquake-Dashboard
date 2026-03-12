import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { EarthquakeService } from '../../core/services/earthquake.service';

import { EarthquakeMapComponent } from '../../features/map/earthquake-map/earthquake-map.component';
import { PredictionComponent } from '../../features/predictions/prediction/prediction.component';
import { DonutComponent } from '../../features/charts/donut/donut.component';
import { TimelineComponent } from '../../features/charts/timeline/timeline.component';
import { FiltersComponent } from '../../features/filters/filters/filters.component';


@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    EarthquakeMapComponent,
    PredictionComponent,
    DonutComponent,
    TimelineComponent, 
    FiltersComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private earthquakeService: EarthquakeService
  ){}

  ngOnInit(){
    this.earthquakeService.getEarthquakes().subscribe(data=>console.log(data))
  }

}
