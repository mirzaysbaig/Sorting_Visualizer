let array = [];
//let barWidth = 16; // Default width of bars


// this generate the bars when loaded and it is of random heights
// loooked on the container height and width for smooth fit
function createBars() {
    const container = document.getElementById("bar-container");
    container.innerHTML = "";
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const barCount = 100;

    barWidth = Math.floor(containerWidth / barCount);

    const minHeight = containerHeight * 0.02; // 2% of container height

    // Generate array of random heights with height restricted 
    array = Array.from({ length: barCount }, () =>
        Math.floor(Math.random() * (containerHeight - minHeight) + minHeight)
    );

    // Create bar elements
    array.forEach(height => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${height}px`; // fixed string interpolation
        bar.style.width = `${barWidth}px`;
        container.appendChild(bar);
    });
}

// for randomize array function 
function randomizeArray() {
    createBars();
}

// sleep function so we can track the process 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async to pause execution using await sleep function 
// Performing  Insertion Sort on the array by building the sorted part one element at a time.
async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            j--;
            await sleep(10);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
    }
}
// Performs Selection Sort by repeatedly finding the minimum element from the unsorted part
// and swapping it with the first unsorted index.
async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[minIdx].style.height = `${array[minIdx]}px`;
        await sleep(10);
    }
}

// Performs Bubble Sort by repeatedly comparing and swapping adjacent elements
// to move larger elements to the end with each iteration.
async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
                await sleep(10);
            }
        }
    }
}

// for Quick sort operation 
async function quickSortHandler() {
    await quickSort(0, array.length - 1);
}


// Recursively performs Quick Sort using a pivot to partition the array into smaller and larger halves.
// Sorts each half recursively after partitioning.
async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.getElementsByClassName("bar");
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
            await sleep(5);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;
    return i + 1;
}

async function mergeSortHandler() {
    await mergeSort(0, array.length - 1);
}
// performing merge sort 
//Recursively divides the array into halves and sorts each half.
// Merges sorted halves after sorting.
async function mergeSort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    let left = array.slice(l, m + 1);
    let right = array.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    const bars = document.getElementsByClassName("bar");

    while (i < left.length && j < right.length) {
        array[k] = (left[i] <= right[j]) ? left[i++] : right[j++];
        bars[k].style.height = `${array[k]}px`;
        k++;
        await sleep(10);
    }

    while (i < left.length) {
        array[k] = left[i++];
        bars[k].style.height = `${array[k]}px`;
        k++;
        await sleep(30);
    }

    while (j < right.length) {
        array[k] = right[j++];
        bars[k].style.height = `${array[k]}px`;
        k++;
        await sleep(10);
    }
}

// Performs Shell Sort by sorting elements far apart first,
// and reducing the gap to sort closer elements, improving on insertion sort.
async function shellSort() {
    const bars = document.getElementsByClassName("bar");
    let n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
                bars[j].style.height = `${array[j]}px`;
                await sleep(10);
            }
            array[j] = temp;
            bars[j].style.height = `${array[j]}px`;
        }
    }
}
let isBarShrunk = false; // toggle state


// change sze function to shrink the size by 40 percent as peer the container size
function changeSize() {

    // to create the toggle according to container width 
    const container = document.getElementById("bar-container");
    const containerWidth = container.offsetWidth;

       // Alert if too narrow to toggle bar size safely
       if (containerWidth < 550) {
        alert("Minimum width of 550px is required to toggle bar size.");
        return;
    }

    const fullBarWidth = Math.floor(containerWidth / 100);
    // got the bar width 
     // Toggle shrink state
     isBarShrunk = !isBarShrunk;

     // Apply 70% width if shrunk, else 100%
     barWidth = isBarShrunk ? Math.floor(fullBarWidth * 0.6) : fullBarWidth;
 

  

    const bars = document.getElementsByClassName("bar");
    for (let bar of bars) {
        bar.style.width = `${barWidth}px`;
    }
}


// this function to take input from user so we can resize the bar graph container 
// it sends alert on max and min, widht and height 
function applySize() {
    const width = parseInt(document.getElementById("input-width").value);
    const height = parseInt(document.getElementById("input-height").value);
    
    const screenWidth = window.innerWidth;
    // const minHeight = 400;
    const minWidth = 400;
    const screenHeight = window.innerHeight;

    const minHeight = Math.floor(screenHeight * 0.4); 
    if (width < minWidth) {
        alert(`Minimum width must be ${minWidth}px for Smooth View`);
        return;
    }

    if (height < minHeight) {
        alert(`Minimum height must be ${minHeight}px to fit Your Screen Properly`);
        return;
    }

    if (width > screenWidth) {
        alert(`Maximum width allowed is ${screenWidth}px to fit your screen`);
        return;
    }

    const container = document.getElementById("bar-container");
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    createBars();
}


// it loads the bar when window is loaded 
document.addEventListener("DOMContentLoaded", createBars);

