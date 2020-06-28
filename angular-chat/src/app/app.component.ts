import { Component } from '@angular/core';
import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '立川めめめ');
const ANOTHER_USER: User = new User(2, '戸川めめめ');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です!'),
  new Comment(ANOTHER_USER, 'この間の件ですが, どうなりましたか?'),
  new Comment(CURRENT_USER, 'お疲れ様です!'),
  new Comment(CURRENT_USER, 'クライアントからOKが出ました!'),
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
}
