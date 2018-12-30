import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListenerService } from '../../services/listener.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'zkoin-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    //   alert('Welcome to Zkoin, if you have account, please register, if you do not have account, by submitin we will create you one!');
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get l() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.lSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    this.register(this.l.email.value, this.l.password.value);
  }

  register(email: string, password: string) {
    if (email && password) {
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
