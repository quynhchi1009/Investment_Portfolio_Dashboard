import { Pipe, PipeTransform } from '@angular/core';
import { FileNode } from '../models/file-structure.model';

@Pipe({
  name: 'filterNodes',
  standalone: false,
})
export class FilterNodesPipe implements PipeTransform {
/**
 * The function `transform` filters an array of `FileNode` objects based on a specified filter criteria
 * for different types of nodes.
 * @param {FileNode[] | null} nodes - The `nodes` parameter is an array of `FileNode` objects or
 * `null`.
 * @param {string} filter - The `filter` parameter is used to determine how the `nodes` array should be
 * filtered. The function checks the type of each node in the array (`entity` or `investment`) and
 * applies specific filtering logic based on the `filter` value provided.
 * @returns The `transform` function takes in an array of `FileNode` objects and a filter string. It
 * filters the nodes based on the filter criteria provided. If the nodes array is null or the filter is
 * set to 'all', it returns an empty array. Otherwise, it filters the nodes based on their type
 * ('entity' or 'investment') and the filter criteria.
 */
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
