import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//reducer
import reducer from './modules';

const makeStore = () => 
{
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
        {
            return getDefaultMiddleware({
                serializableCheck: false,
            });
        },
    });
};

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store;