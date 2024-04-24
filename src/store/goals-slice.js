import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: [],
  reducers: {
    addGoal: (state, action) => {},
    deleteGoal: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      console.log('Fetch successful!')
    })
  }
});

const fetchGoals = createAsyncThunk('goals/fetchGoals', (_, thunkApi) => {
  console.log('Fetching goals-');
})

const { addGoal, deleteGoal } = goalsSlice.actions;
export { addGoal, deleteGoal, fetchGoals }
export default goalsSlice;