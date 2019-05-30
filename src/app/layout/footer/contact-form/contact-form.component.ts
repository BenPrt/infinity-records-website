import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Email } from 'src/app/models/e-mail';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'contact-form-component',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [
    trigger('submitButtonFade', [
      transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('successMessageFade', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
    ]),
  ],
})
export class ContactFormComponent {
  contactFormGroup: FormGroup;
  recaptchaToken: string = environment.contactFormRecaptchaKey;
  formHasBeenSubmitted: boolean = false;

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
      this.formHasBeenSubmitted = true;
    });
  }

}
