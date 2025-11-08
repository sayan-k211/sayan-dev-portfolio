import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface FeaturedVideo {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  featured: boolean;
}

interface MediaData {
  platform: string;
  channelName: string;
  channelUrl?: string;
  statistics: {
    subscribers: number;
    totalViews: number;
  };
  featuredVideos: FeaturedVideo[];
}

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube.html',
  styleUrls: ['./youtube.scss']
})
export class YoutubeComponent {
  private http = inject(HttpClient);
  
  readonly assetBase = environment.assetBase;

  youtubeData = signal<MediaData | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadYouTubeData();
  }

  private loadYouTubeData() {
    this.http
      .get<{ success: boolean; data: MediaData }>(`${environment.apiBase}/portfolio/media`)
      .subscribe({
        next: (response) => {
          console.log('✅ YouTube/Media data loaded:', response);
          this.youtubeData.set(response.data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('❌ Error fetching YouTube data:', err);
          this.error.set('Failed to load YouTube data.');
          this.loading.set(false);
        }
      });
  }

  getVideoThumbnail(video: FeaturedVideo): string {
    if (!video.thumbnailUrl) return '';
    return `${this.assetBase}${video.thumbnailUrl}`;
  }

  openVideo(video: FeaturedVideo) {
    if (video.videoId) {
      window.open(video.videoId, '_blank', 'noopener,noreferrer');
    }
  }
}