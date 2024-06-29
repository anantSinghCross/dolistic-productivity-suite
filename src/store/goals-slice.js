import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { COLLECTION, db } from "../firebase";

/* 
Initial state structure would look like below
goals:[
  {
    _id: number
    title: string,
    desc: string,
    dueDate: Date,
    createdAtDate: Date,
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
    editGoal: (state, action) => {
      const editedGoal = action.payload;
      return state.map(goal => {
        if(goal.id == editedGoal.id){
          return editedGoal;
        }
        return goal;
      })
    },
    deleteGoal: (state, actions) => {
      const id = action.payload;
      return state.filter(item => item.id != id)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      return action.payload;
    })
    builder.addCase(fetchGoals.rejected, (state, action) => {
      console.log(action)
    })
  }
});

const fetchGoals = createAsyncThunk('goals/fetchGoals', async (uid, thunkApi) => {
  const goalsCollection = collection(db, COLLECTION.GOALS);
  const q = query(goalsCollection, where('uid', '==', uid));
  let goals = [];
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      goals.push({
        ...doc.data(),
        id: doc.id
      })
    })
  } catch (error) {
    console.error(error);
  }
  return goals;
})

const { addGoal, deleteGoal, editGoal } = goalsSlice.actions;
export { addGoal, deleteGoal, editGoal, fetchGoals }
export default goalsSlice;