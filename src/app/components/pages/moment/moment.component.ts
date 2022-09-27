import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moments';
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseAPiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momenteService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momenteService
      .getMoment(id)
      .subscribe((res) => (this.moment = res.data));
  }

  async removeHandler(id: number) {
    await this.momenteService.removeMoment(id).subscribe();
    this.messagesService.add('Momento excluido com sucesso!');
    this.router.navigate(['/']);
  }
}
