import { Component } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { RMPHome } from './home';

@Component({
    selector: 'rmp-app',
    template: `<router-outlet></router-outlet>`,
    directives: [RouterOutlet]
})
@RouteConfig([
  {path: '/', name: 'Home', component: RMPHome, useAsDefault: true}
])
export class AppComponent {

}
