import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Options } from './options/options';
import { About } from './about/about';
import { Features } from './features/features';
import { KeyFeatures } from './key-features/key-features';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    Options,
    About,
    Features,
    KeyFeatures
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}
