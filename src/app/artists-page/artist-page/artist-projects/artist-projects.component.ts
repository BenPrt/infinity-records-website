import { Component, Input, AfterViewInit, AfterContentChecked } from '@angular/core';
import { ArtistInformations, ProjectInformations } from 'src/app/models/artists-info';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

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
          fontWeight: 'bold',
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
export class ArtistProjectsComponent implements AfterContentChecked {
  @Input() artist: ArtistInformations;
  @Input() isMobile: boolean;
  @Input() currentProjectId: number;
  currentProject: ProjectInformations;

  constructor() {}

  ngAfterContentChecked(): void {
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
    this.currentProject = projectsList.find((project: ProjectInformations) => {
      return (projectsList.indexOf(project) + 1) === this.currentProjectId;
    });
  }

  isCurrentProject(projectId: number): boolean {
    return this.currentProjectId === projectId + 1;
  }

  goToProject(projectId: number): void {
    this.currentProjectId = projectId + 1;
    this.initCurrentProject();
  }
}
