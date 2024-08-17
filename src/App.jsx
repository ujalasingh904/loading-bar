import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [prevProgress, setPrevProgress] = useState(0); // Renamed to follow camelCase convention

  const [num, setNum] = useState(0); // Renamed to follow camelCase convention
  const [redoNum, setRedoNum] = useState(0); // Renamed to follow camelCase convention

  const plusOne = () => {
    if (num >= 150) {
      alert("You have reached the limit");
      return;
    }
    const newNum = num + 1;
    setNum(newNum);
    setRedoNum(newNum);
    setProgress((newNum / 150) * 100);
  };

  const minusOne = () => {
    if (num <= 0) {
      alert("You have reached the limit");
      return;
    }
    const newNum = num - 1;
    setNum(newNum);
    setRedoNum(newNum);
    setProgress((newNum / 150) * 100);
  };

  const undo = () => {
    if (num <= 0) {
      alert("You are at the limit");
      return;
    }
    setPrevProgress(progress); // Store the current progress
    setNum(0); // Reset the num to 0
    setProgress(0); // Reset the progress bar to 0
  };

  const redo = () => {
    if (num === redoNum) {
      alert("first click on the undo button");
      return;
    }
    setNum(redoNum); // Restore the num value
    setProgress(prevProgress); // Restore the progress bar to the previous value
  };

  console.log("progress bar -->", progress);
  console.log("previous progress bar -->", prevProgress);

  return (
    <div className='h-screen bg-black flex justify-center items-center relative'>
      <div className='max-w-96 mx-auto flex flex-col justify-center items-center gap-10'>
        <LoadingBar
          height={10}
          color='#f11946'
          progress={progress}
        />
        <span className='text-white text-5xl'>{num}</span>
        <div className='flex gap-4'>
          <button className='text-white bg-red-600 p-3 rounded-lg text-lg' onClick={minusOne}>Subtract 1</button>
          <button className='text-white bg-green-600 p-3 rounded-lg text-lg' onClick={plusOne}>Add 1</button>
        </div>

        <div className='flex gap-4 absolute bottom-5 right-5'>
          <button className='text-white bg-blue-600 p-3 rounded-lg text-lg' onClick={undo}>Undo</button>
          <button className='text-white bg-violet-600 p-3 rounded-lg text-lg' onClick={redo}>Redo</button>
        </div>
      </div>
    </div>
  );
};

export default App;
