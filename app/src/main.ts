import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideHttpClient(), ...(appConfig.providers || [])] // ✅ Add HttpClient provider
}).catch((err) => console.error(err));
