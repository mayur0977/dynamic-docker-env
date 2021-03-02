import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigModel } from './config.model';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configSubject$ = new ReplaySubject<ConfigModel>(1);
  config$ = this.configSubject$.asObservable();
  configSnapshot: ConfigModel;

  constructor(public http: HttpClient) {}

  loadConfig() {
    let url ='./assets/config.json';
    let azueeFileUrl= "https://quaerisusermgmt.blob.core.windows.net/environment-files/environment.json?sp=r&st=2021-02-23T07:15:05Z&se=2021-03-31T15:15:05Z&sv=2020-02-10&sr=b&sig=1yD3MGcjHCovUz8hbEtfXn1ztEO3sdJie5AEvC8yYkY%3D";

    return this.http.get<ConfigModel>(azueeFileUrl).pipe(
      map((config) => {
        console.log("config",config);
        
        this.configSnapshot = config;
        this.configSubject$.next(config);
      })
    );
  }

}