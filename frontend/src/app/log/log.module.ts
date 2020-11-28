import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './log.component';

const ROUTES: Routes = [{ path: '', component: LogComponent }];
@NgModule({
	declarations: [LogComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class LogModule {}
