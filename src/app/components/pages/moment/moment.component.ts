import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moments';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;

  constructor(
    private momenteService: MomentService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.momenteService
      .getMoment(id)
      .subscribe((res) => (this.moment = res.data));
  }
}
