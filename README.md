# Motorway Toll Dashboard

## Overview
The Motorway Toll Dashboard is a modern web application designed to monitor and analyze vehicle data on motorways. It provides real-time insights, analytics, and management tools for vehicle tracking, entry/exit logs, and more.

## Features
- **Real-Time Vehicle Feed**: Monitor vehicles currently on the motorway.
- **Analytics**: Time-based and traffic flow analytics.
- **Entry/Exit Logs**: Track vehicle entry and exit data.
- **Performance Metrics**: View motorway statistics and performance.
- **Alert Management**: Manage alerts (coming soon).
- **Reports**: Generate reports and documentation.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Data Handling**: CSV-based vehicle data processing

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AbdullahRaoo/motorway-toll.git
   ```
2. Navigate to the project directory:
   ```bash
   cd motorway-toll
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Usage
- **Development**: Run the development server:
  ```bash
  pnpm dev
  ```
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- **Production**: Build and start the production server:
  ```bash
  pnpm build
  pnpm start
  ```

## Project Structure
- `app/`: Contains the main application pages and layout.
- `components/`: Reusable UI components.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and data processing logic.
- `public/`: Static assets like images and CSV files.
- `styles/`: Global CSS styles.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [Radix UI](https://www.radix-ui.com/) for accessible UI components.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- [Next.js](https://nextjs.org/) for the React framework.
