import { Component, OnInit } from '@angular/core';
import { FileNode } from '../../models/file-structure.model';
import { FileStructureService } from '../../services/file-structure';

@Component({
  selector: 'app-corporate-structure',
  templateUrl: './corporate-structure.html',
  styleUrls: ['./corporate-structure.css'],
  standalone: false,

})
export class CorporateStructureComponent implements OnInit {
  rootNode: FileNode | undefined;
  currentNode: FileNode | undefined;
  currentViewChildren: FileNode[] = [];
  navigationStack: FileNode[] = [];
  sectionTitle: string = 'Corporate Structure';
  filterType: string = 'all';

  allCount: number = 0;
  activeCount: number = 0;
  reviewCount: number = 0;
  closedCount: number = 0;

  constructor(private fileStructureService: FileStructureService) {}

  ngOnInit(): void {
    this.fileStructureService.getFileStructure().subscribe((data) => {
      this.rootNode = data;
      this.currentNode = data;
      this.showEntities();
    });
  }

  showEntities(): void {
    this.sectionTitle = 'Corporate Structure';
    this.currentViewChildren =
      this.rootNode?.children?.filter((n) => n.type === 'entity') || [];
    this.navigationStack = [];
    this.filterContent('all');
    this.updateCounts();
  }

  showInvestments(entity: FileNode): void {
    this.sectionTitle = 'Portfolio Overview';
    this.navigationStack.push(this.currentNode as FileNode);
    this.currentNode = entity;
    // Get all investment children of that entity
    this.currentViewChildren =
      entity.children?.filter((n) => n.type === 'investment') || [];
    this.filterContent('all');
    this.updateCounts();
  }

  goBack(): void {
    if (this.navigationStack.length > 0) {
      this.currentNode = this.navigationStack.pop();
      if (this.currentNode === this.rootNode) {
        this.showEntities();
      } else if (this.currentNode?.type === 'entity') {
        this.showInvestments(this.currentNode);
      }
    } else {
      this.showEntities();
    }
    this.updateCounts();
  }

  filterContent(filter: string): void {
    this.filterType = filter;
  }

  // --- Logic to update badge counts (important) ---
  updateCounts(): void {
    if (!this.currentViewChildren) {
      this.allCount = 0;
      this.activeCount = 0;
      this.reviewCount = 0;
      this.closedCount = 0;
      return;
    }

    this.allCount = this.currentViewChildren.length;
    this.activeCount = 0;
    this.reviewCount = 0;
    this.closedCount = 0;

    this.currentViewChildren.forEach((node) => {
      const status = node.status?.toLowerCase();
      if (node.type === 'entity') {
        if (status === 'active') {
          this.activeCount++;
        }
        // Add logic for 'review'/'closed' if entity has these statuses in the future
      } else if (node.type === 'investment') {
        if (status === 'ongoing') {
          this.activeCount++;
        } else if (status === 'due diligence') {
          this.reviewCount++;
        } else if (status === 'closed') {
          this.closedCount++;
        }
      }
    });
  }

  // Methods to get breadcrumbs, icon, status text, amount label, etc.
  getBreadcrumbs(): FileNode[] {
    const breadcrumbs: FileNode[] = [];
    if (this.rootNode) {
      breadcrumbs.push(this.rootNode);
      this.navigationStack.forEach((node) => {
        if (node !== this.rootNode) {
          breadcrumbs.push(node);
        }
      });
      if (
        this.currentNode &&
        this.currentNode !== this.rootNode &&
        !this.navigationStack.includes(this.currentNode)
      ) {
        breadcrumbs.push(this.currentNode);
      }
    }
    return breadcrumbs;
  }

  getInvestmentCount(node: FileNode): number {
    return node.children?.filter((c) => c.type === 'investment').length || 0;
  }

  getNodeStatusLower(node: FileNode): string {
    return node.status?.toLowerCase() || '';
  }

  getNodeIndustryLower(node: FileNode): string {
    return node.industry?.toLowerCase() || '';
  }

  getNodeJurisdictionLower(node: FileNode): string {
    return node.jurisdiction?.toLowerCase() || '';
  }

  getInvestmentStatusText(status: string | undefined): string {
    if (!status) return '';
    return status === 'Due Diligence' ? 'Under Review' : status;
  }

  getInvestmentAmountLabel(status: string | undefined): string {
    if (!status) return 'Amount';
    return status === 'Due Diligence' ? 'Target Investment' : 'Amount Invested';
  }

  openDetails(node: FileNode): void {
    alert(`Opening detailed view for: ${node.name} (Type: ${node.type})`);
  }

  editNode(node: FileNode): void {
    alert(`Editing: ${node.name} (Type: ${node.type})`);
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
