import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../core/interfaces/user';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let usersServiceMock: jasmine.SpyObj<UsersService>;

  const mockUsers: User[] = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  const mockRoles = ['Admin', 'User', 'Viewer'];

  beforeEach(() => {
    usersServiceMock = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'getRoles',
      'addUser',
      'updateUser',
      'deleteUser',
    ]);

    usersServiceMock.getUsers.and.returnValue(mockUsers);
    usersServiceMock.getRoles.and.returnValue(mockRoles);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    });

    component = TestBed.createComponent(UsersComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with users and roles', () => {
    component.ngOnInit();

    expect(component.users).toEqual(mockUsers);
    expect(component.roles).toEqual(mockRoles);
    expect(component.userForm).toBeDefined();
  });

  it('should validate the form as invalid when empty', () => {
    component.ngOnInit();
    expect(component.userForm.valid).toBeFalse();
  });

  it('should validate the form as valid when populated correctly', () => {
    component.ngOnInit();
    component.userForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    });
    expect(component.userForm.valid).toBeTrue();
  });

  it('should call addUser and reset the form on submit for a new user', () => {
    component.ngOnInit();
    component.userForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    });

    component.onSubmit();

    expect(usersServiceMock.addUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    });
    expect(component.userForm.pristine).toBeTrue();
  });

  it('should call updateUser on submit when editing a user', () => {
    component.ngOnInit();
    component.onEdit(0);

    component.userForm.setValue({
      name: 'Updated John',
      email: 'updatedjohn@example.com',
      role: 'Admin',
    });

    component.onSubmit();

    expect(usersServiceMock.updateUser).toHaveBeenCalledWith(0, {
      name: 'Updated John',
      email: 'updatedjohn@example.com',
      role: 'Admin',
    });
    expect(component.isEditing).toBeFalse();
    expect(component.editIndex).toBeNull();
  });

  it('should call deleteUser and refresh the user list', () => {
    component.ngOnInit();

    component.onDelete(1);

    expect(usersServiceMock.deleteUser).toHaveBeenCalledWith(1);
    expect(component.users).toEqual(mockUsers);
  });

  it('should populate the form when editing a user', () => {
    component.ngOnInit();

    component.onEdit(1);

    expect(component.userForm.value).toEqual(mockUsers[1]);
    expect(component.isEditing).toBeTrue();
  });

  it('should not submit the form if invalid', () => {
    component.ngOnInit();

    component.userForm.setValue({
      name: '',
      email: 'invalidemail',
      role: '',
    });

    component.onSubmit();

    expect(usersServiceMock.addUser).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Form in valid');
  });
});
