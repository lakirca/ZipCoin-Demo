import {Component, OnInit, Injector} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ListenerService} from '../../services/listener.service';

@Component({
  selector: 'zkoin-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  saveForm: FormGroup;
  loading = false;
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
    this.saveForm = this.formBuilder.group({
      email: ['', Validators.required],
      code: ['', Validators.required],
      newPassword: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get l() {
    return this.saveForm.controls;
  }

  onSave() {
    this.submitted = true;
    if (this.saveForm.invalid) {
      return;
    }
    this.loading = true;

    this.save(this.l.email.value, this.l.code.value, this.l.newPassword.value, this.l.password.value);
  }

  save(email: string, code: any, newPassword: string, password: string) {
    if (email && code && newPassword && password) {
      //
   }
  } 
}