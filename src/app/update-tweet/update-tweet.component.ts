import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from '../models/tweet';
import { User } from '../models/user';
import { AuthService } from '../api-service/auth.service';
import { TweetService } from '../api-service/tweet.service';

@Component({
  selector: 'app-update-tweet',
  templateUrl: './update-tweet.component.html',
  styleUrls: ['./update-tweet.component.css']
})
export class UpdateTweetComponent implements OnInit {

  currentUser: User;
  tweetList: Tweet[] = [];
  currentTweet: Tweet = {
    tweetId: null,
    tweetMsg: null,
    postTime: null,
    likes: 0,
    user: null,
    replies: null,
    tweetTag: null,
  };
  editTweetForm: FormGroup;
  // addTagClicked: boolean = false;
  // currentRouteUsername: string;

  constructor(public editDialogRef:MatDialogRef<UpdateTweetComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Tweet,
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.currentUser = this.authService.getCurrentUser();
    this.editTweetForm = this.formBuilder.group({
      tweetBody: ['', [Validators.required, Validators.maxLength(144)]],
    });
  }

  onCloseClick(): void {
    this.editDialogRef.close();
  }

  save() {
    this.editDialogRef.close(this.editTweetForm.value);
  }
  get f() {
    return this.editTweetForm.controls;
  }
}
