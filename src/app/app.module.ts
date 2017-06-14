import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GenderPipe } from './gender.pipe';
import { GenrePipe } from './genre.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GenderPipe,
    GenrePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
