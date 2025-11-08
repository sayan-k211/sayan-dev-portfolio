import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  getProfile() {
    return this.http
      .get<{ success: boolean; data: any }>(`${this.base}/portfolio/profile`)
      .pipe(map(r => r.data));
  }

  getSkills() {
    return this.http
      .get<{ success: boolean; data: any }>(`${this.base}/portfolio/skills`)
      .pipe(map(r => r.data));
  }

  getProjects() {
    return this.http
      .get<{ success: boolean; data: any[] }>(`${this.base}/portfolio/projects`)
      .pipe(map(r => r.data));
  }

  getMedia() {
    return this.http
      .get<{ success: boolean; data: any }>(`${this.base}/portfolio/media`)
      .pipe(map(r => r.data));
  }
}
