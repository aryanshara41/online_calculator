import React, { useState } from 'react';

interface types {
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    expression: string,
    setExpression: React.Dispatch<React.SetStateAction<string>>
}

const Calculator = ({ input, setInput, expression, setExpression }: types) => {
    const userInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const val = (e.target as HTMLInputElement).value;

        if ((input.charAt(input.length - 1) === '+' || input.charAt(input.length - 1) === '-' || input.charAt(input.length - 1) === '×' || input.charAt(input.length - 1) === '÷') && (val === '+' || val === '-' || val === '×' || val === '÷')) {
            setInput((input) => input = input.slice(0, -1));
            setExpression((expression) => expression = expression.slice(0, -1));
        }

        if (input === '0') {
            setInput(val);
            setExpression(val);
            return;
        }

        if (val === '÷') setExpression((val) => val + '/');
        else if (val === '×') setExpression((val) => val + '*');
        else if (val === '+') setExpression((val) => val + '+');
        else if (val === '-') setExpression((val) => val + '-');
        else if (val === '=') {

            setExpression(input);
            const result = eval(expression).toString();
            setInput(result);
            return;
        }
        else if (val === 'AC') {
            setInput('0');
            setExpression('0');
            return;
        }
        else setExpression((prev) => prev + val);

        setInput((prev) => prev = prev + val);
    }

    return (
        <div className='bg-black w-full'>
            <div className="bg-inherit h-16">
                <input disabled className='bg-inherit text-white w-full text-3xl text-right h-full border-none p-2' type="text" value={input} />
            </div>

            <div className='flex w-full'>
                <div className='flex flex-col w-9/12'>
                    <div className='flex ustify-around w-full'>
                        <button value="AC" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>AC</button>
                        <button value="+" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>+/-</button>
                        <button value="%" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>%</button>
                    </div>

                    <div className='flex w-full grow justify-around flex-wrap col-3'>
                        <button value="7" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>7</button>
                        <button value="8" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>8</button>
                        <button value="9" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>9</button>
                        <button value="4" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>4</button>
                        <button value="5" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>5</button>
                        <button value="6" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>6</button>
                        <button value="1" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>1</button>
                        <button value="2" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>2</button>
                        <button value="3" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>3</button>
                        <button value="0" onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black grow'>0</button>
                        <button value="." onClick={(e) => userInput(e)} className='  bg-gray-500 font-medium h-14 text-2xl text-white w-1/3 border border-black'>.</button>
                    </div>
                </div>
                <div className='bg-white w-3/12 flex flex-col'>
                    <button value="÷" onClick={(e) => userInput(e)} className='  bg-yellow-500 font-medium h-14 text-4xl text-white border border-black'>÷</button>
                    <button value="×" onClick={(e) => userInput(e)} className='  bg-yellow-500 font-medium h-14 text-4xl text-white border border-black'>×</button>
                    <button value="-" onClick={(e) => userInput(e)} className='  bg-yellow-500 font-medium h-14 text-4xl text-white border border-black'>-</button>
                    <button value="+" onClick={(e) => userInput(e)} className='  bg-yellow-500 font-medium h-14 text-4xl text-white border border-black'>+</button>
                    <button value="=" onClick={(e) => userInput(e)} className='  bg-yellow-500 font-medium h-14 text-4xl text-white border border-black'>=</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator;