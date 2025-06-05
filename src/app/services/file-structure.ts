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
    companyType: 'Financial Services Entity',
    jurisdiction: 'United Kingdom',
    establishedDate: 'January 2020',
    companyStatus: 'Active',
    companyOwner: 'Global HQ',
    liveDeals: 3,
    assetsUnderManagement: '€125M',
    averageReturn: '18%',
    underReview: 2,
  };

  constructor(private readonly http: HttpClient) {}

/**
 * The getFileStructure function returns an Observable of type FileNode by making an HTTP GET request
 * to a specified data URL.
 * @returns An Observable of type FileNode is being returned.
 */
  getFileStructure(): Observable<FileNode> {
    return this.http.get<FileNode>(this.dataUrl);
  }

/**
 * The function `getDashboardStats` retrieves and processes data from a file structure to generate
 * statistics for a dashboard.
 * @returns The `getDashboardStats()` method returns an Observable of type `DashboardStats`. The method
 * first retrieves the file structure using `this.getFileStructure()` method, then processes the root
 * node to collect various entity details and count the statuses of investment nodes to determine the
 * number of live deals and deals under review. Finally, it returns an object containing the dashboard
 * statistics such as company name, type, jurisdiction, established
 */
  getDashboardStats(): Observable<DashboardStats> {
    return this.getFileStructure().pipe(
      map((rootNode) => {
        let liveDealsCount = 0;
        let underReviewCount = 0;

        // Collect entity details from the root node
        const companyName =
          rootNode.name || this.fallbackDashboardStats.companyName;
        const companyType = rootNode.industry
          ? `${rootNode.industry} Entity`
          : this.fallbackDashboardStats.companyType;
        const jurisdiction =
          rootNode.jurisdiction || this.fallbackDashboardStats.jurisdiction;
        const establishedDate = rootNode.created_at
          ? new Date(rootNode.created_at).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })
          : this.fallbackDashboardStats.establishedDate;
        const companyStatus =
          rootNode.status || this.fallbackDashboardStats.companyStatus;
        const companyOwner =
          rootNode.owner || this.fallbackDashboardStats.companyOwner;

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
          companyType: companyType,
          jurisdiction: jurisdiction,
          establishedDate: establishedDate,
          companyStatus: companyStatus,
          companyOwner: companyOwner,
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
