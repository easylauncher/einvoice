# Fleet Rental Vehicle Invoice Generator

A simple and efficient web-based invoice generator for journey-based expenses. This app allows users to input journey details, including start and end meters, toll charges, and optional fixed pricing. It then calculates the total cost and generates a professional invoice.

## Demo

https://easylauncher.github.io/einvoice

## Features

- **Journey Input Fields**:
  - Start and End Date-Time (15-minute increments).
  - Start and End Meter Readings.
  - Toll Charges and Extra Expenses.
  - Cost Per Kilometer.
  - Fixed Price Option (applied if the distance-based cost is lower).
  - Journey Type (Local or Outstation).

- **Dynamic Invoice Generation**:
  - Automatically calculates total costs based on the input.
  - Applies fixed pricing if configured and applicable.
  - Adapts the invoice display based on whether the fixed price is used.
  
- **Download, Print, and Share**:
  - Download invoices as PDFs.
  - Share invoices directly via supported devices.
  - Print invoices for physical copies.

- **Responsive Design**:
  - Fully optimized for desktop and mobile devices.

- **Test and Production Modes**:
  - Populate sample data in test mode for easier testing.

## Technologies Used

- **Frontend**: HTML5, CSS3, Bootstrap 5
- **JavaScript**: Vanilla JavaScript for form handling and calculations.
- **PDF Generation**: `jsPDF` and `html2canvas` for creating downloadable PDF invoices.

## Installation and Usage

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).
- Internet connection for live deployment or APIs.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/easylauncher/einvoice.git
   cd invoice-generator
   ```
2. Open the index.html file in a web browser.
3. Fill in the input fields for journey details.
4. Click Generate Invoice to view the preview.
5. Download, share, or print the invoice.


### Deployment

- You can deploy this app on any web server or static hosting service like GitHub Pages, Netlify, or Vercel.

#### Deploying to GitHub Pages

- Push the code to a GitHub repository.
- In the repository, go to Settings > Pages.
- Select the branch (e.g., main) and folder (e.g., root) to deploy.
- Your app will be live at https://yourusername.github.io/einvoice.

### Acknowledgments

- Bootstrap for responsive design.
- jsPDF and html2canvas for PDF generation.
- Google Fonts for typography.


