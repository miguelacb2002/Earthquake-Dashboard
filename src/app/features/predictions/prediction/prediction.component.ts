import { Component } from '@angular/core';
import { EarthquakeStore } from '../../../core/state/earthquake.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediction',
  imports: [CommonModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent {

  readonly prediction$
  constructor(
    private store:EarthquakeStore
  ){
  this.prediction$=this.store.prediction$
  }


}
 