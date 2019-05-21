import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/service/contact.service';
import { Email } from 'src/app/models/e-mail';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [],
})
export class ContactFormComponent implements OnInit {
  protected contactFormGroup: FormGroup;
  recaptchaToken: string = '6LeZs6QUAAAAACihintSSAc_48B3Llh3kclMBFAV';

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
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
