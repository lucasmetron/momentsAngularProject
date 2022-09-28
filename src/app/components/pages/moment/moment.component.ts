import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { Moment } from 'src/app/interfaces/Moments';
import { Comment } from 'src/app/interfaces/Coments';
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
  commentForm!: FormGroup;

  constructor(
    private momenteService: MomentService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momenteService
      .getMoment(id)
      .subscribe((res) => (this.moment = res.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text');
  }

  get username() {
    return this.commentForm.get('username');
  }

  async removeHandler(id: number) {
    await this.momenteService.removeMoment(id).subscribe();
    this.messagesService.add('Momento excluido com sucesso!');
    this.router.navigate(['/']);
  }

  async onSubmit(formDir: FormGroupDirective) {
    console.log(this.moment);
    if (this.commentForm.invalid) return;

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((res) => {
      this.moment?.comments.push(res.data);
    });

    this.messagesService.add('Comentário adicionado!');
    this.commentForm.reset();
    formDir.resetForm();
  }
}
