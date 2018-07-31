import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-marksheet',
  templateUrl: './marksheet.component.html',
  styleUrls: ['./marksheet.component.css']
})
export class MarksheetComponent implements OnInit {
  pageTitle = "Marksheet"
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)
  }

}
