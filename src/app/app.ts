import { Component, OnInit } from '@angular/core';
import fileStructure from '../assets/data/file-structure.json';

interface TreeNode {
  name: string;
  type: string;
  owner?: string;
  status?: string;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'Alpha Holdings';
  treeData: TreeNode = fileStructure;

  ngOnInit() {
    console.log('Loaded file structure:', this.treeData);
  }

  // Số lượng child nodes
  getChildCount(node: TreeNode): number {
    return node.children ? node.children.length : 0;
  }

  // Expand/Collapse (tuỳ chỉnh)
  toggleNode(node: TreeNode) {
    node['expanded'] = !node['expanded'];
  }
}
