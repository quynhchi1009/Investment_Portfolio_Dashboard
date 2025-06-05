import { Component } from '@angular/core';
import { FileNode } from '../../models/file-structure.model';
import { FileStructureService } from '../../services/file-structure';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: false,
})
export class SidebarComponent {
  rootNode: FileNode | undefined;

  constructor(private fileStructureService: FileStructureService) {
    this.fileStructureService.getFileStructure().subscribe((data) => {
      this.rootNode = data;
    });
  }

  // Placeholder functions for quick actions
  addNewDeal(): void {
    alert('Adding new deal...');
  }

  generateReport(): void {
    alert('Generating report...');
  }

  openDocuments(): void {
    alert('Opening all documents...');
  }

  runRiskAnalysis(): void {
    alert('Running risk analysis...');
  }

  manageTeams(): void {
    alert('Managing teams...');
  }
}
