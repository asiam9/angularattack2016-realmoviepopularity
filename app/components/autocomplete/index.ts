import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  styleUrls: ['./app/components/autocomplete/autocomplete.css'],
  selector: 'rmp-autocomplete',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  template: `
    <div class="autocomplete">

      <form [ngFormModel]="autocompleteForm" class="mdl-textfield mdl-js-textfield mdl-textfield--full-width">
        <input #inputView ngControl="autocomplete" (focus)="isFocused = true" class="mdl-textfield__input" type="text" id="autocomplete" autocomplete="off">
        <label class="mdl-textfield__label" for="autocomplete">Search...</label>
        <div [hidden]="!isProcessing" class="mdl-progress mdl-js-progress mdl-progress__indeterminate search-progress"></div>
        <i class="material-icons search-icon">search</i>
      </form>

      <ul #resultsView class="autocomplete-results" [hidden]="!isFocused">
        <li class="autocomplete-result" *ngFor="let res of results">
          {{ res.Title }} ({{res.Year}})
        </li>

      </ul>
    </div>
  `
})
export class RMPAutocomplete {

  @ViewChild('inputView') private _inputView: ElementRef;
  @ViewChild('resultsView') private _resultsView: ElementRef;

  private autocompleteForm: any;

  protected isFocused: boolean = false;
  protected isProcessing: boolean = false;

  public results: Object[];

  constructor(private _formBuilder: FormBuilder,
              private _http: Http,
              private _element: ElementRef) {

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

  ngAfterViewInit() {

    // focus input when the component is loaded
    this._inputView.nativeElement.focus();
  }

  /**
   * Handles click outside, hides the results view if necessary.
   */
  handleClick(event: MouseEvent) {
    var clickedEl = <Node>event.target, inside = false;
    do {
      if (clickedEl == this._element.nativeElement) {
        inside = true;
        break;
      }
      clickedEl = clickedEl.parentNode;
    } while (clickedEl);

    this.isFocused = inside;
  }

}
