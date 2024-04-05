---
to: <%= absPath %>/<%= slice_name %>/<%= slice_name %>Slice.ts
---
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface <%= slice_name %>State {
	// example: boolean;
}

const initialState: <%= slice_name %>State = {
	// example: false
};

const <%= slice_name %>Slice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		exampleSuccess(state, action: PayloadAction<string>) {
			state.example = action.payload;
		},
	},
});

export const { exampleSuccess } = <%= slice_name %>Slice.actions;
export default <%= slice_name %>Slice.reducer;


