import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	title = 'selelmore';
	theme: string = 'theme-whbl';
	darkmode: boolean;
	pathcss: string = '../assets/css/dark.css';

	setDarkMode() {
		let darkmode = this.themeActive();
		let setDark = darkmode ? false : true;
		localStorage.setItem(
			'darkmodeWaitingFor',
			JSON.parse(setDark.toString())
		);
		this.setTheme();
		return setDark;
	}
	themeActive() {
		return localStorage.getItem('darkmodeWaitingFor') == 'true'
			? true
			: false;
	}

	setTheme() {
		this.darkmode = this.themeActive();
		console.log(this.darkmode);
		this.loadCSS();
	}
	loadCSS() {
		// Get HTML head element
		if (this.darkmode) {
			var head = document.getElementsByTagName('HEAD')[0];

			// Create new link Element
			var link = document.createElement('link');
			// set the attributes for link element
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.id = 'iddarkmode';
			link.href = this.pathcss;
			// Append link element to HTML head
			head.appendChild(link);
		} else {
			var sheet = document.getElementById('iddarkmode');
			if (sheet != null) sheet.parentNode.removeChild(sheet);
		}
	}
}
