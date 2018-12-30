import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {APIModule} from './api/api.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UtilsModule} from './utils/utils.module';
import { AuthGuard } from './auth.service';
import { geoip } from './services/geoip.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { LimitsComponent } from './components/limits/limits.component';
import { HistoryComponent } from './components/history/history.component';
import { RemitComponent } from './components/remit/remit.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { StepOneComponent } from './components/kyc/step-one/step-one.component';
import { StepFourComponent } from './components/kyc/step-four/step-four.component';
import { StepThreeComponent } from './components/kyc/step-three/step-three.component';
import { StepTwoComponent } from './components/kyc/step-two/step-two.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    LimitsComponent,
    HomeComponent,
    RemitComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    SettingsComponent,
  ],
  imports: [
    APIModule,
    BrowserModule,
    BrowserAnimationsModule,
    Ng2Webstorage,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  providers: [AuthGuard, geoip],
  bootstrap: [AppComponent],
})
export class AppModule {
}
