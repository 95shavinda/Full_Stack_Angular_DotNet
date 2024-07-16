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

  getAllUsers=():Observable<User[]> => this.http.get<User[]>(this.baseUrl + "/GetAll");

  addUser=(data:User) => this.http.post(this.baseUrl + "/Create",data);

  getUserById=(id:number):Observable<User> => this.http.get<User>(this.baseUrl + "/GetById/" + id);

  deleteUser=(id:number) => this.http.delete(this.baseUrl + "/Delete/" + id);

  updateUser=(id:number, data: User) => this.http.put(this.baseUrl + "/Update/" + id,data);
}
