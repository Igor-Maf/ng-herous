import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './in-memory-data.service';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

// decorator that attach Metadata To Class. Hasn't `export` because other components don't need to import the root module
@NgModule({
  // the view classes that Belong To This Module. Three kinds of view classes: Components, Directives, Pipes
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],

  // modules whose exported classes are needed by component templates declared in This Module
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    /* The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses.
    Remove it when a real server is ready to receive requests. */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],

  // creators of services that this module contributes to the Global Collection of Services (they become accessible in all parts of the app)
  providers: [HeroService, MessageService],

  // the main application view, called the Root Component, that hosts all other app views. Only the Root Module Should Set this Bootstrap property.
  bootstrap: [AppComponent]
})
export class AppModule { }
