import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/theme/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	title = 'selelmore';
	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.setTheme();
	}
}
