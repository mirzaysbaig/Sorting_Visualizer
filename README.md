# Sorting_Visualizer

This is a web-based Sorting Visualizer built using HTML, CSS, and JavaScript. It dynamically visualizes various sorting algorithms, allowing users to better understand how sorting works through animated bar movements.

🔧 Features
🎛️ User Input Customization

Set custom width and height of the bar container.

Bars are generated with random heights automatically based on the container size.

📊 Bar Generation

100 bars generated with random heights on page load.

Minimum height of any bar is at least 2% of the container height.

Automatic resizing using the changeSize() function that adapts to screen size (shrinks to 60% width for compact view).

⚠️ Smart Alerts for UI Constraints

Minimum width alert: Widths below 400px will pop a message to maintain smooth visualization.

Maximum width alert: Widths beyond screen limit (e.g. 2000px) will trigger an alert to keep layout responsive.

Minimum height alert: Heights less than 40% of screen height are prevented for better usability.

Change size alert: If bar container width is less than 550px, shrinking bars is not allowed and a warning appears.

🔄 Randomize Button

Regenerates a new random array of bar heights without changing container dimensions.

✨ Sorting Algorithms Implemented

Bubble Sort – Repeatedly swaps adjacent elements if they are in the wrong order.

Selection Sort – Selects the minimum element and places it at the beginning.

Insertion Sort – Builds the sorted array by picking one element at a time and inserting it in the correct position.

Quick Sort – Uses divide and conquer strategy, partitions array and sorts recursively.

Merge Sort – Divides the array into halves, sorts, and merges them back.

Shell Sort – Optimized version of insertion sort by comparing distant elements.

📂 Project Structure
bash
Copy
Edit
SortingVisualizer/
├── index.html          # Main HTML file
├── style.css           # Styling and layout
└── script.js           # Sorting logic and DOM interaction
🚀 Deployment
This project is live on Vercel at:
🔗 https://sorting-visualizer-aotrxzv7g-mirzas-projects-d9144c94.vercel.app

📸 Preview

💡 Future Improvements
Add controls for animation speed.

Highlight swapped bars during animations.

Add more algorithms (e.g., Heap Sort, Radix Sort).

🛠️ Tech Stack
HTML

CSS (Flexbox for layout)

JavaScript (DOM manipulation, event handling, async operations)

