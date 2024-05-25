import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { equipmentSlice } from './domain/equipment/slice'
import { userSlice } from './domain/user/slice'

export const store = configureStore({
  reducer: {
    [equipmentSlice.name]: equipmentSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
