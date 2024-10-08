import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService, User, PaginatedResponse } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] // Import necessary modules
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  totalPages = 0;
  currentPage = 0;
  editingUserId: number | null = null;
  userForm: FormGroup;
  searchQuery: string = '';  // Holds the filter string
  pageSize: number = 10;     // Define the page size

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder // Inject FormBuilder for reactive forms
  ) {
    // Initialize the reactive form
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.dateInPastValidator]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load users with pagination and optional filter for search
  async loadUsers(page: number = 0, firstName: string = ''): Promise<void> {
    try {
      const response: PaginatedResponse = await this.usersService.getUsers(page, this.pageSize, firstName);
      this.users = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  openModal(user?: User) {
    if (user) {
      this.editingUserId = user.id;  // Load user data into the form
      // Format birthDate correctly
      this.userForm.patchValue({
        ...user,
        birthDate: this.formatDateForInput(user.birthDate) // Convert date for input
      });
      
    } else {
      this.editingUserId = null;  // Resetear ID para crear un nuevo usuario
      this.userForm.reset();  // Limpiar el formulario
    }
    const modalElement = document.getElementById('userModal');
    const modal = new (window as any).bootstrap.Modal(modalElement!);  // Inicializar modal de Bootstrap
    modal.show();  // Mostrar el modal
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }





  // Filter users by name or email
  filterUsers(query: string): void {
    this.searchQuery = query; // Update search query
    this.loadUsers(0, query); // Reload users with filter
  }

  // Edit user by patching the form with user data
  editUser(user: User): void {
    this.editingUserId = user.id;
    this.userForm.patchValue(user);
  }

  // Delete user and reload the list
  async deleteUser(id: number): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
      this.loadUsers(); // Reload after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  // Submit form for creating or updating a user
  async submitForm(): Promise<void> {
    if (this.userForm.invalid) return;

    const user: User = this.userForm.value;
    try {
      if (this.editingUserId) {
        await this.usersService.updateUser(this.editingUserId, user);
      } else {
        await this.usersService.createUser(user);
      }

      // Reset the form and reload users
      this.userForm.reset();
      this.editingUserId = null;
      this.loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  // Validator for checking that birth date is in the past
  dateInPastValidator(control: any) {
    const birthDate = new Date(control.value);
    return birthDate < new Date() ? null : { invalidDate: true };
  }

  // Pagination control
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadUsers(this.currentPage + 1,this.searchQuery);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadUsers(this.currentPage - 1, this.searchQuery);
    }
  }
}
