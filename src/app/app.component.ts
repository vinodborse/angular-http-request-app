import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

import { Post } from './post.model';
import { PostService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;
  
  constructor(private http: HttpClient, private postService: PostService) {}
  
  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    )

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onCreatePost( postData: Post) {
    this.postService.createAndStore(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    this.postService.deletePosts()
    .subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }

  onErrorHandle() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
