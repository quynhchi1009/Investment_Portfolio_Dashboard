export interface FileNode {
  name: string;
  type: 'entity' | 'investment' | 'directory' | 'file';
  jurisdiction?: string;
  created_at: string;
  last_modified: string;
  owner: string;
  status?: string;
  industry?: string;
  tags?: string[];
  children?: FileNode[];
}
