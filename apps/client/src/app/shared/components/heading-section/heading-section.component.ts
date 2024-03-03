import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading-section',
  templateUrl: './heading-section.component.html',
  styleUrls: ['./heading-section.component.css']
})
export class HeadingSectionComponent {
  @Input()
  public title:string="";
  @Input()
  public subtitle:string="";
}
