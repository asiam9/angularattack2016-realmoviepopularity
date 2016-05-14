import { Component, NgZone } from '@angular/core';
import { RMPAutocomplete } from '../components/autocomplete/index'

@Component({
  styleUrls: ['../app/containers/home.css'],
  selector: 'rmp-home',
  template: `
    <div class="page-container">
      <rmp-autocomplete></rmp-autocomplete>
    </div>
  `,
  directives: [RMPAutocomplete]
})
export class RMPHome {

  constructor(private _zone: NgZone) {
    setTimeout(() => {
      this._zone.run(() => undefined);
      window['componentHandler'].upgradeAllRegistered();
    }, 50);
  }

}
