# Investment Portfolio Dashboard

This project is an interactive web application built with **Angular** to visualize and manage a hierarchical corporate structure and investment portfolio. It emphasizes a dynamic, user-friendly interface with advanced filtering and navigation capabilities.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

This dashboard offers a comprehensive and interactive experience for portfolio management:

- **Dynamic Data Loading:** All corporate and investment data is loaded dynamically from a local JSON file (`file-structure.json`). This ensures the UI is always up-to-date with the latest portfolio information.
- **Interactive Corporate Structure & Portfolio Navigation:**
  - **Drill-down Capability:** Users can click on any corporate entity (e.g., "Beta Capital GmbH") to seamlessly navigate and view its associated investment portfolio.
  - **Breadcrumb Navigation:** A clear, clickable breadcrumb trail displays the current position within the corporate hierarchy (e.g., `Alpha Holdings Ltd. > Beta Capital GmbH`), allowing for easy navigation back to higher levels.
  - **"Back" Button:** A prominent "Back" button provides a convenient way to step back one level in the navigation history.
- **Intelligent & Context-Aware Filtering System:**
  - Filter tabs ("All", "Active", "Under Review", "Closed Deals") dynamically adjust their filtering logic based on the currently viewed data type (entities or investments).
  - For instance, when viewing investments, the "Active" filter intelligently changes its label to "Ongoing" to reflect the actual investment status within that context.
  - Filter badges display real-time counts of items matching the current filter, providing immediate feedback.
- **Enhanced User Interactivity & Visual Feedback:**
  - **Dynamic Hover Effects:** Subtle hover effects are implemented across various UI elements, including investment/entity cards, filter tabs, recent activity items, and quick action buttons, enhancing the interactive experience.
  - **Conditional Edit Icons:** An "edit" icon dynamically appears on investment and entity cards only when hovered over. Hovering specifically on the icon changes its background color for clear interactivity.
- **Refined Empty State Handling:** A user-friendly "No items match your current filter" message is displayed when no results are found. This is complemented by a styled "Show All" button (inline, underlined, no background) for quickly clearing filters, with consistent text styling aligned with other components.

## Project Structure

The project follows a standard Angular CLI generated structure, organized into modular components and services for maintainability:
Investment_Portfolio_Dashboard/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── corporate-structure/ (Main content area: displays entities/investments, handles navigation & filtering)
│ │ │ ├── header/ (Top section: company overview & stats)
│ │ │ ├── sidebar/ (Right sidebar: recent activity & quick actions)
│ │ │ ├── tree-node/ (Individual node for tree view - currently unused in main UI)
│ │ │ └── tree-view/ (Container for tree view - currently unused in main UI)
│ │ ├── models/ (TypeScript interfaces for data structures)
│ │ ├── pipes/
│ │ │ └── filter-nodes.pipe.ts (Custom pipe for dynamic filtering logic)
│ │ ├── services/
│ │ │ └── file-structure.service.ts (Service to fetch & process data from JSON)
│ │ ├── app.component.ts/.html/.css (Root application component)
│ │ └── app.module.ts (Main Angular module)
│ ├── assets/
│ │ └── data/
│ │ └── file-structure.json (The hierarchical data source)
│ ├── environments/ (Environment-specific configurations)
│ └── styles.css (Global styles)
└── ... (Angular configuration files like angular.json, package.json etc.)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js) or Yarn
- Angular CLI:
  ```bash
  npm install -g @angular/cli
  ```

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/your-username/Investment_Portfolio_Dashboard.git](https://github.com/your-username/Investment_Portfolio_Dashboard.git)
    cd Investment_Portfolio_Dashboard
    ```

    (Replace `your-username/Investment_Portfolio_Dashboard.git` with your actual repository URL)

2.  Install npm dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the application in development mode:

```bash
ng serve --open
```
