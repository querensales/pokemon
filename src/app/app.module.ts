import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CabecalhoComponent,
    PokemonItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
