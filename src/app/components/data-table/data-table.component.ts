import { Component, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

interface Article {
  id: number;
  title: string;
  authorId: number;
  authorAge: number;
  isNew: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
  articles$: Observable<Article[]> = new Observable();// Используем наблюдаемый объект для статей
  currentIndex = 0;
  pageSize = 100;
  nextId = 1;

  authors = [
    { id: 1, name: 'Author1', age: 65 },
    { id: 2, name: 'Author2', age: 87 },
    { id: 3, name: 'Author3', age: 43 },
    { id: 4, name: 'Author4', age: 51 },
    { id: 5, name: 'Author5', age: 35 },
  ];

  ngOnInit(): void {
    this.getAuthors().pipe(
      concatMap(authors => this.getArticles(authors))
    ).subscribe(articles => {
      this.articles$ = of(articles);
    });
  }

  getAuthors(): Observable<{ id: number, name: string, age: number }[]> {
    return of(this.authors);
  }

  getArticles(authors: { id: number, name: string, age: number }[]): Observable<Article[]> {
    return of(this.generateRandomData(authors));
  }

  generateRandomData(authors: { id: number, name: string, age: number }[]): Article[] {
    const data: Article[] = [];
    for (let i = 0; i < this.pageSize; i++) {
      data.push(...this.generateArticles(authors));
    }
    return data;
  }

  loadMoreData(): void {
    const data: Article[] = [];
    for (let i = 0; i < this.pageSize; i++) {
      data.push(...this.generateArticles(this.authors));
    }
    this.currentIndex += this.pageSize;
    this.articles$.pipe(
      map(articles => [...articles, ...data])
    ).subscribe(updatedArticles => {
      this.articles$ = of(updatedArticles);
    });
  }

  onScroll(): void {
      this.loadMoreData();
  }

  private generateArticles(authors: { id: number, name: string, age: number }[]): Article[] {
    const articles: Article[] = [];
    const authorId = Math.floor(Math.random() * authors.length) + 1;
    const author = authors.find(a => a.id === authorId);
    const authorAge = author ? author.age : 0;
    if (authorAge > 50) {
      articles.push({
        id: this.nextId++,
        title: `Article ${this.nextId}`,
        authorId,
        authorAge,
        isNew: Math.random() < 0.5,
      });
    }
    return articles;
  }
}