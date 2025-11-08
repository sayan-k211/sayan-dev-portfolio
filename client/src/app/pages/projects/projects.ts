import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Project {
  _id?: string;
  title: string;
  technologies: string[];
  description?: string;
  imageUrl?: string;
  imageAbsUrl?: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],       
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class ProjectsComponent {
  private http = inject(HttpClient);

  readonly assetBase = environment.assetBase;

  projects = signal<Project[]>([]);
  loading  = signal<boolean>(true);
  error    = signal<string | null>(null);

  constructor() {
    this.loadProjects();
  }

  private loadProjects() {
    // quick visibility log
    console.log('[Projects] fetching:', `${environment.apiBase}/portfolio/projects`);

    this.http
      .get<{ success: boolean; data: Project[] }>(`${environment.apiBase}/portfolio/projects`)
      .subscribe({
        next: (response) => {
          const arr = response?.data ?? [];
          console.log('[Projects] received', arr.length, arr);
          this.projects.set(arr);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('[Projects] fetch error:', err);
          this.error.set('Failed to load projects');
          this.loading.set(false);
          this.projects.set([]);
        }
      });
  }

  getImg(p: Project): string {
    if (p.imageAbsUrl) return p.imageAbsUrl;
    if (p.imageUrl)    return `${this.assetBase}${p.imageUrl}`;
    return '';
  }

  onImageError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    console.error('Image failed:', img.src);
    img.style.display = 'none';
  }

  openLink(url?: string) {
    if (!url || url === '#') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  trackByProjectId(_i: number, p: Project): string {
    return p._id || p.title;
  }
}
