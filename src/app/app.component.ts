import { Component} from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { AppInsightsService } from './services/app-insights.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

 
  title = 'loginApi';
  constructor (private cookieService: CookieService,  private appInsightsService: AppInsightsService) {
    appInsightsService.logPageView();
    appInsightsService.logEvent('LogEvent');
    appInsightsService.logMetric('TestMetrica',2);    
  }
}
