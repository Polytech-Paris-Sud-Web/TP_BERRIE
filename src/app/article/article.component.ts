import {Component, Input, Output, OnInit} from '@angular/core';
import {Article} from '../models/article';
import { EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;

  @Output()
  deletedArticle: EventEmitter<Article> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      this.article = await this.articleService.getById(params.get('id')).toPromise();
    });
  }

  delete(): void {
    this.deletedArticle.emit(this.article);
  }

}
