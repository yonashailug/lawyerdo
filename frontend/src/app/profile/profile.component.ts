import { Component, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }
}
