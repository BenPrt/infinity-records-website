import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Email } from 'src/app/models/e-mail';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'contact-form-component',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [],
})
export class ContactFormComponent {
  isBrowser: boolean;
  contactFormGroup: FormGroup;
  recaptchaToken: string = environment.contactFormRecaptchaKey;
  formHasBeenSubmitted: boolean = false;
  messageSendingLoading: boolean = false;
  messageHasBeenSent: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

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
    this.formHasBeenSubmitted = true;
    this.messageSendingLoading = true;
    const email: Email = this.contactFormGroup.value;
    this.contactService.sendEmail(email).subscribe(() => {
      this.messageSendingLoading = false;
      this.messageHasBeenSent = true;
    });
  }
}
