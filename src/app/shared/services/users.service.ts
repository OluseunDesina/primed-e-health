import { Injectable } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { Stat } from '../../core/interfaces/stat';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly storageKey = 'users';

  getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  getRoles(): string[] {
    return ['Super Admin', 'Admin', 'User'];
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  updateUser(index: number, user: User): void {
    const users = this.getUsers();
    users[index] = user;
    this.saveUsers(users);
  }

  deleteUser(index: number): void {
    const users = this.getUsers();
    users.splice(index, 1);
    this.saveUsers(users);
  }

  getStats(): Stat {
    return {
      users: this.getUsers().length,
      roles: this.getRoles().length,
      activeUsers: 0,
    };
  }
}
