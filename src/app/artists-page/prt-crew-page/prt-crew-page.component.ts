import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artists-prt-crew',
  templateUrl: './prt-crew-page.component.html',
  styleUrls: ['./prt-crew-page.component.scss'],
})
export class PRTCrewPageComponent implements OnInit{
  currentProject: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentProject = parseInt(this.route.snapshot.paramMap.get('project'), 10);
  }
}
