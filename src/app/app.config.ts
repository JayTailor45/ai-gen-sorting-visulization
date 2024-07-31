import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {SortingService} from "./sorting.service";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), SortingService]
};
