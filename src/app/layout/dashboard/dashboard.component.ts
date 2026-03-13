import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarthquakeStore } from '../../core/state/earthquake.store';

import { EarthquakeMapComponent } from '../../features/map/earthquake-map/earthquake-map.component';
import { PredictionComponent } from '../../features/predictions/prediction/prediction.component';
import { DonutComponent } from '../../features/charts/donut/donut.component';
import { TimelineComponent } from '../../features/charts/timeline/timeline.component';
import { FiltersComponent } from '../../features/filters/filters/filters.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    CommonModule,
    EarthquakeMapComponent,
    PredictionComponent,
    DonutComponent,
    TimelineComponent, 
    FiltersComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{

  readonly earthquakes$
  constructor(
    private store: EarthquakeStore
  ){
    this.earthquakes$=this.store.filteredEarthquakes$
  }

}
