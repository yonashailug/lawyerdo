import { Injectable } from "@angular/core";
import { USER_KEY } from "../../config";
import { StorageService } from "./storage.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private appStorage: StorageService) {}
  
  getUser() {
    return this.appStorage.getItem(USER_KEY);
  }
  
  saveUser(user: any) {
    this.appStorage.setItem(USER_KEY, user);
  }
  
  removeUser() {
    this.appStorage.removeItem(USER_KEY);
  }
}
