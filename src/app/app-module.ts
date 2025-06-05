import { HttpClientModule } from '@angular/common/http'; // <-- Thêm dòng này
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app';
import { CorporateStructureComponent } from './components/corporate-structure/corporate-structure';
import { HeaderComponent } from './components/header/header';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TreeNodeComponent } from './components/tree-node/tree-node';
import { TreeViewComponent } from './components/tree-view/tree-view';
import { FilterNodesPipe } from './pipes/filter-nodes-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CorporateStructureComponent,
    SidebarComponent,
    TreeNodeComponent,
    TreeViewComponent,
    HeaderComponent,
    FilterNodesPipe,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
