import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

/* 
Initial state structure would look like below
goals:[
  {
    _id: number
    title: string,
    desc: string,
    dueDate: Date,
    createdAtDate: Date,
    progress: number Derived in redux prepare function,
    checklist: [
      {
        _id: number
        completed: boolean,
        text: string,
      },
      ...
    ]
  },
  ...
]
*/

const goalsSlice = createSlice({
  name: "goals",
  initialState: [],
  reducers: {
    addGoal: {
      reducer: (state, action) => {
        state.unshift(action.payload);
      },
      prepare: (goal) => {
        // add id for every checklist item
        let checklist = goal.checklist.map(item => ({id: nanoid(), ...item}));
        return {
          payload:{
            ...goal,
            id: nanoid(), // id for goal
            checklist,
          }
        }
      }
    },
    deleteGoal: (state, actions) => {
      const id = action.payload;
      return state.filter(item => item.id != id)
    },
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