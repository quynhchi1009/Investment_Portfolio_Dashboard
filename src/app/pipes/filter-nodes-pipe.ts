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

    return nodes.filter((node) => {
      const status = node.status?.toLowerCase();
      const industry = node.industry?.toLowerCase();
      const jurisdiction = node.jurisdiction?.toLowerCase();
      const tags = node.tags?.map((t) => t.toLowerCase()) || [];

      switch (filter) {
        case 'active':
          return (
            (node.type === 'entity' && status === 'active') ||
            (node.type === 'investment' && status === 'ongoing')
          );
        case 'review':
          return node.type === 'investment' && status === 'due diligence';
        case 'closed':
          return node.type === 'investment' && status === 'closed';
        default:
          return (
            tags.includes(filter.toLowerCase()) ||
            industry === filter.toLowerCase() ||
            jurisdiction === filter.toLowerCase()
          );
      }
    });
  }
}
