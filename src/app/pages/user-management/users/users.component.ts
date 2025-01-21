import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;
  users: User[] = [];
  isEditing = false;
  editIndex: number | null = null;
  errorMessage: string = '';

  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  roles!: string[];

  ngOnInit() {
    // initialize the form
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
    // calls this methods once on component initialization
    this.getRoles();
    this.getUsers();
  }

  getUsers(): void {
    // retrieve the list of users or empty array
    this.users = this.userService.getUsers();
  }

  getRoles(): void {
    // retrieve the list of roles or empty array
    this.roles = this.userService.getRoles();
  }

  onSubmit(): void {
    // Handle the submit function
    if (this.userForm.invalid) {
      this.errorMessage = 'Form is invalid. Please correct the errors.';
      return;
    }

    const user: User = this.userForm.value;

    if (this.isEditing && this.editIndex !== null) {
      // Confirmation dialog for updating a user
      if (confirm('Are you sure you want to update this user?')) {
        this.userService.updateUser(this.editIndex, user);
        alert('User updated successfully.');
      }
      this.isEditing = false;
      this.editIndex = null;
    } else {
      // Adding a new user
      this.userService.addUser(user);
      alert('User added successfully.');
    }

    this.userForm.reset();
    this.getUsers();
  }

  onEdit(index: number): void {
    this.isEditing = true;
    this.editIndex = index;

    // Check if user exists before editing
    if (this.users[index]) {
      this.userForm.patchValue(this.users[index]);
    } else {
      alert('The selected user does not exist.');
    }
  }

  onDelete(index: number): void {
    // Confirmation dialog for deleting a user
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(index);
      alert('User deleted successfully.');
      this.getUsers();
    }
  }
}
