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
      this.currentNode?.children?.filter((n) => n.type === 'entity') || [];
    this.filterContent('all');
  }

  showInvestments(entity: FileNode): void {
    this.sectionTitle = 'Portfolio Overview';
    this.navigationStack.push(this.currentNode as FileNode);
    this.currentNode = entity;
    this.currentViewChildren =
      entity.children?.filter((n) => n.type === 'investment') || [];
    this.filterContent('all');
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
  }

  filterContent(filter: string): void {
    this.filterType = filter;
  }

  getBreadcrumbs(): FileNode[] {
    const breadcrumbs: FileNode[] = [];
    if (this.rootNode) {
      breadcrumbs.push(this.rootNode);

      // Iterate through the stack to add visited nodes
      this.navigationStack.forEach((node) => {
        if (node !== this.rootNode) {
          // Avoid duplication if rootNode is also in the stack
          breadcrumbs.push(node);
        }
      });
      // Add the current node if it is not the root node and not in the stack
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
    if (!status) return 'Amount'; // Default label
    return status === 'Due Diligence' ? 'Target Investment' : 'Amount Invested';
  }

  // Placeholder functions for card actions
  openDetails(node: FileNode): void {
    alert(`Opening details for: ${node.name}`);
  }

  editNode(node: FileNode): void {
    alert(`Editing: ${node.name}`);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
