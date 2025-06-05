import { Pipe, PipeTransform } from '@angular/core';
import { FileNode } from '../models/file-structure.model';

@Pipe({
  name: 'filterNodes',
  standalone: false,
})
export class FilterNodesPipe implements PipeTransform {
  transform(nodes: FileNode[] | null, filter: string): FileNode[] {
    if (!nodes || filter === 'all') {
      return nodes || [];
    }

    const lowerCaseFilter = filter.toLowerCase();

    return nodes.filter((node) => {
      const nodeStatus = node.status?.toLowerCase();

      if (node.type === 'entity') {
        // Filter for ENTITIES (Corporate Structure page)
        switch (lowerCaseFilter) {
          case 'active':
            return nodeStatus === 'active';
          case 'review':
          case 'closed':
            return false;
          default: {
            // Filter by industry or jurisdiction for entity
            const entityIndustry = node.industry?.toLowerCase();
            const entityJurisdiction = node.jurisdiction?.toLowerCase();
            return (
              entityIndustry === lowerCaseFilter ||
              entityJurisdiction === lowerCaseFilter
            );
          }
        }
      } else if (node.type === 'investment') {
        // Filter for INVESTMENTS (Portfolio Overview page)
        switch (lowerCaseFilter) {
          case 'active':
            return nodeStatus === 'ongoing';
          case 'review':
            return nodeStatus === 'due diligence';
          case 'closed':
            return nodeStatus === 'closed';
          default: {
            const investmentTags = node.tags?.map((t) => t.toLowerCase()) || [];
            return investmentTags.includes(lowerCaseFilter);
          }
        }
      }
      return false;
    });
  }
}
