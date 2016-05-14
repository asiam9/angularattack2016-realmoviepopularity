import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AppComponent } from './containers/app';

enableProdMode();

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);
