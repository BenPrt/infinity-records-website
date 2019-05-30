import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Email } from 'src/app/models/e-mail';

@Component({
  selector: 'contact-form-component',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [],
})
export class ContactFormComponent {
  contactFormGroup: FormGroup;
  recaptchaToken: string = environment.contactFormRecaptchaKey;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
      body: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  submitContactForm(): void {
    this.contactFormGroup.disable();
    const email: Email = this.contactFormGroup.value;
    this.contactService.sendEmail(email).subscribe((res) => {
      console.log(res);
      console.log('E-mail request sent to apis');
    });
  }

}
