import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rh-header',
  templateUrl: './rh-header.component.html',
  styleUrls: ['./rh-header.component.css']
})
export class RhHeaderComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.logOut();
    
  }
}
