import { Component } from '@angular/core';
import { RMPAutocomplete } from '../../components/autocomplete/index';
import { RMPHint } from '../../components/hint/index';

@Component({
  styles: [require('./home.css')],
  selector: 'rmp-home',
  template: `
    <div class="page-container">
      <h1>Real Movie Popularity</h1>
      <i class="material-icons logo">theaters</i>
      <div class="autocomplete-container">
        <rmp-autocomplete></rmp-autocomplete>
        <rmp-hint></rmp-hint>
      </div>
    </div>
  `,
  directives: [RMPAutocomplete, RMPHint]
})
export class RMPHome {

  constructor() {
    setTimeout(() => {
      window['componentHandler'].upgradeAllRegistered();
    }, 50);
  }

}
