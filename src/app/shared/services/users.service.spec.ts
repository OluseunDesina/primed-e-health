// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';

interface User {
  name: string;
  email: string;
  role: string;
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an empty array if no users are stored', () => {
    const users = service.getUsers();
    expect(users).toEqual([]);
  });

  it('should add a user and store it in localStorage', () => {
    const user: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };
    service.addUser(user);

    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    expect(storedUsers.length).toBe(1);
    expect(storedUsers[0]).toEqual(user);
  });

  it('should update an existing user', () => {
    const user1: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };
    const user2: User = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
    };

    service.addUser(user1);
    service.updateUser(0, user2);

    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user2);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    expect(storedUsers[0]).toEqual(user2);
  });

  it('should delete a user by index', () => {
    const user1: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };
    const user2: User = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
    };

    service.addUser(user1);
    service.addUser(user2);
    service.deleteUser(0);

    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user2);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    expect(storedUsers.length).toBe(1);
    expect(storedUsers[0]).toEqual(user2);
  });

  it('should handle invalid indices gracefully when deleting', () => {
    const user: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };
    service.addUser(user);

    service.deleteUser(1); // Invalid index
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user);
  });
});
