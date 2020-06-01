import React, {useContext}from 'react';
import './filter.css'
import {DataContext} from '../viewPort/viewPort'

const Filter = () => {

    const { state, dispatch} = useContext(DataContext)
    const filter = state.filter

    //storing values in localStorage for persistent
    localStorage.setItem("data", JSON.stringify(state.data))
    localStorage.setItem("filter", JSON.stringify(state.filter))

    //method to iginite dispatcher to modify filters based on the selected filters
    const modifyFilter = ( filterTitle, filterOption, selected) => {
       
        dispatch({
            type : "filter",
            payload : {
                "filterTitle" :  filterTitle,
                "filterOption" :  filterOption,
                "changeCheckBoxValue" : selected,
            }
        })
    }

    return (
        <div className="filterContainer">
            <h2> FILTER OPTIONS </h2>
             {
                // Loop through Filter Categories 
                Object.values(filter).map((filterTitle)=>
                    <div className="filterCategory" key={filterTitle.id}>
                        <h3 className="filterTitle">{filterTitle.name}</h3>
                        <div>
                            {
                                // Loop through Options under Each Filter Category 
                                Object.values(filterTitle.filters).map((filterOption)=>
                                    <div key={filterTitle.name+filterOption.name}>
                                        <input type="checkbox"  checked={filterOption.filterSelected} onChange={()=>{
                                            modifyFilter(filterTitle.name, filterOption.name, filterOption.filterSelected)
                                        }}></input>
                                        <label>{filterOption.name}</label>
                                    </div>
                                )
                        }
                        </div> 
                    </div>
                )
            }
        </div>
       
    )
}

export default Filter;