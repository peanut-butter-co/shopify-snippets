# Shopify Sales Tracking System

This repository contains a Shopify Flow implementation that tracks and displays product sales in real-time over a 24-hour period. The system consists of two main components:

1. A Shopify Flow that processes orders and updates sales metrics
2. Front-end code to display the sales information to customers

## How It Works

### Sales Tracking Flow

The Flow is triggered whenever a new order is created and performs the following operations:

1. **Time Processing**
   - Converts the order creation time to the shop's timezone
   - Rounds timestamps to the nearest 15-minute interval for consistent tracking
   - Uses a `yyyymmddhhmm` format for date storage (e.g., "202404071430" for April 7, 2024, 14:30)

2. **Sales Data Management**
   - Maintains a rolling 24-hour window of sales data
   - Stores sales data in product metafields (`fomo.sales`)
   - Automatically removes sales data older than 24 hours

3. **Data Structure**
   Each product's sales data is stored as an array of objects:
   ```javascript
   [
     {
       date: "202404071430",
       quantity: 2
     },
     // ... more sales entries
   ]
   ```

### Key Features

- **Time Zone Handling**: Automatically adjusts timestamps to match the store's timezone
- **Data Consolidation**: Combines multiple purchases of the same product within the same 15-minute window
- **Automatic Cleanup**: Removes sales data older than 24 hours to maintain relevant information
- **Error Handling**: Includes validation for data format and skips processing for invalid entries
- **POS Integration**: Handles special cases for POS sales

## Technical Implementation

### Flow Configuration

The Flow should be configured with the following:

1. Trigger: Order creation
2. Action: Run code (using the provided JavaScript)
3. Output: Updates product metafields with new sales data

#### Important: Metafield Alias Setup

When importing the Flow, you'll need to set up an alias for the `fomo.sales` metafield in the GraphQL query. Here's how to do it:
1. Create the fomo.sales metafield as JSON and fomo.total_units_sold as Integer
2. In the "Log Output" node (before the Run Code node):
- Click "Add a variable"
- Search for order > lineItems > Product > Metafield > Fomo.sales metafield and defined its alias as fomoSales
- This creates the alias that can be used in the Run Code node.
3. The alias `fomoSales` will now be available in the Run Code node, allowing access to the `fomo.sales` metafield data. 

This step is crucial for the Flow to work correctly, as it establishes the connection between the metafield and the code's variable naming.

### Code Components

The implementation includes several key functions:

- `roundToNextQuarter()`: Rounds timestamps to the nearest 15-minute interval
- `removeOldSales()`: Filters out sales data older than 24 hours
- `main()`: Primary function that processes orders and updates sales data

## Usage

1. Set up the Shopify Flow with the provided code
2. Install the necessary front-end components in your theme
3. Add the sales display snippets where needed in your theme

## Front-end Integration

The sales data can be accessed through product metafields and displayed using the included theme components. The system provides a customizable section block that can be added to product pages.

### Block Configuration Options

The Fomo Sales block includes the following configuration options:

1. **Sales Calculation Mode**
   - `render_mode`: Select a sales calculation method:
     - `sales_array`: Totals sales from the last 24 hours. More accurate but less performant due to looping through all sales. Recommended method.
     - `total`: Uses the pre-calculated `fomo.total_units_sold` metafield. More performant but less precise as it updates only on new sales. Suitable for high sales volume stores.

2. **Sales Adjustment**
   - `increase_by`: Optional percentage to increase displayed sales numbers
     - Example: If set to 10, adds 10% to the actual sales numbers
     - Useful for combining online and in-store sales data

3. **Display Control**
   - `minimum_sales`: Minimum number of sales required before displaying the message
     - Message will only show if total sales meet or exceed this threshold
     - Leave blank to always show the message

4. **Message Customization**
   - `message`: Custom message template with variable support
     - Uses `[total_sales]` placeholder to insert the sales number
     - Example: "🔥 [total_sales] sold in the last 24 hours!"

### Implementation

The snippet automatically:
- Calculates sales based on the chosen render mode
- Applies any configured sales increase
- Checks minimum sales threshold
- Renders a custom element `<fomo-message>` with the configured message
- Updates the block every 5 seconds using JavaScript to ensure the displayed sales data is current

Example usage in theme:
```liquid
{% section 'fomo-sales' %}
```

The message is rendered through a JavaScript component (`fomo-message.js`) that handles the dynamic display and updates.

## Limitations

- Sales data is rounded to 15-minute intervals
- Maximum 24-hour history
- Requires Shopify Flow and metafield capabilities


