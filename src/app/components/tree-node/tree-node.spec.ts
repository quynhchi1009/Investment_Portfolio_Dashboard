import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNode } from './tree-node';

describe('TreeNode', () => {
  let component: TreeNode;
  let fixture: ComponentFixture<TreeNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeNode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeNode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
