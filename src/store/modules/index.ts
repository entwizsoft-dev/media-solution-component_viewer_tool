import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const reducer: Reducer = (state, action) => 
{
    if(action.type === HYDRATE)
    {
        return {
            ...state,
            ...action.payload,
        };
    }
    return combineReducers({
    
    })(state, action);
};

export default reducer;