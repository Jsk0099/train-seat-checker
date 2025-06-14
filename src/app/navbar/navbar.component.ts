import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  navigationList:any;  
  
  constructor(private router:Router){ }

  ngOnInit(){
    console.log('Nav Load');
    this.navigationList = [
      {displayName:'Train Seat Availability',id:'tsa',path:'tsa'},
    ]
  };

  ngAfterViewInit(){
    let loc = window.location.href;
    loc = loc.slice(loc.lastIndexOf('/')+1);
    document.getElementById(loc ? loc : 'dashboard')!.classList.add('active');
    // document.getElementsByClassName('nav-btn')[0].classList.add('active');
  };

  navigate(path:string,i:any){
    let predElem = document.getElementsByClassName('active')[0];
    predElem.classList.remove('active');
    i.target.classList.add('active');
    this.router.navigate([`${path}`]);
  }

}
