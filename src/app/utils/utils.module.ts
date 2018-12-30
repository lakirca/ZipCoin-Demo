import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MaterialModule} from './materials/material.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {LoginComponent} from '../components/login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BackgroundComponent } from '../components/background/background.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    BackgroundComponent,
    MenuComponent,
    ForgotPasswordComponent,
  ],
  exports: [
    LoginComponent,
    BackgroundComponent,
    MenuComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    MaterialModule,
    NgxChartsModule,
    BrowserModule,
    NgxChartsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    LoginComponent,
    BackgroundComponent,
    MenuComponent,
    ForgotPasswordComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UtilsModule {
}
