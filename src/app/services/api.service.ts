import { effect, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { debounceTime, switchMap, retry, catchError, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  postsSignal = signal<Post[]>([]);
  loadingSignal = signal<boolean>(false);
  errorSignal = signal<string | null>(null);
  private searchSubject = new BehaviorSubject<string>('');

  searchResultsSignal: Signal<Post[]> = toSignal(
    this.searchSubject.pipe(
      debounceTime(500),
      switchMap(text =>
        this.http.get<Post[]>(`${this.apiUrl}?q=${text}`).pipe(
          catchError(() => {
            return throwError(() => 'Search failed');
          })
        )
      )
    ),
    { initialValue: [] }
  );

  constructor(private http: HttpClient) {}

  getPosts() {
    this.loadingSignal.set(true);
    return this.http.get<Post[]>(this.apiUrl).pipe(
      retry(2),
      tap(data => this.postsSignal.set(data)),
      catchError(error => {
        this.errorSignal.set('Error loading posts');
        return throwError(() => error);
      })
    ).subscribe({
      complete: () => this.loadingSignal.set(false)
    });
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchPosts(text: string) {
    this.searchSubject.next(text);
  }


postsAsObservable(): Observable<Post[]> {
  return new Observable<Post[]>(subscriber => {

    effect(() => {
      subscriber.next(this.postsSignal());
    });

  });
}
}