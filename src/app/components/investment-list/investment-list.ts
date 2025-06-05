import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.html',
  styleUrls: ['./investment-list.css'],
  standalone: false,
})
  
export class InvestmentListComponent implements OnInit {
  investments: any[] = [
    {
      id: 'technova',
      name: 'TechNova Series A',
      entity: 'Beta Capital GmbH',
      status: 'active',
      capital: '€15M',
      manager: 'Erik Schmitt',
      lastActivity: 'Jan 2025',
      tags: ['early-stage', 'tech', 'equity-stake'],
    },
    {
      id: 'greenfund',
      name: 'GreenFund Infrastructure',
      entity: 'Beta Capital GmbH',
      status: 'active',
      capital: '€45M',
      manager: 'Anna Müller',
      lastActivity: 'Mar 2025',
      tags: ['infrastructure', 'esg-compliant'],
    },
    {
      id: 'neoretail',
      name: 'NeoRetail Venture Fund',
      entity: 'Beta Capital GmbH',
      status: 'review',
      capital: '€25M',
      manager: 'Sophie Weber',
      lastActivity: 'Feb 2025',
      tags: ['retail-sector', 'venture-capital'],
    },
  ];
  filteredInvestments: any[] = [];
  currentFilter: string = 'all';
  isLoading: boolean = false;

  // Thêm các thuộc tính này
  allInvestmentsCount: number = 0;
  activeInvestmentsCount: number = 0;
  reviewInvestmentsCount: number = 0;
  closedInvestmentsCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.updateCounts(); // Gọi phương thức này để cập nhật số lượng khi khởi tạo
    this.filterInvestments(this.currentFilter);
  }

  updateCounts(): void {
    this.allInvestmentsCount = this.investments.length;
    this.activeInvestmentsCount = this.investments.filter(
      (i) => i.status === 'active'
    ).length;
    this.reviewInvestmentsCount = this.investments.filter(
      (i) => i.status === 'review'
    ).length;
    this.closedInvestmentsCount = this.investments.filter(
      (i) => i.status === 'closed'
    ).length;
  }

  filterInvestments(filter: string): void {
    this.isLoading = true;
    this.currentFilter = filter;

    setTimeout(() => {
      if (filter === 'all') {
        this.filteredInvestments = [...this.investments];
      } else {
        this.filteredInvestments = this.investments.filter(
          (inv) => inv.status === filter
        );
      }
      this.isLoading = false;
    }, 500);
  }

  clearFilters(): void {
    this.filterInvestments('all');
  }

  openDetails(id: string): void {
    alert(`Opening details for: ${id}`);
  }

  editInvestment(id: string): void {
    alert(`Editing investment: ${id}`);
  }

  filterByTag(tag: string): void {
    alert(`Filtering by tag: ${tag}`);
  }
}
