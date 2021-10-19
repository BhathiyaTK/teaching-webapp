import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-more-less',
  templateUrl: './read-more-less.component.html',
  styleUrls: ['./read-more-less.component.css']
})
export class ReadMoreLessComponent implements OnInit {

  @Input() content: string;
  @Input() limit: number;
  @Input() completeWords: boolean;

  isContentToggled: boolean;
  nonEditedContent: string;

  constructor() { }

  ngOnInit(): void {
    this.nonEditedContent = this.content;
    this.content = this.formatContent(this.content);
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.content = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substr(0, this.limit).lastIndexOf('');
    }
    return `${content.substr(0, this.limit)}...`;
  }

}
