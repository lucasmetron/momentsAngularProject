import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../interfaces/Coments';
import { Response } from '../interfaces/Response';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseAPiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  createComment(data: Comment): Observable<Response<Comment>> {
    console.log(
      '🚀 ~ file: comment.service.ts ~ line 18 ~ CommentService ~ createComment ~ data',
      data
    );
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    return this.http.post<Response<Comment>>(url, data);
  }
}
