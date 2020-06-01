import React, { useState, useEffect } from 'react';
import { DataContext } from '../viewPort/viewPort'
import './table.css'

const Table = () => {

    const { dispatch } = React.useContext(DataContext);

    //funtion to iginite dispatcher to sort based column 
    let modifyContent = (header, sort_type, sortable) => {
        if(sortable){
            dispatch({
                type : sort_type,
                payload : header
            })
        }
    }

    return(
        <DataContext.Consumer>
            {
                (value) => { 
                    return(
                        <table className="table-fill">
                        <thead>
                            <tr>
                            {  //Loop through table head data
                                (Object.values(value.state.schema.columns)).map(
                                heading=><th className="text-left" onClick={()=> modifyContent(heading.name, heading.current_order, heading.sortable)} 
                                key={heading.name}>{heading.name} [{heading.current_order}]</th>)
                            }
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {
                                value.state.data.map((entry)=>
                                    <tr key={entry.id}>
                                        {
                                            //Loop through table rows data
                                            (Object.values(value.state.schema.columns)).map(row_entry=>
                                                <td  key={row_entry.name+entry.id} className="text-left">{entry[row_entry.name]}</td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                        
                    </table>
                    )
                }
                    
            }
        </DataContext.Consumer>
         

    )
}

export default Table;