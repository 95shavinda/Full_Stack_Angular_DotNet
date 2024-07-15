import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = "https://localhost:7213/api/user";

  constructor(private http : HttpClient) { }

  getAllUsers=():Observable<User[]> => this.http.get<User[]>(this.baseUrl + "/GetAll")
}
