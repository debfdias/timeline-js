# Timeline Component

A React-based timeline visualization component that efficiently arranges items in horizontal lanes.

<img width="1378" alt="Screenshot 2025-04-12 at 11 39 45" src="https://github.com/user-attachments/assets/2c5d596b-e7f0-4b34-a2d5-29527e8e3940" />


## Features

- Efficient lane assignment using the provided `assignLanes` method
- Zoom in/out functionality
- Responsive design
- Clean, modern UI with hover effects
- Date formatting for better readability
- Color-coded tasks based on duration:
  - Green: 1-day tasks
  - Pink: 2-5 days tasks
  - Purple: 6+ days tasks
- Interactive tooltips showing full task details

## Design Decisions

### Layout Algorithm

I used the provided `assignLanes` function which efficiently arranges items in lanes by:

1. Sorting items by start date
2. Assigning each item to the first available lane where it doesn't overlap with existing items
3. Creating new lanes when necessary

### UI/UX Choices

- Used a horizontal timeline layout for better readability
- Implemented zoom controls to handle different time scales
- Added hover effects for better interactivity
- Color-coded tasks for quick duration identification
- Included both item names and dates for better context
- Made items responsive to available space
- Added informative tooltips showing full task details and duration

### Technical Implementation

- Used React hooks for state management
- Implemented CSS Grid and Flexbox for responsive layout
- Used relative positioning for precise item placement
- Added smooth transitions for better user experience
- Dynamic color assignment based on task duration

## What I Like About This Implementation

1. **Efficient Layout**: The lane assignment algorithm ensures optimal space usage
2. **Responsive Design**: The timeline adapts well to different screen sizes
3. **Clean Code**: The component is well-structured and easy to maintain
4. **User-Friendly**: The zoom controls, hover effects, and color coding make it easy to interact with and understand
5. **Visual Hierarchy**: Color-coded durations help quickly identify task lengths

## What I Would Change

1. **Drag and Drop**: Add the ability to drag and drop items to change their dates
2. **Inline Editing**: Allow editing item names directly in the timeline
3. **Date Range Selection**: Add the ability to select and view specific date ranges
4. **More Visual Features**: Add icons or other visual indicators
5. **Performance Optimization**: Implement virtualization for handling large datasets

## Testing Strategy

If I had more time, I would implement the following tests:

1. **Unit Tests**:

   - Test the lane assignment algorithm with various scenarios
   - Test date formatting and calculations
   - Test zoom functionality
   - Test color assignment logic

2. **Integration Tests**:

   - Test the complete timeline rendering
   - Test interaction between components
   - Test tooltip behavior

3. **Visual Regression Tests**:

   - Ensure consistent rendering across different screen sizes
   - Test with different datasets
   - Verify color coding implementation

4. **Performance Tests**:
   - Test with large datasets
   - Measure rendering time and memory usage

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open your browser to `http://localhost:3000`
