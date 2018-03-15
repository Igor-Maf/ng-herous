import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

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
import { ProfileComponent } from './profile/profile.component';

// decorator that attach Metadata To Class. Hasn't `export` because other components don't need to import the root module
@NgModule({
  // the view classes that Belong To This Module. Three kinds of view classes: Components, Directives, Pipes
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    ProfileComponent
  ],

  // modules whose exported classes are needed by component templates declared in This Module
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    /* The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses.
    Remove it when a real server is ready to receive requests. */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],

  // creators of services that this module contributes to the Global Collection of Services (they become accessible in all parts of the app)
  providers: [HeroService, MessageService],

  // the main application view, called the Root Component, hosts all other app views. Only Root Module Should Set this Bootstrap property.
  bootstrap: [AppComponent]
})
export class AppModule { }
