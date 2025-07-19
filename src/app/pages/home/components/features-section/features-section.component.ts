import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.css'],
})
export class FeaturesSectionComponent implements OnInit {
  features: string[] = [
    'Detecção em tempo real',
    'Ponteiro visual interativo',
    'Nota e frequência exibidas',
  ];
  constructor() {}

  ngOnInit(): void {}
}
