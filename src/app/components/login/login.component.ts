import {Component, OnInit, Injector} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ListenerService} from '../../services/listener.service';

@Component({
  selector: 'zkoin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  lSubmitted = false;
  submitted = false;
  returnUrl: string;
  error = '';
  auth;
  tryRegister = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private listerner: ListenerService,
    private authService: AuthService, 
    private injector: Injector) { 
    this.auth = this.injector.get(AuthService);
  }

  ngOnInit() {
    // TODO add better validation
    //   alert('Welcome to Zkoin, if you have account, please login, if you do not have account, by submitin we will create you one!');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // if(this.tryRegister) {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        code: ['', Validators.required],
        amount: ['', Validators.required],
      })
    // }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  tryToReg() {
    this.tryRegister = true;
  }

  // convenience getter for easy access to form fields
  get l() {
    return this.loginForm.controls;
  }
  get r() {
    return this.registerForm.controls;
  }

  onLogin() {
    this.lSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.login(this.l.email.value, this.l.password.value);
  }

  login(email: string, password: string) {
    if (email && password) {
      this.authService.start({name: email, pass: password});
      this.auth.onEvent().subscribe(
        data => {
          console.log('data from login: ', data);
          this.loading = false;
          if (data && data.status === 200 && data.token) this.router.navigate(['']);
        },
        err => {
          this.loading = false;
          console.log('error from login: ', err);
        },
        () => {
          this.loading = false;
          console.log('closed connection by login');
        }
      );
    } else {
      console.log('error');
      return;
    }
  }


  // Register 
  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    this.register(this.r.name.value, 
      this.r.email.value, 
      this.r.street.value, 
      this.r.city.value, 
      this.r.state.value, 
      this.r.country.value, 
      this.r.password.value, 
      this.r.password2.value, 
      this.r.code.value, 
      this.r.amount.value);
  }


  register(
    name: string, 
    email: string, 
    street: string, 
    city: string, 
    state: string, 
    country: string, 
    password: string, 
    password2: string, 
    code: string, 
    amount: string
    ) {
      if (name && 
          email &&
          street &&
          city && 
          state && 
          country && 
          password && 
          password2 && 
          code &&  
          amount
        ) {
        this.authService.start({name: email, pass: password});
        this.auth.onEvent().subscribe(
          data => {
            console.log('data from register: ', data);
            this.loading = false;
            if (data && data.status === 200 && data.token) this.router.navigate(['']);
          },
          err => {
            this.loading = false;
            console.log('error from register: ', err);
          },
          () => {
            this.loading = false;
            console.log('closed connection by register');
          }
        );
      } else {
        console.log('error');
        return;
      }
    }
}
