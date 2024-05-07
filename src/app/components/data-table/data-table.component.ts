import { Component, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

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
  articles: Article[] = []; // Массив статей
  currentIndex = 0; // Текущий индекс для отслеживания загруженных статей(строк)
  pageSize = 100; // Количество статей, которые будет загружаться за один раз на страницу
  nextId = 1; // Следующий id для новой статьи
  authors = [
    { id: 1, name: 'Author1', age: 65 },
    { id: 2, name: 'Author2', age: 87 },
    { id: 3, name: 'Author3', age: 43 },
    { id: 4, name: 'Author4', age: 51 },
    { id: 5, name: 'Author5', age: 35 },
  ];

  ngOnInit(): void {
    this.generateRandomData();
  }

  generateRandomData(): void {
    // Генерируем случайные данные для начальной загрузки
    const data: Article[] = [];
    for (let i = 0; i < this.pageSize; i++) {
      data.push(...this.generateArticles());
    }
    this.articles = data;
  }

  loadMoreData(): void {
    // Генерируем дополнительные данные при прокрутке
    const data: Article[] = [];
    for (let i = 0; i < this.pageSize; i++) {
      data.push(...this.generateArticles());
    }
    this.currentIndex += this.pageSize; // Обновляем текущий индекс
    this.articles = [...this.articles, ...data]; // Добавляем новые статьи к уже имеющемуся массиву
  }

  onScroll(): void {
    this.loadMoreData();
  }

  private generateArticles(): Article[] {
    const articles: Article[] = [];
    const authorId = Math.floor(Math.random() * 5) + 1; // Случайный id автора
    const author = this.authors.find((a) => a.id === authorId); // Находим автора по id
    const authorAge = author ? author.age : 0; // Получаем возраст автора, или 0, если автор не найден
    if (authorAge > 50) { // Генерируем статью только если автору больше 50 лет
      articles.push({
        id: this.nextId++,
        title: `Article ${this.nextId}`,
        authorId,
        authorAge,
        isNew: Math.random() < 0.5, // Случайно определяем, является ли статья новой
      });
    }
    return articles;
  }
}