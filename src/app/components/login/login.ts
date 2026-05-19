import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, PatternValidator, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isLogin: boolean = true;

  signupForm!:FormGroup;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

   ngOnInit() {
    
  }

  constructor(private fb: FormBuilder) { 
    this.createsignupForm();
  }

  createsignupForm() {
     this.signupForm = this.fb.group({
      name: ['', Validators.required],
      // email: ['', [Validators.required , Validators.email]],
       email: ['', [Validators.required ]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
     })
  }


  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const val = control.value;
  const password = this.signupForm?.get('password')?.value;

  if (val !== password) {
    return { passwordMismatch: true }; // ✅ only error when NOT matching
  }
  return null;
}
  

 


  onSignup() {
    if(this.signupForm.valid) {
      console.log(this.signupForm.value)
    } else {
      console.log('Form is invalid')
    }
  }

 

}
