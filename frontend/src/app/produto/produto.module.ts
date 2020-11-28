import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto.component';

const ROUTES: Routes = [
  { path: '', component: ProdutoComponent }
];
@NgModule({
  declarations: [
    ProdutoComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProdutoModule { }