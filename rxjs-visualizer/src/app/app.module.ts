import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { StreamService } from './stream.service';
import { LogService } from './log.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    StreamService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
