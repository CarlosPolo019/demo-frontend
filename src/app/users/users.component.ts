import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService, User, PaginatedResponse } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private fb: FormBuilder,  // Inject FormBuilder for reactive forms
    private toastr: ToastrService // Inyectamos ToastrService
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

  // Cargar usuarios con paginación y filtro opcional
  async loadUsers(page: number = 0, firstName: string = ''): Promise<void> {
    try {
      const response: PaginatedResponse = await this.usersService.getUsers(page, this.pageSize, firstName);
      this.users = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    } catch (error) {
      this.toastr.error('Error al cargar usuarios', 'Error');
      console.error('Error loading users:', error);
    }
  }

  openModal(user?: User) {
    if (user) {
      this.editingUserId = user.id;  // Cargar datos del usuario en el formulario
      this.userForm.patchValue({
        ...user,
        birthDate: this.formatDateForInput(user.birthDate) // Convertir la fecha para el input
      });
    } else {
      this.editingUserId = null;  // Resetear ID para crear un nuevo usuario
      this.userForm.reset();  // Limpiar el formulario
    }
    const modalElement = document.getElementById('userModal');
    const modal = new (window as any).bootstrap.Modal(modalElement!);  // Inicializar el modal de Bootstrap
    modal.show();  // Mostrar el modal
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formato como YYYY-MM-DD
  }

  // Filtro de usuarios por nombre o correo
  filterUsers(query: string): void {
    this.searchQuery = query; // Actualizar el string de búsqueda
    this.loadUsers(0, query); // Recargar los usuarios con el filtro
  }

  // Eliminar usuario y recargar la lista
  async deleteUser(id: number): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
      this.toastr.success('Usuario eliminado con éxito', 'Operación exitosa');
      this.loadUsers(); // Recargar usuarios después de eliminar
    } catch (error) {
      this.toastr.error('Error al eliminar el usuario', 'Operación fallida');
      console.error('Error deleting user:', error);
    }
  }

  // Enviar formulario para crear o actualizar un usuario
  async submitForm(): Promise<void> {
    if (this.userForm.invalid) return;

    const user: User = this.userForm.value;
    try {
      if (this.editingUserId) {
        await this.usersService.updateUser(this.editingUserId, user);
        this.toastr.success('Usuario actualizado con éxito', 'Operación exitosa');
      } else {
        await this.usersService.createUser(user);
        this.toastr.success('Usuario creado con éxito', 'Operación exitosa');
      }

      // Resetear el formulario y recargar usuarios
      this.userForm.reset();
      this.editingUserId = null;
      this.loadUsers();
    } catch (error) {
      this.toastr.error('Error al guardar el usuario', 'Operación fallida');
      console.error('Error saving user:', error);
    }
  }

  // Validator para verificar que la fecha de nacimiento sea en el pasado
  dateInPastValidator(control: any) {
    const birthDate = new Date(control.value);
    return birthDate < new Date() ? null : { invalidDate: true };
  }

  // Control de paginación
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadUsers(this.currentPage + 1, this.searchQuery);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadUsers(this.currentPage - 1, this.searchQuery);
    }
  }
}
