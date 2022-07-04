import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ARTS_SRCS } from './domain/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit{
  title = 'ftf-frontend';

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
