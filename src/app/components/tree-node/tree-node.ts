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

/**
 * The `toggleNode` function toggles the `isExpanded` property between true and false.
 */
  toggleNode(): void {
    this.isExpanded = !this.isExpanded;
  }

/**
 * The function `getIcon` takes a `nodeType` string as input and returns a corresponding emoji icon
 * based on the type.
 * @param {string} nodeType - The `nodeType` parameter is a string that represents the type of a node
 * in a system. It can have values like 'entity', 'investment', 'directory', or 'file'.
 * @returns The `getIcon` function returns an emoji icon based on the `nodeType` parameter. If the
 * `nodeType` is 'entity', it returns '🏢', if it is 'investment', it returns '💰', if it is
 * 'directory', it returns '📁', if it is 'file', it returns '📄', and if it is none of
 */
  getIcon(nodeType: string): string {
    switch (nodeType) {
      case 'entity':
        return '🏢';
      case 'investment':
        return '💰';
      case 'directory':
        return '📁';
      case 'file':
        return '📄';
      default:
        return '❓';
    }
  }

/**
 * The getTooltipText function generates a tooltip text based on the type of node (entity or
 * investment) and its properties.
 * @returns The `getTooltipText()` method returns a string that contains information about a node. The
 * tooltip text includes details such as jurisdiction, industry, status, tags, owner, creation date,
 * and last modified date of the node. The specific information displayed in the tooltip depends on the
 * type of the node (entity or investment) and the available data for that node.
 */
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
