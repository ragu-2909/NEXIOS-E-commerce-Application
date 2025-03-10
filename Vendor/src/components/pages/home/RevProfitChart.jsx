// import React,{useState,useEffect} from 'react'
// import Chart from 'react-apexcharts'
// import { useSelector } from 'react-redux'

// const RevProfitChart = () => {

//     const themeReducer = useSelector(state => state.ThemeReducer.mode)
   

//     const chartOptions = {
//         series: [
//             {
//                 name: 'Total Revenue',
//                 data: [10000,12000,13000,12000,10000,20000,10000,14000,15000,17500,20000,10000],
//             },
//             {
//                 name: 'Total Profit',
//                 data: [3500,4500,7500,2000,3000,4000,10000,4000,4000,3500,2350,5000],
//             }
//         ],
//         options: {
//             color: ['#6ab04c','#2980b9'],
//             chart: {
//                 background: 'transparent'
//             },
//             dataLabels: {
//                 enabled:false

//             },
//             stroke: {
//                 curve:'smooth'
//             },
//             xaxis: {
//                 categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
//             },
//             legend: {
//                 position: 'top'
//             },
//             grid:{
//                 show:false
//             }
//         }
//     }

//   return (
//    <div className="h-[210px] w-full">
//      <Chart 
//         options={{
//             ...chartOptions.options,
//             theme: { mode: themeReducer === 'theme-mode-dark' ? 'dark' : 'light' }
//         }}
//         series={chartOptions.series}
//         type='line'
//         height='100%'
//     />
//    </div>
//   )
// }

// export default RevProfitChart

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RevProfitChart = () => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Delay rendering to allow the DOM to be fully loaded
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Sample data, you may replace this with your dynamic data source
    const revenueData = [10000, 12000, 13000, 12000, 10000, 20000, 10000, 14000, 15000, 17500, 20000, 10000];
    const profitData = [3500, 4500, 7500, 2000, 3000, 4000, 10000, 4000, 4000, 3500, 2350, 5000];

    // Ensure the data is valid and not NaN
    const safeData = (data) => data.map(value => (typeof value === 'number' && !isNaN(value) ? value : 0));

    const chartOptions = {
        series: [
            {
                name: 'Total Revenue',
                data: safeData(revenueData),
            },
            {
                name: 'Total Profit',
                data: safeData(profitData),
            }
        ],
        options: {
            colors: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent',
                type: 'line',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            legend: {
                position: 'top',
            },
            grid: {
                show: false,
            },
        }
    };

    return (
        <div className="h-[210px] w-full">
            {isLoaded && (chartOptions.series[0].data.length > 0 && chartOptions.series[1].data.length > 0) ? (
                <Chart 
                    options={{
                        ...chartOptions.options,
                        theme: { mode: themeReducer === 'theme-mode-dark' ? 'dark' : 'light' },
                    }}
                    series={chartOptions.series}
                    type='line'
                    height='100%'
                />
            ) : (
                <div>Loading...</div> // Placeholder while loading
            )}
        </div>
    );
};

export default RevProfitChart;
