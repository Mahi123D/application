import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userStatus: any;
  error: any;
  // registerForm: FormGroup;
  registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
    confirmPassword: ['', Validators.required],
    phone: ['', [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    addresses: this.formBuilder.array([], [Validators.required])
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  });
  constructor(private formBuilder: FormBuilder, private route: Router, private regiService: RegisterService) { }

  ngOnInit() { }

  get f() { return this.registerForm.controls; }

  addresses(): FormArray {
    return this.registerForm.get("addresses") as FormArray
  }


  newQuantity(): FormGroup {
    return this.formBuilder.group({
      address: ['', [Validators.required]],
    })
  }

  addQuantity() {
    this.addresses().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.addresses().removeAt(i);
  }


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  submitForm() {

    if (this.registerForm.invalid) {
      return;
    }

    this.regiService.onRegister(this.registerForm.value).subscribe(res => {
      this.userStatus = res;
      if (this.userStatus.statuscode == "200") {
        localStorage.setItem("token", this.userStatus.token);
        this.route.navigate(['/login']);
      } else {
        this.error = this.userStatus.message;
      }
    })
  }


}
