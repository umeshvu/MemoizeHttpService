import { Component, OnInit } from '@angular/core';
import { MemoizeHttpService } from './memoize-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data: any;

  constructor(private memoizeHttpService: MemoizeHttpService) {}

  ngOnInit() {
    const postData = { key: 'value' };
    // // Memoized POST request with explicit next, error, and complete handlers
    // this.memoizeHttpService.memoizePost('https://api.example.com/data', postData)
    //   .subscribe({
    //     next: response => {
    //       // Handle the successful response
    //       this.data = response;
    //       console.log('POST request successful:', response);
    //     },
    //     error: err => {
    //       // Handle the error
    //       console.error('POST request failed after 3 retries:', err);
    //     },
    //     complete: () => {
    //       // Handle the completion of the observable
    //       console.log('POST request completed.');
    //     }
    //   });
  }

  ttest() {
    // Memoized GET request with explicit next, error, and complete handlers
    this.memoizeHttpService.memoizeGet('https://api.github.com/users/umeshvu/repos')
      .subscribe({
        next: response => {
          // Handle the successful response
          this.data = response;
          console.log('GET request successful:', response);
        },
        error: err => {
          // Handle the error
          console.error('GET request failed after 3 retries:', err);
        },
        complete: () => {
          // Handle the completion of the observable
          console.log('GET request completed.');
        }
      });
  }
}
