import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  styleUrls: ['./app/components/autocomplete/autocomplete.css'],
  selector: 'rmp-autocomplete',
  template: `
    <div class="autocomplete">
      <form [ngFormModel]="autocompleteForm" class="mdl-textfield mdl-js-textfield mdl-textfield--full-width">
        <input ngControl="autocomplete" class="mdl-textfield__input" type="text" id="autocomplete" autocomplete="off">
        <label class="mdl-textfield__label" for="autocomplete">Search...</label>
        <div [hidden]="!isProcessing" class="mdl-progress mdl-js-progress mdl-progress__indeterminate search-progress"></div>
        <i class="material-icons search-icon">search</i>
      </form>
      <ul class="autocomplete-results">
        <li class="autocomplete-result" *ngFor="let res of results">
          {{ res.Title }} ({{res.Year}})
        </li>
      </ul>
    </div>
  `
})
export class RMPAutocomplete {

  protected autocompleteForm: any;

  protected isProcessing: boolean;

  public results: Object[];

  constructor(private _formBuilder: FormBuilder,
              private _http: Http) {

    const API_URL: string = 'https://www.omdbapi.com/?s=';

    this.autocompleteForm = this._formBuilder.group({
      'autocomplete': ['', Validators.required]
    });

    this.autocompleteForm.controls.autocomplete.valueChanges
      .debounceTime(200)
      .do(() => this.isProcessing = true)
      .switchMap(query => this._http.get(`${API_URL}${query}`))
      .map(res => res.json())
      .map(res => res.Search)
      .do(() => this.isProcessing = false)
      .subscribe(res => this.results = res);
  }

}
