import { TestBed } from '@angular/core/testing';

import { FileStructure } from './file-structure';

describe('FileStructure', () => {
  let service: FileStructure;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileStructure);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
