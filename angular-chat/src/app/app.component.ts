import { Component } from '@angular/core';
import { Comment } from './class/comment';

const COMMENTS: Comment[] = [
  { name: '伊藤なんちゃら', message: 'お疲れ様です!' },
  { name: '斎藤なんちゃら', message: 'この間の件ですが, どうなりましたか?' },
  { name: '加藤なんちゃら', message: 'お疲れ様です!' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  comments = COMMENTS;
}
