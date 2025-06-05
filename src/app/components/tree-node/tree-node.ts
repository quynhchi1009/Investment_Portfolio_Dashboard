import { Component, Input, OnInit } from '@angular/core';
import { FileNode } from '../../models/file-structure.model';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.html',
  styleUrls: ['./tree-node.css'],
  standalone: false,
})
export class TreeNodeComponent implements OnInit {
  @Input() node!: FileNode;
  isExpanded: boolean = false;
  childCount: number = 0;

  ngOnInit(): void {
    this.childCount = this.node.children ? this.node.children.length : 0;
    if (this.node.type === 'entity' || this.node.type === 'investment') {
      this.isExpanded = true;
    }
  }

  toggleNode(): void {
    this.isExpanded = !this.isExpanded;
  }

  getIcon(nodeType: string): string {
    switch (nodeType) {
      case 'entity':
        return '🏢'; // Building
      case 'investment':
        return '💰'; // Money bag
      case 'directory':
        return '📁'; // Folder
      case 'file':
        return '📄'; // Document
      default:
        return '❓'; // Question mark
    }
  }

  getTooltipText(): string {
    let tooltip = '';
    if (this.node.type === 'entity') {
      tooltip += `Jurisdiction: ${this.node.jurisdiction || 'N/A'}\n`;
      tooltip += `Industry: ${this.node.industry || 'N/A'}\n`;
    } else if (this.node.type === 'investment') {
      tooltip += `Status: ${this.node.status || 'N/A'}\n`;
      tooltip += `Tags: ${this.node.tags?.join(', ') || 'N/A'}\n`;
    }
    tooltip += `Owner: ${this.node.owner}\n`;
    tooltip += `Created: ${this.node.created_at}\n`;
    tooltip += `Last Modified: ${this.node.last_modified}`;
    return tooltip;
  }
}
