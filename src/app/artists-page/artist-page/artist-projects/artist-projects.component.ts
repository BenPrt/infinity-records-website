import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ArtistInformations, ProjectInformations, TrackInformations } from 'src/app/models/artists-info';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ArtistsProjectsService } from 'src/app/shared/services/artists-projects.service';

@Component({
  selector: 'artist-projects',
  templateUrl: './artist-projects.component.html',
  styleUrls: ['./artist-projects.component.scss'],
  animations: [
    trigger('indicatorAnimation', [
      state(
        'true',
        style({
          opacity: '1',
          fontWeight: '600',
          borderBottom: '2px solid black',
        }),
      ),
      state(
        'false',
        style({
          opacity: '0.39',
          fontWeight: 'initial',
          borderBottom: '2px solid #F5F5F5',
        }),
      ),
      transition('true <=> false', [animate('300ms')]),
    ]),
  ],
})
export class ArtistProjectsComponent implements OnChanges {
  @Input() artist: ArtistInformations;
  @Input() isMobile: boolean;
  @Input() currentProjectId: number;
  @Input() loading: string;
  @Input() playingTrack: TrackInformations;
  @Output() onPlay = new EventEmitter<TrackInformations>();
  currentProject: ProjectInformations;

  constructor(private artistsService: ArtistsProjectsService) {}

  ngOnChanges(): void {
    this.initCurrentProject();
  }

  getArtistProjects(): ProjectInformations[] {
    return this.artist.projects.sort((a: ProjectInformations, b: ProjectInformations) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
  }

  initCurrentProject(): void {
    const projectsList: ProjectInformations[] = this.getArtistProjects();
    if (projectsList.length > 1) {
      this.currentProject = projectsList.find((project: ProjectInformations) => {
        return projectsList.indexOf(project) + 1 === this.currentProjectId;
      });
    } else {
      this.currentProject = projectsList[0];
    }
  }

  isCurrentProject(projectId: number): boolean {
    return this.currentProjectId === projectId + 1;
  }

  goToProject(projectId: number): void {
    this.artistsService.setCurrentProjectId(projectId + 1);
  }

  getSoundcloudUrl(): string {
    if (this.playingTrack) {
      return this.playingTrack.soundcloudUrl;
    }
    return this.currentProject.soundcloudUrl;
  }

  isSoundcloudAutoplay(): boolean {
    if (this.playingTrack !== undefined) {
      return true;
    }
    return false;
  }

  playTrack(track: TrackInformations): void {
    this.onPlay.emit(track);
  }

  isTrackPlaying(track: TrackInformations): boolean {
    if (this.playingTrack === track) {
      return true;
    }
    return false;
  }

  download(path: string): void {
    window.open(path, '_blank');
  }

  isNavigatorDisabled(direction: string): boolean {
    const currentProjectIdx = this.getArtistProjects().indexOf(this.currentProject);
    if (
      (direction === 'previous' && currentProjectIdx === 0) ||
      (direction === 'next' && currentProjectIdx === this.getArtistProjects().length - 1)
    ) {
      return true;
    }
    return false;
  }

  goToPreviousProject(): void {
    const currentProjectIdx = this.getArtistProjects().indexOf(this.currentProject) + 1;
    if (currentProjectIdx > 1) {
      this.artistsService.setCurrentProjectId(currentProjectIdx - 1);
    }
  }

  goToNextProject(): void {
    const currentProjectIdx = this.getArtistProjects().indexOf(this.currentProject) + 1;
    if (currentProjectIdx < this.getArtistProjects().length) {
      this.artistsService.setCurrentProjectId(currentProjectIdx + 1);
    }
  }
}
