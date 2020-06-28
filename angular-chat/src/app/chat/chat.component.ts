import { Component, OnInit } from '@angular/core';
import { Comment } from './../class/comment';
import { User } from './../class/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const CURRENT_USER: User = new User(1, '立川めめめ');
const ANOTHER_USER: User = new User(2, '戸川めめめ');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  comments: Comment[];
  commentsRef: AngularFireList<any>;
  currentUser = CURRENT_USER;
  content = '';

  constructor(private db: AngularFireDatabase) {
    this.commentsRef = this.db.list('comments');
  }

  ngOnInit(): void {
    this.commentsRef.snapshotChanges().subscribe((snapshots) => {
      this.comments = snapshots.map((snapshot) => {
        const values = snapshot.payload.val();
        return new Comment({ key: snapshot.payload.key, ...values });
      });
    });
  }

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(
        new Comment({ user: this.currentUser, message: comment })
      );
      this.content = '';
    }
  }

  toggleEditComment(index: number): void {
    this.comments[index].isEdit = !this.comments[index].isEdit;
  }

  saveEditComment(index: number, key: string): void {
    this.commentsRef
      .update(key, {
        message: this.comments[index].message,
        date: this.comments[index].date,
      })
      .then(() => {
        this.comments[index].isEdit = false;
      });
  }

  deleteComment(key: string): void {
    this.commentsRef.remove(key);
  }
}
