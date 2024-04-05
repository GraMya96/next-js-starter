---
to: <%= absPath %>/store.ts
---

import { configureStore } from '@reduxjs/toolkit';
import <%= slice_name %>Reducer from './<%= slice_name %>/<%= slice_name %>Slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		<%= slice_name %>: <%= slice_name %>Reducer,
		// Add other reducers here if needed
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
