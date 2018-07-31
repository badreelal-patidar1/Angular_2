import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {
  pageTitle = 'College';
  constructor(
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

}
