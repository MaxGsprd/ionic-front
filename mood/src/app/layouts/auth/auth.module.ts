import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { AuthRoutingModule } from './auth.routing.module';
//import { InscriptionComponent } from './inscription/Inscription.component';

@NgModule({
    declarations: [
        LoginComponent,
        ProfileComponent,
        //InscriptionComponent,
    ],
    imports: [  
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthRoutingModule,

      ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ],
    bootstrap : [AppComponent]
  })
export class AuthModule {
}