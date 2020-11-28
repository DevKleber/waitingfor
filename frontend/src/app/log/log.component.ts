import { Component, OnInit } from '@angular/core';
import { Log } from './log.model';
import { LogService } from './log.service';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
	selector: 'app-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
	logs: Log[];
	totalCustomerActive: any[] = [];
	totalCustomerSeller: any[] = [];
	totalAccessByUser: any[] = [];
	totalDisplay: any[] = [];
	totalBrowser: any[] = [];
	totalDevice: any[] = [];
	totalLanguage: any[] = [];

	constructor(
		private logService: LogService,
		private loaderService: LoaderService
	) {}

	ngOnInit() {
		this.getLogs();
	}

	getLogs() {
		this.logService.getLogs().subscribe((Log) => {
			this.logs = Log['dados'];
			this.totalCustomerActive = Log['totalCustomerActive'];
			this.totalCustomerSeller = Log['totalCustomerSeller'];
			this.totalAccessByUser = Log['totalAccessByUser'];
			this.totalDisplay = Log['totalDisplay'];
			this.totalBrowser = Log['totalBrowser'];
			this.totalDevice = Log['totalDevice'];
			this.totalLanguage = Log['totalLanguage'];

			this.loaderService.isLoad(false);
		});
	}
}
