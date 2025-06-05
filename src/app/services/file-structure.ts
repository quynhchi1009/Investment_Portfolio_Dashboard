import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardStats } from '../models/dashboard-stats.model';
import { FileNode } from '../models/file-structure.model';

@Injectable({
  providedIn: 'root',
})
export class FileStructureService {
  private readonly dataUrl = '../../assets/data/file-structure.json';

  private readonly fallbackDashboardStats: DashboardStats = {
    companyName: 'Alpha Holdings Ltd.',
    liveDeals: 3,
    assetsUnderManagement: '€125M',
    averageReturn: '18%',
    underReview: 2,
  };

  constructor(private readonly http: HttpClient) {}

  getFileStructure(): Observable<FileNode> {
    return this.http.get<FileNode>(this.dataUrl);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.getFileStructure().pipe(
      map((rootNode) => {
        let liveDealsCount = 0;
        let underReviewCount = 0;
        const companyName =
          rootNode.name || this.fallbackDashboardStats.companyName;

        // Find investment nodes and count their statuses
        const processNode = (node: FileNode) => {
          if (node.type === 'investment') {
            if (node.status && node.status.toLowerCase() === 'ongoing') {
              liveDealsCount++;
            }
            if (node.status && node.status.toLowerCase() === 'due diligence') {
              underReviewCount++;
            }
          }
          if (node.children) {
            node.children.forEach(processNode);
          }
        };

        processNode(rootNode);

        return {
          companyName: companyName,
          liveDeals: liveDealsCount,
          assetsUnderManagement:
            this.fallbackDashboardStats.assetsUnderManagement,
          averageReturn: this.fallbackDashboardStats.averageReturn,
          underReview: underReviewCount,
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(
          'Error loading file structure for dashboard stats:',
          error
        );
        return of(this.fallbackDashboardStats);
      })
    );
  }
}
