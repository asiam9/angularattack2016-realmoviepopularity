import { Component } from '@angular/core';
import { RMPAutocomplete } from '../../components/autocomplete/index'

@Component({
  styleUrls: ['../app/containers/home/home.css'],
  selector: 'rmp-home',
  template: `
    <div class="page-container">
      <i class="material-icons search-icon logo">theaters</i>
      <div class="autocomplete-container">
        <rmp-autocomplete></rmp-autocomplete>
      </div>
    </div>
  `,
  directives: [RMPAutocomplete]
})
export class RMPHome {

  constructor() {
    setTimeout(() => {
      window['componentHandler'].upgradeAllRegistered();
    }, 50);
  }

}
