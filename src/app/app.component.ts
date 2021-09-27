import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  constructor(){}
  public slides = [
    {
      src: 'https://www.infragistics.com/angular-demos/assets/images/carousel/ignite-ui-angular-indigo-design.png'
    },
    {
      src: 'https://www.infragistics.com/angular-demos/assets/images/carousel/slider-image-chart.png'
    },
    {
      src: 'https://www.infragistics.com/angular-demos/assets/images/carousel/ignite-ui-angular-charts.png'
    }
];
}
