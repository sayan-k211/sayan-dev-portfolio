import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly base = environment.apiBase;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  success = signal<string | null>(null);
  error = signal<string | null>(null);
  loading = signal<boolean>(false);

  submit() {
    if (this.form.invalid || this.loading()) return;
    
    this.loading.set(true);
    this.success.set(null);
    this.error.set(null);

    this.http.post(`${this.base}/contact`, this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set('Thanks! Your message has been sent successfully. I\'ll get back to you soon.');
        this.form.reset();
        
        // To clear success message after 5 seconds
        setTimeout(() => this.success.set(null), 5000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Failed to send message. Please try again or email me directly.');
        console.error('Contact form error:', err);
        
        // To clear error message after 5 seconds
        setTimeout(() => this.error.set(null), 5000);
      }
    });
  }
}