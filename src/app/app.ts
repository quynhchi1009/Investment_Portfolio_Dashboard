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
  title = 'Investment Portfolio Dashboard';
  treeData: TreeNode = fileStructure;

  ngOnInit() {
    console.log('Loaded file structure:', this.treeData);
  }

/**
 * The function `getChildCount` returns the number of children a given `TreeNode` has, or 0 if it has
 * no children.
 * @param {TreeNode} node - The `node` parameter in the `getChildCount` function is of type `TreeNode`.
 * @returns The function `getChildCount` returns the number of children nodes of the input `TreeNode`
 * node. If the `node` has children, it returns the length of the children array. Otherwise, it returns
 * 0.
 */
  getChildCount(node: TreeNode): number {
    return node.children ? node.children.length : 0;
  }

/**
 * The function `toggleNode` toggles the `expanded` property of a TreeNode object.
 * @param {TreeNode} node - The `node` parameter in the `toggleNode` function is of type `TreeNode`.
 */
  toggleNode(node: TreeNode) {
    node['expanded'] = !node['expanded'];
  }
}
