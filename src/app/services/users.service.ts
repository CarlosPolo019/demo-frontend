import { Injectable } from '@angular/core';
import axios from 'axios';

// Define the structure for a User
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}

// Define the structure for the paginated response
export interface PaginatedResponse {
  content: User[];
  totalPages: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/api/users'; // API base URL

  constructor() {}

  // Fetch paginated users with an optional filter
  async getUsers(page: number = 0, size: number = 10, firstName: string = ''): Promise<PaginatedResponse> {
    try {
      const response = await axios.get<PaginatedResponse>(this.apiUrl, {
        params: {
          page,
          size,
          firstName,
          lastName: firstName,
          email: firstName
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Propagate the error for handling in the component
    }
  }

  // Create a new user
  async createUser(user: User): Promise<User> {
    try {
      const response = await axios.post<User>(this.apiUrl, user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update an existing user by ID
  async updateUser(id: number, user: User): Promise<User> {
    try {
      const response = await axios.put<User>(`${this.apiUrl}/${id}`, user);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
