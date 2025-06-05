import { Component, OnInit } from '@angular/core';
import { DashboardStats } from '../../models/dashboard-stats.model';
import { FileStructureService } from '../../services/file-structure';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  dashboardStats: DashboardStats | undefined;

  constructor(private fileStructureService: FileStructureService) {}

  ngOnInit(): void {
    this.fileStructureService.getDashboardStats().subscribe((stats) => {
      this.dashboardStats = stats;
    });
  }
}
