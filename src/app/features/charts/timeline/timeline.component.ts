import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { Earthquake } from '../../../core/models/earhquake.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true, 
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnChanges{

  @Input()earthquakes:Earthquake[]=[]
  
  series:number[]=[]
  chartOptions: any

  ngOnChanges(){

    if(!this.earthquakes || this.earthquakes.length ===0) return

    const data =  this.earthquakes.map(eq=>({
      x:new Date(eq.time),
      y:eq.magnitude
    }))
    console.log(this.earthquakes)

    this.chartOptions = {
      series:[
        {
          name:'Earthquake Magnitude',
          data:data
        }
      ],
      chart:{
        type:'scatter',
        height:350,
        zoom:{
          enabled:true
        }
      },
      xaxis:{
        type:'datetime',
        title:{
          text:'Time'
        }
      },
      yaxis:{
        title:{
          text:'Magnitude'
        }
      },
      tooltip:{
        x:{
          format:'dd MMM HH:mm'
        }
      }
    }
    
  }


}
