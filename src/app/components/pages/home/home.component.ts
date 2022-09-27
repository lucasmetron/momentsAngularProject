import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moments';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseAPiUrl;

  constructor(private momentService: MomentService) {
    this.momentService.getMoments().subscribe((items) => {
      const { data } = items;
      console.log('🚀 data', data);
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-br'
        );
      });
      this.allMoments = data;
      this.moments = data;
    });
  }

  ngOnInit(): void {}
}
