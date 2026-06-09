import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, PatternValidator, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';
@Component({
  selector: 'app-jwt-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './jwt-login.html',
  styleUrl: './jwt-login.scss',
})
export class JwtLogin {

isLogin: boolean = true;

  signupForm!: FormGroup;

  email: any;
  password: any;

  loginError: string = '';

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {

  }

  constructor(private fb: FormBuilder, private userService: Auth, private router: Router, private cdr: ChangeDetectorRef) {
    this.createsignupForm();
  }

  createsignupForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // email: ['', [Validators.required ]],
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
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      this.userService.register('register', {
        name: this.signupForm.get('name')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        role: 'user'
      }).subscribe(res => {
        console.log('User Registered', res);
        if (res) {
          this.signupForm.reset();
          this.toggleForm();
        }
      });
    } else {
      console.log('Form is invalid')
    }
  }


  login(): void {


    this.userService
      .login({
        email: this.email,
        password: this.password
      })
      .subscribe({

        next: (res) => {

          console.log(res);


          if (res.user.role === 'admin') {

            this.router.navigate([
              '/jwtAdmin'
            ]);

          } else {

            this.router.navigate([
              '/jwtUser'
            ]);

          }
        },

        error: (err) => {
          alert(
            err?.error?.msg ||
            'Login Failed'
          );
        }
      });
  }

}

