let array = [];
        let arraySize = 30;
        let animationSpeed = 50;
        let isSorting = false;
        let isSearching = false;
        let currentMode = 'sorting';
        let currentAlgorithm = 'bubble';

        const arrayContainer = document.getElementById('arrayContainer');
        const startBtn = document.getElementById('startBtn');
        const resetBtn = document.getElementById('resetBtn');
        const randomBtn = document.getElementById('randomBtn');
        const searchBtn = document.getElementById('searchBtn');
        const addTargetBtn = document.getElementById('addTargetBtn');
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        const searchInput = document.getElementById('searchInput');
        const algoButtons = document.querySelectorAll('.algo-btn');
        const algoInfo = document.getElementById('algoInfo');
        const modeButtons = document.querySelectorAll('.mode-btn');
        const sortingAlgos = document.getElementById('sortingAlgos');
        const searchingAlgos = document.getElementById('searchingAlgos');
        const algoLabel = document.getElementById('algoLabel');
        const searchControls = document.getElementById('searchControls');
        const searchResult = document.getElementById('searchResult');
        const targetValue = document.getElementById('targetValue');

        const algorithmInfo = {
            bubble: {
                name: 'Bubble Sort',
                description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they\'re in the wrong order.',
                complexity: 'Time Complexity: O(n²) | Space Complexity: O(1)'
            },
            selection: {
                name: 'Selection Sort',
                description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining array.',
                complexity: 'Time Complexity: O(n²) | Space Complexity: O(1)'
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'Builds the final sorted array one item at a time by inserting elements into their correct position.',
                complexity: 'Time Complexity: O(n²) | Space Complexity: O(1)'
            },
            merge: {
                name: 'Merge Sort',
                description: 'Divides the array into two halves, recursively sorts them, and then merges the sorted halves.',
                complexity: 'Time Complexity: O(n log n) | Space Complexity: O(n)'
            },
            quick: {
                name: 'Quick Sort',
                description: 'Picks a pivot element and partitions the array around it, then recursively sorts the partitions.',
                complexity: 'Time Complexity: O(n log n) avg | Space Complexity: O(log n)'
            },
            linear: {
                name: 'Linear Search',
                description: 'Sequentially checks each element of the array until the target element is found or the end is reached.',
                complexity: 'Time Complexity: O(n) | Space Complexity: O(1)'
            },
            binary: {
                name: 'Binary Search',
                description: 'Efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half.',
                complexity: 'Time Complexity: O(log n) | Space Complexity: O(1)'
            }
        };

        function generateArray() {
            array = [];
            for (let i = 0; i < arraySize; i++) {
                array.push(Math.floor(Math.random() * 300) + 10);
            }
            renderArray();
        }

        function renderArray(comparingIndices = [], swappingIndices = [], sortedIndices = [], foundIndex = -1, showValues = false) {
            arrayContainer.innerHTML = '';
            const containerWidth = arrayContainer.clientWidth - 20;
            const barWidth = Math.max(2, (containerWidth / arraySize) - 2);
            
            array.forEach((value, index) => {
                const bar = document.createElement('div');
                bar.className = 'array-bar';
                bar.style.height = `${value}px`;
                bar.style.width = `${barWidth}px`;
                
                if (foundIndex === index) {
                    bar.classList.add('found');
                } else if (sortedIndices.includes(index)) {
                    bar.classList.add('sorted');
                } else if (comparingIndices.includes(index)) {
                    bar.classList.add('comparing');
                } else if (swappingIndices.includes(index)) {
                    bar.classList.add('swapping');
                }
                
                if (showValues && arraySize <= 50) {
                    const valueLabel = document.createElement('div');
                    valueLabel.className = 'bar-value';
                    valueLabel.textContent = value;
                    // bar.appendChild(valueLabel);
                }
                
                arrayContainer.appendChild(bar);
            });
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        //bubble sort
        async function bubbleSort() {
            const n = array.length;
            
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (!isSorting) return;
                    
                    renderArray([j, j + 1], [], []);
                    await sleep(101 - animationSpeed);
                    
                    if (array[j] > array[j + 1]) {
                        renderArray([], [j, j + 1], []);
                        await sleep(101 - animationSpeed);
                        
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        renderArray([], [j, j + 1], []);
                        await sleep(101 - animationSpeed);
                    }
                }
            }
            
            renderArray([], [], Array.from({length: n}, (_, i) => i));
            isSorting = false;
            startBtn.disabled = false;
            startBtn.textContent = 'Sort';
        }


        async function selectionSort() {
            const n = array.length;

            for (let i = 0; i < n - 1; i++) {
                if (!isSorting) return;

                let minIndex = i;

                renderArray([i], [], [], -1);
                await sleep(101 - animationSpeed);

                for (let j = i + 1; j < n; j++) {
                    if (!isSorting) return;

                    renderArray([minIndex, j], [], [], -1);
                    await sleep(101 - animationSpeed);

                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
                }

                if (minIndex !== i) {
                    renderArray([], [i, minIndex], [], -1);
                    await sleep(101 - animationSpeed);

                    let temp = array[i];
                    array[i] = array[minIndex];
                    array[minIndex] = temp;

                    renderArray([], [i, minIndex], [], -1);
                    await sleep(101 - animationSpeed);
                }
            }

            renderArray([], [], Array.from({ length: n }, (_, i) => i));

            isSorting = false;
            startBtn.disabled = false;
            startBtn.textContent = 'Sort';
        }
        async function insertionSort() {
            const n = array.length;

            for (let i = 1; i < n; i++) {
                if (!isSorting) return;

                let key = array[i];
                let j = i - 1;

                renderArray([i], [], [], -1);
                await sleep(101 - animationSpeed);

                while (j >= 0 && array[j] > key) {
                    if (!isSorting) return;

                    renderArray([j, j+1], [], [], -1);
                    await sleep(101 - animationSpeed);

                    array[j + 1] = array[j]; 
                    j--;

                    renderArray([], [j+1], [], -1);
                    await sleep(101 - animationSpeed);
                }

                array[j + 1] = key;

                renderArray([], [j+1], [], -1);
                await sleep(101 - animationSpeed);
            }

            renderArray([], [], Array.from({ length: n }, (_, i) => i));

            isSorting = false;
            startBtn.disabled = false;
            startBtn.textContent = "Sort";
        }
        async function mergeSortHelper(left, right) {
            if (!isSorting) return;
            if (left >= right) return;

            const mid = Math.floor((left + right) / 2);

            await mergeSortHelper(left, mid);
            await mergeSortHelper(mid + 1, right);

            let i = left, j = mid + 1;
            let temp = [];

            while (i <= mid && j <= right) {
                if (!isSorting) return;

                renderArray([i, j], [], [], -1);
                await sleep(101 - animationSpeed);

                if (array[i] <= array[j]) {
                    temp.push(array[i]);
                    i++;
                } else {
                    temp.push(array[j]);
                    j++;
                }
            }
            while (i <= mid) temp.push(array[i++]);
            while (j <= right) temp.push(array[j++]);

            for (let k = left; k <= right; k++) {
            array[k] = temp[k - left];

                renderArray([], [k], [], -1);
                await sleep(81 - animationSpeed);
            }
        }

        async function mergeSort() {
            await mergeSortHelper(0, array.length - 1);

            renderArray([], [], Array.from({length: array.length}, (_, i) => i));
            isSorting = false;
            startBtn.disabled = false;
            startBtn.textContent = "Sort";
        }

        async function partition(low, high) {
            let pivot = array[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                if (!isSorting) return -1;

                renderArray([j, high], [], [], -1);
                await sleep(101 - animationSpeed);

                if (array[j] < pivot) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];

                    renderArray([], [i, j], [], -1);
                    await sleep(101 - animationSpeed);
                }
            }

            [array[i + 1], array[high]] = [array[high], array[i + 1]];

            renderArray([], [i + 1, high], [], -1);
            await sleep(101 - animationSpeed);

            return i + 1;
        }
        async function quickSortHelper(low, high) {
            if (!isSorting) return;
            if (low < high) {
                let pi = await partition(low, high);
                if (pi === -1) return;

                await quickSortHelper(low, pi - 1);
                await quickSortHelper(pi + 1, high);
            }
        }

        async function quickSort() {
            await quickSortHelper(0, array.length - 1);

            renderArray([], [], Array.from({length: array.length}, (_, i) => i));
            isSorting = false;
            startBtn.disabled = false;
            startBtn.textContent = "Sort";
        }

        async function heapify(n, i) {
            if (!isSorting) return;

            let largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n) {
                renderArray([i, left], [], [], -1);
                await sleep(101 - animationSpeed);
                if (array[left] > array[largest]) largest = left;
            }

            if (right < n) {
                renderArray([i, right], [], [], -1);
                await sleep(101 - animationSpeed);
                if (array[right] > array[largest]) largest = right;
            }

            if (largest !== i) {
                [array[i], array[largest]] = [array[largest], array[i]];

                renderArray([], [i, largest], [], -1);
                await sleep(101 - animationSpeed);

                await heapify(n, largest);
            }
        }

        async function heapSort() {
            let n = array.length;

            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                if (!isSorting) return;
                await heapify(n, i);
            }

            for (let i = n - 1; i > 0; i--) {
                if (!isSorting) return;

                [array[0], array[i]] = [array[i], array[0]];
                renderArray([], [0, i], [], -1);
                await sleep(101 - animationSpeed);

                await heapify(i, 0);
            }

            renderArray([], [], Array.from({length: n}, (_, i) => i));
            isSorting = false;
            startBtn.disabled = false;
            startBtn.textContent = "Sort";
        }



        async function binarySearch(target) {
            const n = array.length;
            let left = 0;
            let right = n - 1;

            searchResult.classList.remove('show');

            while (left <= right) {
                if (!isSearching) return;

                let mid = Math.floor((left + right) / 2);

        
                renderArray([mid], [], [], -1, true);
                await sleep(151 - animationSpeed);

                if (array[mid] === target) {
                renderArray([], [], [], mid, true);
                    searchResult.textContent = `✓ Target ${target} found at index ${mid}!`;
                    searchResult.style.color = '#4CAF50';
                    searchResult.classList.add('show');

                    isSearching = false;
                    searchBtn.disabled = false;
                    searchBtn.textContent = "Search";
                    return;
                }

                
                renderArray([], [], [mid], -1, true);
                await sleep(101 - animationSpeed);

                if (array[mid] < target) {
                    left = mid + 1;   
                } else {
                    right = mid - 1;  
                }
            }

            renderArray([], [], Array.from({ length: n }, (_, i) => i), -1, true);
            searchResult.textContent = `✗ Target ${target} not found in the array.`;
            searchResult.style.color = '#FF4500';
            searchResult.classList.add('show');

            isSearching = false;
            searchBtn.disabled = false;
            searchBtn.textContent = 'Search';
        }

     
        async function linearSearch(target) {
            const n = array.length;
            searchResult.classList.remove('show');
            
            for (let i = 0; i < n; i++) {
                if (!isSearching) return;
                
                renderArray([i], [], [], -1, true);
                await sleep(151 - animationSpeed);
                
                if (array[i] === target) {
                    renderArray([], [], [], i, true);
                    searchResult.textContent = ` Target ${target} found at index ${i}!`;
                    searchResult.style.color = '#4CAF50';
                    searchResult.classList.add('show');
                    isSearching = false;
                    searchBtn.disabled = false;
                    searchBtn.textContent = 'Search';
                    return;
                }
                
                renderArray([], [], [i], -1, true);
                await sleep(101 - animationSpeed);
            }
            
            renderArray([], [], Array.from({length: n}, (_, i) => i), -1, true);
            searchResult.textContent = `✗ Target ${target} not found in the array.`;
            searchResult.style.color = '#FF4500';
            searchResult.classList.add('show');
            isSearching = false;
            searchBtn.disabled = false;
            searchBtn.textContent = 'Search';
        }
        
        async function startSorting() {
            if (isSorting) {
                isSorting = false;
                startBtn.textContent = 'Sort';
                return;
            }
            
            isSorting = true;
            startBtn.textContent = 'Stop';
            sizeSlider.disabled = true;
            
            if (currentAlgorithm === 'bubble') {
                await bubbleSort();
            }
            else if(currentAlgorithm === 'selection'){
                await selectionSort();
            }
            else if(currentAlgorithm === 'insertion'){
                await insertionSort();
            }else if(currentAlgorithm==='merge'){
                await mergeSort();
            }else if(currentAlgorithm == 'quick'){
                await quickSort();
            }else if(currentAlgorithm=='heap'){
                await heapSort();
            }
            
            sizeSlider.disabled = false;
        }

        async function startSearching() {
            if (isSearching) {
                isSearching = false;
                searchBtn.textContent = 'Search';
                return;
            }
            
            const target = parseInt(targetValue.value);
            if (isNaN(target)) {
                alert('Please enter a valid number');
                return;
            }
            
            isSearching = true;
            searchBtn.textContent = 'Stop';
            sizeSlider.disabled = true;
            
            if (currentAlgorithm === 'linear') {
                await linearSearch(target);
            } else if(currentAlgorithm=='binary'){
                await binarySearch(target);
            }

            
            sizeSlider.disabled = false;
        }

        function resetArray() {
            isSorting = false;
            isSearching = false;
            startBtn.disabled = false;
            startBtn.textContent = currentMode === 'sorting' ? 'Sort' : 'Search';
            searchBtn.disabled = false;
            searchBtn.textContent = 'Search';
            searchResult.classList.remove('show');
            generateArray();
        }

        function addTargetToArray() {
            const target = parseInt(targetValue.value);
            if (isNaN(target) || target < 10 || target > 310) {
                alert('Please enter a valid number between 10 and 310');
                return;
            }
            
            if (array.length < 100) {
                array.push(target);
                arraySize = array.length;
                sizeSlider.value = arraySize;
                sizeValue.textContent = arraySize;
                renderArray([], [], [], -1, true);
            } else {
                alert('Array is full (max 100 elements)');
            }
        }
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentMode = btn.dataset.mode;
                
                if (currentMode === 'sorting') {
                    sortingAlgos.classList.remove('hidden');
                    searchingAlgos.classList.add('hidden');
                    searchControls.classList.remove('show');
                    startBtn.textContent = 'Sort';
                    algoLabel.textContent = 'Select Sorting Algorithm:';
                    currentAlgorithm = 'bubble';
                    document.querySelector('[data-algo="bubble"]').click();
                } else {
                    sortingAlgos.classList.add('hidden');
                    searchingAlgos.classList.remove('hidden');
                    searchControls.classList.add('show');
                    startBtn.textContent = 'Sort (for Binary Search)';
                    algoLabel.textContent = 'Select Searching Algorithm:';
                    currentAlgorithm = 'linear';
                    document.querySelector('[data-algo="linear"]').click();
                }
                
                resetArray();
            });
        });
        algoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;
                
                const parentDiv = btn.parentElement;
                parentDiv.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentAlgorithm = btn.dataset.algo;
                
                const info = algorithmInfo[currentAlgorithm];
                algoInfo.innerHTML = `
                    <h3>${info.name}</h3>
                    <p>${info.description}</p>
                    <p><strong>${info.complexity}</strong></p>
                `;
                
                resetArray();
            });
        });
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            algoButtons.forEach(btn => {
                const algoName = algorithmInfo[btn.dataset.algo].name.toLowerCase();
                const algoKey = btn.dataset.algo.toLowerCase();
                
                if (algoName.includes(searchTerm) || algoKey.includes(searchTerm) || btn.textContent.toLowerCase().includes(searchTerm)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            });
        });

        startBtn.addEventListener('click', startSorting);
        searchBtn.addEventListener('click', startSearching);
        addTargetBtn.addEventListener('click', addTargetToArray);
        resetBtn.addEventListener('click', resetArray);
        randomBtn.addEventListener('click', () => {
            if (!isSorting && !isSearching) {
                generateArray();
            }
        });

        sizeSlider.addEventListener('input', (e) => {
            if (!isSorting && !isSearching) {
                arraySize = parseInt(e.target.value);
                sizeValue.textContent = arraySize;
                generateArray();
            }
        });

        speedSlider.addEventListener('input', (e) => {
            animationSpeed = parseInt(e.target.value);
            speedValue.textContent = animationSpeed;
        });

        generateArray();
