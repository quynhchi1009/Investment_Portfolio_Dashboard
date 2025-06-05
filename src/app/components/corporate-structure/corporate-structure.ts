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
  navigationStack: FileNode[] = []; // Stack to track navigation path
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

/**
 * The function `showEntities` sets the section title, filters and updates the content based on the
 * corporate structure entities.
 */
  showEntities(): void {
    this.sectionTitle = 'Corporate Structure';
    this.currentViewChildren =
      this.rootNode?.children?.filter((n) => n.type === 'entity') || [];
    this.currentNode = this.rootNode;
    this.navigationStack = [];
    this.filterContent('all');
    this.updateCounts();
  }

/**
 * The function `showInvestments` updates the navigation stack, current node, and view children based
 * on the provided entity in a TypeScript class.
 * @param {FileNode} entity - The `entity` parameter in the `showInvestments` function represents a
 * `FileNode` object, which is used to display information related to investments. The function sets
 * the section title to 'Portfolio Overview', manages the navigation stack based on the entity, updates
 * the current node, filters the content,
 */
  showInvestments(entity: FileNode): void {
    this.sectionTitle = 'Portfolio Overview';

    // Find the position of the entity in the navigationStack, if it exists, and trim after that
    const entityIndexInStack = this.navigationStack.indexOf(entity);
    if (entityIndexInStack !== -1) {
      this.navigationStack = this.navigationStack.slice(
        0,
        entityIndexInStack + 1
      );
    } else {
      // If entity is not in the stack and currentNode is not that entity, push currentNode before navigating
      if (this.currentNode && this.currentNode !== this.rootNode) {
        this.navigationStack.push(this.currentNode);
      }
    }

    this.currentNode = entity;
    this.currentViewChildren =
      entity.children?.filter((n) => n.type === 'investment') || [];
    this.filterContent('all');
    this.updateCounts();
  }

/**
 * The `goBack` function in TypeScript pops the last node from a navigation stack and updates the
 * display based on the type of the current node.
 */
  goBack(): void {
    if (this.navigationStack.length > 0) {
      this.currentNode = this.navigationStack.pop();
      if (this.currentNode === this.rootNode) {
        this.showEntities();
      } else if (this.currentNode?.type === 'entity') {
        this.showInvestments(this.currentNode);
      }
    } else {
      // Special case: if stack is empty but currentNode is not rootNode, return to root entities
      this.showEntities();
    }
    this.updateCounts();
  }

/**
 * The `filterContent` function in TypeScript sets the `filterType` property to the provided filter
 * string.
 * @param {string} filter - The `filterContent` method takes a `filter` parameter of type string. When
 * this method is called, it sets the `filterType` property of the class to the value of the `filter`
 * parameter.
 */
  filterContent(filter: string): void {
    this.filterType = filter;
  }

/**
 * The function `updateCounts` updates the counts of different statuses based on the type of nodes in
 * the current view.
 * @returns The `updateCounts()` method is not returning any value explicitly. It is a void method,
 * which means it does not return anything. It updates the counts for different statuses based on the
 * current view children.
 */
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

/**
 * The function `getBreadcrumbs` returns an array of `FileNode` objects representing the navigation
 * path from the root node to the current node.
 * @returns The `getBreadcrumbs()` method returns an array of `FileNode` objects representing the
 * breadcrumbs for the current navigation path. The breadcrumbs include the root node, nodes from the
 * navigation stack, and the current node if it is not the root node and is not already included in the
 * breadcrumbs.
 */
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
        !breadcrumbs.includes(this.currentNode)
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

/**
 * The function `formatDate` takes a date string as input and returns a formatted date in the "MMM
 * YYYY" format.
 * @param {string | undefined} dateString - The `dateString` parameter is a string that represents a
 * date in a specific format. The `formatDate` function takes this `dateString` as input, converts it
 * to a `Date` object, and then returns a formatted date string in the format "MMM YYYY" (e.g.,
 * @returns The `formatDate` function takes a `dateString` as input, converts it to a `Date` object,
 * and then returns a formatted date string in the format "MMM YYYY" (e.g., "Jan 2022"). If the
 * `dateString` is undefined, it returns 'N/A'.
 */
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
