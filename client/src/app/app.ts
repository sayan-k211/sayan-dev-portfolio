import {
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

import { NavbarComponent } from './shared/navbar/navbar';
import { ContactComponent } from './pages/contact/contact';
import { ProjectsComponent } from './pages/projects/projects';
import { PortfolioService } from './services/portfolio';
import { environment } from '../environments/environment';
import { RevealDirective } from './shared/reveal.directive';
import { YoutubeComponent } from './pages/youtube/youtube';

interface SkillItem { name: string; level: number; }
interface SkillsPayload { technical: SkillItem[]; creative: SkillItem[]; }

interface ProfilePayload {
  name: string;
  tagline: string;
  bio?: string;
  profileImage?: string;
}

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'youtube', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

function isSectionId(x: string): x is SectionId {
  return SECTION_IDS.includes(x as SectionId);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    ContactComponent,
    ProjectsComponent,
    YoutubeComponent,
    RevealDirective
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private ps = inject(PortfolioService);

  readonly resumeUrl = `${environment.apiBase}/resume/download`;
  readonly youtubeChannelUrl = environment.youtubeChannelUrl;
  readonly assetBase = environment.assetBase;

  profile = toSignal<ProfilePayload | null>(this.ps.getProfile(), { initialValue: null });
  skills = toSignal<SkillsPayload | null>(this.ps.getSkills(), { initialValue: null });

  currentYear = new Date().getFullYear();
  private active = signal<SectionId>('home');

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollY = window.scrollY + 120;
    let current: SectionId = 'home';
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    }
    this.active.set(current);
  }

  activeSection() {
    return this.active();
  }

  scrollTo(id: string) {
    if (!isSectionId(id)) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.active.set(id);
  }
}
