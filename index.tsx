
import '@angular/compiler';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './src/app.component';
import { provideHttpClient } from '@angular/common/http'; // For Gemini API calls

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideProtractorTestingSupport(), // Potentially needed for Applet environment
    provideHttpClient(), // Provide HttpClient for Gemini API
  ],
}).catch((err) => console.error(err));
    

// AI Studio always uses an `index.tsx` file for all project types.
