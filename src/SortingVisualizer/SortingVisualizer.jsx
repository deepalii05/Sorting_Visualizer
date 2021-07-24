import React from 'react';
import { mergeSortanime } from '../Sorting_Algorithms/mergesort.js';
import { bubbleSortanime } from "../Sorting_Algorithms/bubblesort.js";
import { selectionSortanime } from "../Sorting_Algorithms/selectionsort.js";
import './SortingVisualizer.css';

// I'm thinking of keeping the color like this:
// being parsed bar: yellow
// almost/completely sorted: #3FFF00
// untouched: pink (or any other colour that you'd think looks the best here)

// Features:
// Generate array button: disables while sorting goes on
// enables once sorting is done
// Animation Speed up and down button
// Change Array Size button
// sorted array is of green color || Plan change, ab "Harlequin Green" hai: #3FFF00, mast hai na??

let animespeed = 50;
let total_array_bars = 20;

let baseColor = 'pink';
const parseColor = 'yellow';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.newArray();
  }

  newArray() {
    const array = [];
    for (let i = 0; i < total_array_bars; i++) {
      array.push(randomIntFromInterval(5, 550));
    }

    // To reset the color of our array bars, once we've done sorting once
    // w/o these steps, our array would be in the green color, due to the finalgreen function
    const arrayBars = document.getElementsByClassName('array-bar');
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var barStyle = arrayBars[j].style;
      barStyle.backgroundColor = 'pink';
    }
    this.setState({array});
  }


  // Ye clement ka code hai, almost exact, with some minor changes :)
  mergeSort() {
    document.getElementById('mybtn').disabled = true;  // button enabled here
    const anime = mergeSortanime(this.state.array);
    for (let i = 0; i < anime.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = anime[i];
        let barOneStyle = arrayBars[barOneIdx].style;
        let barTwoStyle = arrayBars[barTwoIdx].style;
        let color = i % 3 === 0 ? parseColor : baseColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animespeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = anime[i];
          let barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (i === anime.length - 1) {                 // Finalising a green color here
            this.finalGreen();
            document.getElementById('mybtn').disabled = false;  // button disabled here
          }
        }
        , i * animespeed);
      }
    }

  }

bubbleSort() {
    document.getElementById('mybtn').disabled = true;    // button disabled here
    
    // I'm trying to disable buttons when sorting starts, 
    //but it works when we assign single id to each button, but not with classname
    // For time being to make it work, I'm just disabling the new array button, as it is the most crucial

    const array = this.state.array;
    const anime = bubbleSortanime(array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < anime.length; i++) {
      setTimeout(() => {
        
        let [initial, final] = anime[i];
        let initialBarStyle = arrayBars[initial].style;
        let finalBarStyle = arrayBars[final].style;

        // swapping initial & final
        let temp = this.state.array[initial];
        this.state.array[initial] = this.state.array[final];
        this.state.array[final] = temp;

        // Size  and color change in case of swap
        initialBarStyle.height = `${this.state.array[initial]}px`;
        finalBarStyle.height = `${this.state.array[final]}px`;

        initialBarStyle.backgroundColor = 'yellow';
        finalBarStyle.backgroundColor = '#3FFF00';

        // Iterating intial
        let currentPosition = initial;
        for (let j = 0; j < currentPosition; j++) {
          // Parsed Bars
          var barStyle = arrayBars[j].style;
          barStyle.backgroundColor = 'pink';
        }
        if (i === anime.length - 1) {                    // Finalising a green color here
          this.finalGreen();
          document.getElementById('mybtn').disabled = false;    // button enabled here
        }
      }, i * animespeed);
    }
  }

SelectionSort(){
  document.getElementById('mybtn').disabled = true;    // button disabled here

  const array = this.state.array;
  const anime = selectionSortanime(array);
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < anime.length; i++) {
    setTimeout(() => {
      
      let [initial, final] = anime[i];
      let initialBarStyle = arrayBars[initial].style;
      let finalBarStyle = arrayBars[final].style;

      // swapping initial & final
      let temp = this.state.array[initial];
      this.state.array[initial] = this.state.array[final];
      this.state.array[final] = temp;

      // Size  and color change in case of swap
      initialBarStyle.height = `${this.state.array[initial]}px`;
      finalBarStyle.height = `${this.state.array[final]}px`;

      initialBarStyle.backgroundColor = 'yellow';
      // finalBarStyle.backgroundColor = '#3FFF00';

      // Iterating intial
      let currentPosition = initial;
      for (let j = 0; j < currentPosition; j++) {
        // Parsed Bars
        var barStyle = arrayBars[j].style;
        barStyle.backgroundColor = 'pink';
      }
      if (i === anime.length - 1) {                    // Finalising a green color here
        this.finalGreen();
        document.getElementById('mybtn').disabled = false;    // button enabled here
      }
    }, i * animespeed);
  }
}


  finalGreen() {
    let arrayBars = document.getElementsByClassName('array-bar');
    let arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      let barStyle = arrayBars[j].style;
      barStyle.background = '#54ff54';
    }
  }
// Some Tinee-Minee Functions to improve the overall UX :)

// Look in the console, to see the animation speed value
// and number of bars value


// by default: animespeed = 50
  speedup(){
    if (animespeed > 10){
    animespeed -= 10;
    }
    console.log(animespeed);
  }
  speeddown(){
    if (animespeed < 100){
    animespeed += 10; }
    console.log(animespeed);
  }

  // By default: array size = 20
  arraySizeless(){
    if (total_array_bars > 8){
      total_array_bars -= 2;
      console.log(total_array_bars);
      this.newArray();
    }
  }
  arraySizeMore(){
    if (total_array_bars < 36){
      total_array_bars += 2;
      console.log(total_array_bars);
      this.newArray();
    }
  }


  // I've created a separate div for essential buttons, i.e Speeds and Array Size
  // This looks are a bit better, as sorting buttons are separated now, rest is upto UI work :)

  // Created 3 divs
  // 1. for keeping arraybars in one div
  // 2. for keeping the sorting buttons in one div
  // 3. for keeping the speed, anime buttons in one div

  render() {
    const {array} = this.state;

    return (
      <div className='array-container'>
      
        <div>
        {array.map((value, idx) => (
          <div
            className='array-bar'
            key={idx}
            style={{
              backgroundColor: baseColor,
              height: `${value}px`,
            }}></div>
        ))}
        </div>
        
        <div>
        <button className = 'btn' id = 'mybtn' onClick={() => this.newArray()}>Generate New Array</button>
        <button className = 'btn' onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className = 'btn' onClick={() => this.bubbleSort()}>Bubble Sort</button> 
        {/* <button >Quick Sort</button> */}
        <button className = 'btn' onClick={() => this.SelectionSort()}>Selection Sort</button>
        {/* <button >Insertion Sort</button> */}
        </div>

        <div>
        <button className = 'btn' onClick={() => this.speedup()}>Increase Speed</button>
        <button className = 'btn' onClick={() => this.speeddown()}>Decrease Speed</button>
        <button className = 'btn' onClick={() => this.arraySizeless()}>Decrease Array Size</button>
        <button className = 'btn' onClick={() => this.arraySizeMore()}>Increase Array Size</button>
        </div>
        
      </div>  
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}