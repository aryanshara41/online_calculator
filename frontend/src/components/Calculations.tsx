import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface types {
    calculations: any,
    setCalculations: React.Dispatch<React.SetStateAction<string>>
}

const Calculations = ({ calculations, setCalculations }: types) => {

    const [marked, setMarked] = useState<Array<string>>([]);

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (!e.target.checked) { // means currently not checked 
            // means add it into the marked
            setMarked(marked.filter((data) => data != id));
        }
        else {
            setMarked((old) => [...old, id]);
        }
    };

    const handleDeletion = async (id: string) => {
        if (marked.find((val) => val == id)) {
            setMarked(marked.filter((data) => data != id));
            // now delete this item from the calculations
            setCalculations(calculations.filter((cal: { _id: string; }) => cal._id != id));

            // now delete this id from the database
            const result = await axios.delete(`http://localhost:2000/history/${id}`, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }
            );
        }
    }

    return (
        <div className='m-4 w-full flex justify-center overflow-scroll'>
            <table className='w-6/12 border-t-2'>
                <thead className=''>
                    <tr>
                        <th className='p-2 w-1/3 flex items-center gap-3'>
                            <input className='accent-black' type="checkbox" />
                            Name</th>
                        <th className='p-2 w-1/3'>Calculation</th>
                        <th className='p-2 w-1/3'>Result</th>
                    </tr>

                </thead>
                <tbody>

                    {
                        calculations.length == 0 && <tr>
                            <td>No calculations found</td>
                        </tr>
                    }

                    {
                        calculations.map((cal: {
                            result: string;
                            calculation: string; _id: string, name: string;
                        }) => {
                            return (
                                <tr key={cal._id} className='border-t-2'>
                                    <td className='p-2 flex items-center gap-3'>
                                        <input type="checkbox" className='accent-black' onChange={(e) => handleCheckbox(e, cal._id)} />
                                        {cal.name}</td>
                                    <td className='p-2'>{cal.calculation}</td>
                                    <td className='p-2 '>{cal.result}</td>
                                    <td className='p-2 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </td>
                                    <td className='p-2 cursor-pointer' onClick={() => handleDeletion(cal._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Calculations