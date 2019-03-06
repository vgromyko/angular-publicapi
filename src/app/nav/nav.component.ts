import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public title = "Public API";
  public navData = [
    {"name": "Home", "url":"/"},
    {"name": "NASA", "url":"/nasa"},
    {"name": "Weather", "url":"/weather"},
    {"name": "Clients", "url":"/clients"},
    {"name": "Media", "url":"/media"}
    ]

  constructor() { }

  ngOnInit() {
  }

}
