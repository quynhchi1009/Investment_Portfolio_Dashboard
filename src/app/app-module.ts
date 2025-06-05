import { HttpClientModule } from '@angular/common/http'; // <-- Thêm dòng này
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app';
import { HeaderComponent } from './components/header/header';
import { InvestmentListComponent } from './components/investment-list/investment-list';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TreeNodeComponent } from './components/tree-node/tree-node';
import { TreeViewComponent } from './components/tree-view/tree-view';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentListComponent,
    SidebarComponent,
    TreeNodeComponent,
    TreeViewComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
