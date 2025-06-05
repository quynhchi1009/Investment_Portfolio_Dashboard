import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileNode } from '../models/file-structure.model';

@Injectable({
  providedIn: 'root',
})
export class FileStructureService {
  private dataUrl = '../../assets/data/file-structure.json';

  constructor(private http: HttpClient) {}

  getFileStructure(): Observable<FileNode> {
    return this.http.get<FileNode>(this.dataUrl);
  }
}
