import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private sanitizer: DomSanitizer) {}
  routes: any[] = [
    {
      title: 'Overview',
      link: '/dashboard',
    },
    {
      title: 'User Management',
      link: '/user-management/users',
    },
  ];
}
