import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FileNode } from '../models/file-structure.model';
import { DashboardStats } from '../models/dashboard-stats.model';

@Injectable({
  providedIn: 'root',
})
export class FileStructureService {
  private dataUrl = '../../assets/data/file-structure.json';

  private dummyDashboardStats: DashboardStats = {
    liveDeals: 3,
    assetsUnderManagement: '€125M',
    averageReturn: '18%',
    underReview: 2,
  };

  constructor(private http: HttpClient) {}

  getFileStructure(): Observable<FileNode> {
    return this.http.get<FileNode>(this.dataUrl);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return of(this.dummyDashboardStats);
  }
}
