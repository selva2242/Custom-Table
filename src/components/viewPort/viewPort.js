import React, {useState, useEffect} from 'react';
import './viewPort.css'
import Table from '../table/table';
import Filter from '../filter/filter';
import axios from 'axios';
import {pre_data, pre_currentFilter, pre_filter } from '../data'
export const DataContext = React.createContext();

const ViewPort = () => {
    // contains schema
    console.log(pre_data)
    console.log(pre_currentFilter)
    console.log(pre_filter)
    const [schema, setSchema] = useState({
        columns : {
            date : {
                name : 'date',
                sortable : false,
                current_order : 'Not sortable'
            },
            name : {
                name : 'name',
                sortable: true,
                current_order : 'unsorted',
            },
            gender : {
                name : 'gender',
                sortable : true,
                current_order : 'unsorted',
            },
            age : {
                name : 'age',
                sortable : true,
                current_order : 'unsorted'
            },
            city : {
                name : 'city',
                sortable : true,
                current_order : 'unsorted'
            },
            status : {
                name : 'status', 
                sortable : true,
                current_order : 'unsorted'
            },
            ranking : {
                name : 'ranking',
                sortable : true,
                current_order : 'unsorted'
            }
        }
    })
    
    const [data,setData] = useState(JSON.parse(localStorage.getItem("data")) || pre_data)
    
    //checking for previous data in localstorage else updating data on initialistion

    const [filter,setFilter] = useState( JSON.parse(localStorage.getItem("filter")) || pre_filter)
    const [currentFilter, setCurrentFilter] = useState ( JSON.parse(localStorage.getItem("currentFilter")) || pre_currentFilter)
    const [isFilterClicked, setIsFilterClicked ] = useState(false)
    const tableAreaClass = isFilterClicked ? "tableAreaWithFilter" : "tableAreaWithoutFilter"
    localStorage.setItem("currentFilter", JSON.stringify(currentFilter))


    

   /* useEffect(()=>{
        axios.get("https://my-json-server.typicode.com/selva2242/demo/userDetails")
        .then((response)=> {
            setData(response.data)
            dispatch({
                type : "updateData",
                data : response.data
            })
        })
        .catch((error)=> {
        })
    }, []) */

    //setting intialState for Dispatcher
    const initialState = {
        data : data,
        schema : schema,
        filter : filter,
    }


    //function to filter data based on applied filters
    const filterDataByFilters = (data, currentFilter) => {
        let filteredData = [];
        data.forEach((user)=>{
            let validData = true
            for(let i=0;i<currentFilter.availableFilters.length;i++){
                let category = currentFilter.availableFilters[i]
                if(!(currentFilter[category].includes(user[category]))){
                    validData = false
                    break;
                }   
            }
            if(validData)
            filteredData.push(user)
         })
         
         return filteredData;
    }

    //function to update filters based on selected filters 
    const updateFilters = (category, option, toBeRemoved) => {
        if(toBeRemoved){
            var index = currentFilter[category].indexOf(option);
            if (index > -1) {
                currentFilter[category].splice(index, 1);
            }
        }
        else
           currentFilter[category].push(option)  
        
        localStorage.setItem("currentFilter", JSON.stringify(currentFilter))      
    }

    // reducer method for useReducer hook
    const reducer = (state, action) => {
        let  modifiedData = {
            ...state,
        }
        switch(action.type){
            // applied when sort is invoked and current state of column is unsorted
            case "unsorted" :
                modifiedData.schema.columns[action.payload].current_order = "ascending"
                modifiedData.data = [...state.data].sort((entry1,entry2)=> entry1[action.payload]>entry2[action.payload] ? 1 : -1)
                return modifiedData
            // applied when sort is invoked and current state of column is ascending
            case "ascending" : 
                modifiedData.schema.columns[action.payload].current_order = "descending"
                modifiedData.data = [...state.data].sort((entry1,entry2)=> entry1[action.payload]>entry2[action.payload] ? -1 : 1)
                return modifiedData
            // applied when sort is invoked and current state of column is descending
            case "descending" :  
                modifiedData.schema.columns[action.payload].current_order = "unsorted"
                modifiedData.data = filterDataByFilters([...initialState.data], currentFilter)
                return modifiedData
            // applied when filter Options get updated
            case "filter" : 
                let updatedFilter = updateFilters(action.payload.filterTitle,action.payload.filterOption, action.payload.changeCheckBoxValue)
                modifiedData.data = filterDataByFilters([...initialState.data], currentFilter)
                modifiedData.filter[action.payload.filterTitle].filters[action.payload.filterOption].filterSelected = !(action.payload.changeCheckBoxValue)
                return modifiedData  
        }
    }
   
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return(
        <DataContext.Provider
      value={{
        state,
        dispatch
      }}
    >
        <div className="viewPort">
            <div className="viewPortHeader">
                <div className="listView">
                    <h1>List View</h1>
                </div>
                <div className="filterButton">
                    <button className="button" onClick={()=>{
                        setIsFilterClicked(!isFilterClicked)
                    }}>FILTER</button>
                </div>
            </div>
            <div className="viewPortBody">
                <div className={tableAreaClass}>
                    <Table state={state}/>
                </div>
                {
                        isFilterClicked && 
                        <div className="filterArea">
                            <Filter/>
                        </div>
                }
                
            </div>
        </div>

    </DataContext.Provider>
        
    )
}

export default ViewPort;