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
    return this.http.get<ConfigModel>('./assets/config.json').pipe(
      map((config) => {
        this.configSnapshot = config;
        this.configSubject$.next(config);
      })
    );
  }
}