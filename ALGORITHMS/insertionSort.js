
//Insertion Sort:

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Taking array input 
let input = prompt("Enter numbers separated by spaces:");
let array = input.split(' ').map(Number);  

console.log("Sorted array:", insertionSort(array));


//Contributed by Prasad Kandekar