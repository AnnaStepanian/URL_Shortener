import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {UrlShortenerService} from "./services/UrlShortenerService";
import {selectError, selectUrls, shortenUrlFailure, shortenUrlSuccess} from "./reducer/url-shortener.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  url: string = '';
  shortUrls$: Observable<string[]>;
  error$: Observable<any>;

  constructor(private store: Store<{ urlShortener: { urls: string[], error: any } }>, private urlShortenerService: UrlShortenerService) {
    this.shortUrls$ = this.store.select(selectUrls);
    this.error$ = this.store.select(selectError);
  }

  shortenURL(url: string) {
    this.urlShortenerService.shortenUrl(url).subscribe(
      response => {
        console.log("response", response);
        const shortUrls = [response.result.full_short_link, response.result.full_short_link2];
        this.store.dispatch(shortenUrlSuccess( shortUrls ));
      },
      error => {
        this.store.dispatch(shortenUrlFailure({ error }));
      }
    );
  }
  reset() {
    this.url = '';
    this.store.dispatch(shortenUrlSuccess([]));
    this.store.dispatch(shortenUrlFailure(null));
  }

}
