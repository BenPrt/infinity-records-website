import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistsProjectsService {
  constructor() {}
  currentProjectId: number;
  currentProjectIdHasChanged: EventEmitter<number> = new EventEmitter<number>();

  setCurrentProjectId(id: number): void {
    this.currentProjectId = id;
    this.currentProjectIdHasChanged.emit(this.currentProjectId);
  }

  getCurrentProjectId(): number {
    return this.currentProjectId;
  }
}
