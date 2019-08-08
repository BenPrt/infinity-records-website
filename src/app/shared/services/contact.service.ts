import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Email } from 'src/app/models/e-mail';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendEmail(mailContent: Email): Observable<any> {
    const url = `${environment.apiUrl}/send-email`;
    return this.http.post(url, mailContent);
  }
}
