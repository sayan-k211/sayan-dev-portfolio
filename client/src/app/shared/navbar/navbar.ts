import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  @Input() active: string | null = null;
  @Output() nav = new EventEmitter<string>();
  ids = ['home', 'about', 'skills', 'projects', 'youtube', 'contact'];
  assetBase = environment.assetBase || 'http://localhost:8080';
  scrolled = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrolled = window.scrollY > 16;
  }

  go(id: string, e: Event) {
    e.preventDefault();
    this.nav.emit(id);
  }
}
