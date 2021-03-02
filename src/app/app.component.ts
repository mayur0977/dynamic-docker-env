import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'env-loader';

  //private http: HttpClient,
  config$ = this.configService.config$;

  constructor(private configService: ConfigService) {
    configService.loadConfig().subscribe();
  }
  ngOnInit() {
    // this.config$.subscribe(config => console.log("APP",config));
  }
  
}
