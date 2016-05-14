import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { RMPAutocomplete } from '../../components/autocomplete/index';

@Component({
  styleUrls: ['../app/containers/stats/stats.css'],
  selector: 'rmp-stats',
  template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title autocomplete-container">
            <rmp-autocomplete [movie]="movie"></rmp-autocomplete>
          </span>
        </div>

        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a href="#scroll-tab-1" class="mdl-layout__tab">Info</a>
          <a href="#scroll-tab-2" class="mdl-layout__tab is-active">Map</a>
          <a href="#scroll-tab-3" class="mdl-layout__tab">Peers</a>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Menu</span>
      </div>
      <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel" id="scroll-tab-1">
          <div class="page-content">Info</div>
        </section>
        <section class="mdl-layout__tab-panel is-active" id="scroll-tab-2">
          <div class="page-content">Map</div>
        </section>
        <section class="mdl-layout__tab-panel" id="scroll-tab-3">
          <div class="page-content">Stats</div>
        </section>
      </main>
    </div>
  `,
  directives: [RMPAutocomplete]
})
export class RMPStats {

  movie: Object;

  constructor(private _routeParams: RouteParams) {
    setTimeout(() => {
      window['componentHandler'].upgradeAllRegistered();
    }, 50);

    this.movie = {
      Title: decodeURI(this._routeParams.get('title')),
      Year: parseInt(this._routeParams.get('year')) || undefined
    };
  }
}
