
import { Component, Signal } from '@angular/core';
import { ApiService } from './services/api.service';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  template: `
    <h2>Search Posts</h2>
    <input type="text" placeholder="Type to search..." (input)="onSearch($event)" />

    <h3>Search Results</h3>
    <div *ngFor="let post of searchResults()">{{ post.title }}</div>

    <hr />
    <button (click)="loadMerged()">Load Merged Posts</button>
    <div *ngFor="let post of posts()">{{ post.title }}</div>
  `
})
export class AppComponent {
  posts!: Signal<Post[]>;   
  searchResults!: Signal<Post[]>;  
  constructor(private apiService: ApiService) {}
    ngOnInit(): void {
    this.posts = this.apiService.postsSignal;
    this.searchResults = this.apiService.searchResultsSignal;
  }
  onSearch(e: any) { this.apiService.searchPosts(e.target.value); }
  loadMerged() { this.apiService.getPosts(); }
}
