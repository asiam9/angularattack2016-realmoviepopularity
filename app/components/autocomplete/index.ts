import { Component } from '@angular/core';

@Component({
  styleUrls: ['./app/components/autocomplete/autocomplete.css'],
  selector: 'rmp-autocomplete',
  template: `
    <div class="autocomplete">
      <form class="mdl-textfield mdl-js-textfield mdl-textfield--full-width">
        <input class="mdl-textfield__input" type="text" id="autocomplete" autocomplete="off">
        <label class="mdl-textfield__label" for="autocomplete">Search...</label>
        <i class="material-icons search-icon">search</i>
      </form>
      <ul class="autocomplete-results">
      </ul>
    </div>
  `
})
export class RMPAutocomplete {

}
