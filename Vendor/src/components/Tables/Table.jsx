// import React, { useState } from 'react';

// const Table = (props) => {
//     const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData;
//     const [dataShow, setDataShow] = useState(initDataShow);

//     let pages = 1;
//     let range = [];

//     if (props.limit !== undefined) {
//         let page = Math.floor(props.bodyData.length / Number(props.limit));
//         pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
//         range = [...Array(pages).keys()];
//     }

//     const [currPage, setCurrPage] = useState(0);

//     const selectPage = (page) => {
//         const start = Number(props.limit) * page;
//         const end = start + Number(props.limit);
//         setDataShow(props.bodyData.slice(start, end));
//         setCurrPage(page);
//     };

//     return (
//         <div>
//             <div className="tableWrapper overflow-y-auto">
//                 <table className="table min-w-[400px] w-full border-separate">
//                     {props.headData && props.renderHead ? (
//                         <thead className="tableHead bg-gray-200">
//                             <tr className='text-left'>
//                                 {props.headData.map((item, index) => props.renderHead(item, index))}
//                             </tr>
//                         </thead>
//                     ) : null}
//                     {props.bodyData && props.renderBody ? (
//                         <tbody className="tableBody">
//                             {dataShow.map((item, index) => (
//                                 <tr className="tableRow hover:bg-blue-500 hover:text-white" key={index}>
//                                     {props.renderBody(item, index)}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     ) : null}
//                 </table>
//             </div>
//             {pages > 1 ? (
//                 <div className="tablePagination flex justify-end items-center mt-5">
//                     {range.map((item, index) => (
//                         <div
//                             key={index}
//                             className={`tablePaginationItem w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${currPage === index ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-blue-300 hover:text-white'} ml-2`}
//                             onClick={() => selectPage(index)}
//                         >
//                             {item + 1}
//                         </div>
//                     ))}
//                 </div>
//             ) : null}
//         </div>
//     );
// };

// export default Table;




import React from 'react'
import './Table.css'

const Table = (props) => {
  return (
    <div>
        <div className="tableWrapper max-h-[300px] overflow-y-auto">
            <table className='w-full min-w-[400px] border-spacing-0'>
                {
                    props.headData && props.renderHead ? (
                        <thead className='bg-second-bg'>
                            <tr className='text-left'>
                                {
                                    props.headData.map((item,index) => props.renderHead(item,index))
                                }
                            </tr>
                        </thead>
                    ) : null
                }
                {
                    props.bodyData && props.renderBody ? (
                        <tbody>
                            {
                                props.bodyData.map((item,index) => props.renderBody(item,index))
                            }
                        </tbody>
                    ) : null
                }
            </table>
        </div>
    </div>
  )
}

export default Table