import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  createVestAdapter,
  ValidatorRegistryService,
  ValidatorDirective,
} from '@validointi/core';
import { create, enforce, test, warn } from 'vest';
interface Model {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const suite = create((data: Model = {} as Model, field?: string) => {
  test('name', 'Name is required', () => {
    enforce(data.name).isNotBlank();
  });

  test('name', 'Name must be at least 3 characters long', () => {
    enforce(data.name).longerThan(2);
  });

  test('email', 'Email is required', () => {
    enforce(data.email).isNotBlank();
  });
  test('email', () => {
    enforce(data.email)
      .message('Not an valid email address')
      .matches(/^[^@]+@[^@]+$/);
  });

  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
  });
  test('password', 'Password is too short', () => {
    enforce(data.password).longerThan(2);
  });
  test('password', 'Password is weak. maybe add a number', () => {
    warn();
    enforce(data.password).matches(/[0-9]/);
    enforce(data.password).longerThanOrEquals(6);
  });

  test('confirmPassword', 'Passwords do not match', () => {
    enforce(data.confirmPassword).equals(data.password);
  });
});

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidatorDirective],
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent {
  model: Model = { name: '', email: '', confirmPassword: '', password: '' };

  #vr = inject(ValidatorRegistryService);
  validate = this.#vr.registerValidator('form1', createVestAdapter(suite));

  async onSubmit(data: any) {
    const validationResult = await this.validate(data);
    console.dir(validationResult);
  }
}
