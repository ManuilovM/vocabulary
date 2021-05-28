import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TrainingComponent } from './components/training/training.component';
import { WordService } from './services/word.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomePageComponent,
    TrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
