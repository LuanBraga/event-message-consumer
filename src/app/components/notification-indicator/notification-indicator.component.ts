import { Component, OnInit } from '@angular/core';

interface Message {
  id: number;
  description: string;
  url: string;
}

@Component({
  selector: 'app-notification-indicator',
  templateUrl: './notification-indicator.component.html',
  styleUrls: ['./notification-indicator.component.scss']
})
export class NotificationIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const eventSource = new EventSource('http://localhost:8080/api/v1/sse/sse-emitter');

    const eventIdList = document.querySelector('ul');

    // eventSource.onmessage = (e) => {
    //   console.log(e.data);
    // }

    eventSource.addEventListener('message', (e) => {
      let m = e.data as Message;

      const newElement = document.createElement("li");

      newElement.textContent = `${m}`;

      eventIdList?.appendChild(newElement);

      console.log(m);
    });

    eventSource.addEventListener('open', (e) => {
      console.log(e);
    });
  }

}
