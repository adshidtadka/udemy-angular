import { Component } from '@angular/core';
import { Comment } from './class/comment';
import { User } from './class/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

const CURRENT_USER: User = new User(1, '立川めめめ');
const ANOTHER_USER: User = new User(2, '戸川めめめ');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  comments: Observable<any>;
  commentsRef: AngularFireList<any>;
  currentUser = CURRENT_USER;
  content = '';

  constructor(private db: AngularFireDatabase) {
    this.commentsRef = db.list('comments');
    this.comments = this.commentsRef.valueChanges();
  }

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(new Comment(this.currentUser, comment));
      this.content = '';
    }
  }
}
