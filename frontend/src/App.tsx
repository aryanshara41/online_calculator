import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Calculations from './components/Calculations';
import axios from 'axios';


function App() {

  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');
  const [name, setName] = useState('');

  const [calculations, setCalculations] = useState<any>([]);

  useEffect(() => {
    const getCalculations = async () => {
      const result = await axios.get('http://localhost:2000/history', {
        headers: {
          'token': localStorage.getItem('token')
        }
      });

      setCalculations(result.data);
    };

    getCalculations();
  }, [])

  const saveCalculationName = async () => {

    const result = await axios.post('http://localhost:2000/history', {
      name: name,
      calculation: expression,
      result: input
    },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }
    );

    const data: any = result.data;
    setCalculations([...calculations, data]);
  }

  return (
    <div className="App flex flex-wrap" >
      <div className='w-3/12 ml-10 mt-7'>
        <div className='flex mb-4'>
          <h1 className='text-3xl font-semibold'>Calculator</h1>
        </div>
        <Calculator input={input} setInput={setInput} expression={expression} setExpression={setExpression} />
        <div className='flex flex-col mt-3 '>
          <div className='w-full flex mb-3 '><span className='text-md font-semibold'>Calculation name</span></div>
          <div className='w-full flex rounded-sm overflow-hidden'>
            <input onChange={(e) => setName(e.target.value)} type="text" className='bg-blue-100 p-2 w-9/12' placeholder='Enter calculation name' />
            <button onClick={saveCalculationName} className='bg-blue-900 h-10 w-3/12 text-white'>Save</button>
          </div>
        </div>
      </div>

      <div className='flex grow flex-col'>
        <div className='mt-7 w-full text-3xl font-semibold flex justify-center'>
          <h1 className='flex w-6/12'>
            Your Calculations
          </h1>
        </div>
        <div className='flex justify-center'>
          <Calculations calculations={calculations} setCalculations = {setCalculations} />
        </div>
      </div>

    </div>
  );
}

export default App;
