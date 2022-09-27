import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Moment } from 'src/app/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText = 'Salvar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((res) => {
      this.moment = res.data;
    });
  }

  async editHandler(momentData: any) {
    const id = Number(this.moment.id);
    const formaData = new FormData();

    formaData.append('title', momentData.title);
    formaData.append('description', momentData.title);

    if (momentData.image) {
      formaData.append('image', momentData.image);
    }
    await this.momentService.updateMoment(id, formaData).subscribe();

    this.messagesService.add(`Momento ${id} editado com sucesso!`);
    this.router.navigate(['/']);
  }
}
