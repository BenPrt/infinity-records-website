import { Component, Input, OnInit } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'artist-clips',
  templateUrl: './artist-clips.component.html',
  styleUrls: ['./artist-clips.component.scss'],
})
export class ArtistClipsComponent implements OnInit {
  @Input() artist: ArtistInformations;
  @Input() isMobile: boolean;
  clipsList: SafeResourceUrl[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.parseClips();
  }

  parseClips(): void {
    this.artist.clips.forEach((clip: string, idx: number) => {
      if (idx < 2) {
        this.clipsList.push(this.sanitizer.bypassSecurityTrustResourceUrl(clip));
      }
    });
  }
}
