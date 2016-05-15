import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Http } from '@angular/http';
import { RMPAutocomplete } from '../../components/autocomplete/index';

@Component({
  styles: [require('./stats.css')],
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
          <div class="page-content info-container">
            <h3 class="movie-title">{{ movieInfo.Title }}</h3>
            <h6 class="movie-year">{{ movieInfo.Year }}</h6>
            <div class="clearfix"></div>
            <hr>
            <div class="mdl-grid">
              <div class="mdl-cell mdl-cell--2-col">
                <img [src]="posterUrl" class="movie-poster" />
              </div>
              <div class="mdl-cell mdl-cell--4-col">
                <dl>
                  <dt>Genre</dt>
                  <dd>{{ movieInfo.Genre }}</dd>
                  <dt>Director</dt>
                  <dd>{{ movieInfo.Director }}</dd>
                  <dt>Writer</dt>
                  <dd>{{ movieInfo.Writer }}</dd>
                  <dt>Actors</dt>
                  <dd>{{ movieInfo.Actors }}</dd>
                  <dt>Released</dt>
                  <dd>{{ movieInfo.Released }}</dd>
                  <dt>Runtime</dt>
                  <dd>{{ movieInfo.Runtime }}</dd>
                </dl>
              </div>
              <div class="mdl-cell mdl-cell--6-col">
                <dl>
                  <dt>Plot</dt>
                  <dd>{{ movieInfo.Plot }}</dd>
                  <dt>Awards</dt>
                  <dd>{{ movieInfo.Awards }}</dd>
                  <dt>Metascore</dt>
                  <dd>{{ movieInfo.Metascore }}</dd>
                  <dt>IMDB</dt>
                  <dd>{{ movieInfo.imdbRating }} <span class="hint">({{ movieInfo.imdbVotes }})</span></dd>
                </dl>
              </div>
            </div>
          </div>
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
  movieInfo: Object = {};
  posterUrl: string = '';

  private _serverUrl: string = 'https://limitless-journey-76225.herokuapp.com/api/image';

  constructor(private _routeParams: RouteParams,
              private _http: Http) {

    setTimeout(() => {
      window['componentHandler'].upgradeAllRegistered();
    }, 50);

    this.movie = {
      Title: decodeURI(this._routeParams.get('title')),
      Year: parseInt(this._routeParams.get('year')) || undefined
    };

    let title: string = this.movie['Title'],
        year: number = this.movie['Year'];

    // get full movie info
    this._http.get(`https://www.omdbapi.com/?t=${title}&y=${year}&plot=full&r=json`)
      .map(res => res.json())
      .subscribe(res => {
        this.movieInfo = res;
        this.posterUrl = this._serverUrl + '?url=' + this.movieInfo['Poster'];
      });
  }
}
