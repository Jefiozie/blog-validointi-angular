import { importProvidersFrom, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { TemplateFormComponent } from './app/template-form/template-form.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        {
          path: '',
          loadComponent: () =>
            import('./app/template-form/template-form.component').then(
              (mod) => mod.TemplateFormComponent
            ),
        },
      ])
    ),
  ],
}).catch(console.error);
