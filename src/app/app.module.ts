import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { HostDemoComponent } from './host-demo/host-demo.component';
import { ContentViewDemoComponent } from './content-view-demo/content-view-demo.component';
import { LOGGING_TOKEN } from './logging.token';
import { ConsoleLoggingService } from './logging.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[AppComponent,CustomInputComponent,HostDemoComponent,
    ContentViewDemoComponent],
  imports:[BrowserModule,FormsModule, HttpClientModule,CommonModule, ReactiveFormsModule],
  providers:[
    { provide: LOGGING_TOKEN, useClass: ConsoleLoggingService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap:[AppComponent]
})
export class AppModule {}
