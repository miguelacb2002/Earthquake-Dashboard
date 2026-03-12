import { Component, Input, OnChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { Earthquake } from '../../../core/models/earhquake.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donut',
  standalone:true, 
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.scss'
})
export class DonutComponent implements OnChanges{

  @Input() earthquakes: Earthquake[]=[];

  series:number[]=[]
  labels:string[]=[]=['Tsunami Risk','No tsunami Risk']

  chartOptions:any

  ngOnChanges(){
    if(!this.earthquakes) return

    let tsunamiRisk = 0
    let noTsunamiRisk = 0

    this.earthquakes.forEach( eq=>{
      if(eq.tsunami ===1 ) tsunamiRisk++
      else noTsunamiRisk++
    })

    this.series = [tsunamiRisk, noTsunamiRisk]

    this.chartOptions={
      series:this.series,
      chart:{
        type:'donut',
        height:350,
      },
      labels:this.labels,
      legend:{
        position:'bottom'
      }
    }
    
  }
}
