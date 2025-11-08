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

  private toAbs(rel?: string): string {
    if (!rel) return '';
    if (/^https?:\/\//i.test(rel)) return rel;     
    const clean = rel.replace(/^\/+/, '');           
    const base  = this.assetBase.replace(/\/+$/, ''); 
    return `${base}/${clean}`;                       
  }

  private loadProjects() {
    const url = `${environment.apiBase}/portfolio/projects`;
    console.log('[Projects] fetching:', url);

    this.http
      .get<{ success: boolean; data: Project[] }>(url)
      .subscribe({
        next: ({ data }) => {
          const items = (data ?? []).map(p => ({
            ...p,
            imageAbsUrl: this.toAbs(p.imageUrl)
          }));
          console.log('[Projects] received', items.length, items);
          this.projects.set(items);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('[Projects] fetch error:', err);
          this.error.set('Failed to load projects');
          this.projects.set([]);
          this.loading.set(false);
        }
      });
  }

  getImg(p: Project): string {
    return p.imageAbsUrl || this.toAbs(p.imageUrl);
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
