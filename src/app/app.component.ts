import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardComponent } from "./layout/dashboard/dashboard.component";


@Component({
  selector: 'app-root',
  standalone:true, 
  imports: [RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})

export class AppComponent {
  constructor(private toastr: ToastrService){}
  title = 'earthquake-info';
  testToast(){
    this.toastr.success('Listo para inicar')
  }
}
