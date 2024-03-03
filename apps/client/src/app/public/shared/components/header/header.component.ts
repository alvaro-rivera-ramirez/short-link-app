import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
    window.onscroll = () => {
      this.resetMenu();
    };
  }
  @ViewChild('menuIcon') menuIcon!: ElementRef;
  @ViewChild('navbar') navbar!: ElementRef;

  toggleMenu() {
    this.menuIcon.nativeElement.innerText=(this.menuIcon.nativeElement.innerText=="menu")?"close":"menu";
    this.navbar.nativeElement.classList.toggle('active');
  }

  resetMenu() {
    this.menuIcon.nativeElement.innerText="menu";
    this.navbar.nativeElement.classList.remove('active');
  }

}
