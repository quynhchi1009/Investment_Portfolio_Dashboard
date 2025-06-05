import { Component, Input, OnInit } from '@angular/core';
import { FileNode } from '../../models/file-structure.model';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.html',
  styleUrls: ['./tree-view.css'],
  standalone: false,
})
export class TreeViewComponent implements OnInit {
  @Input() node!: FileNode;

  constructor() {}

  ngOnInit(): void {
    // console.log('Tree View Root Node:', this.node);
  }
}
