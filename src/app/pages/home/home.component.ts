import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NewsCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  featured: ReturnType<NoticiasService['getFeatured']> = [];
  latestNews: ReturnType<NoticiasService['getAll']> = [];

  constructor(private readonly noticiasService: NoticiasService) {
    this.featured = this.noticiasService.getFeatured();
    this.latestNews = this.noticiasService.getAll().slice(0, 4);
  }
}
