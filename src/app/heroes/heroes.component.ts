import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  // selectedHero: Hero; // for quick editing

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) return;

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero))
  }

  delete(chosenHero: Hero): void {
    // this.heroes = this.heroes.filter(hero => hero !== chosenHero); // quickly UI reaction

    this.heroService.deleteHero(chosenHero).subscribe(() =>
      this.heroes = this.heroes.filter(hero => hero !== chosenHero)
    );
  }

  // for quick editing
  /* onSelect(hero: Hero): void {
    this.selectedHero = hero;
  } */
}
