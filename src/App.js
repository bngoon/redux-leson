import "./App.css";
import React from "react";
import {
  createAction,
  nanoid,
  createReducer,
  configureStore,
} from "@reduxjs/toolkit";

function App() {
  const initialState = {
    counter: 0,
  };

  // Define the increment action with a unique type identifier
  const increment = createAction("counter/increment");
  const decrement = createAction("counter/decrement");
  const resetCounter = createAction("counter/reset");
  const incrementBy = createAction("counter/incrementBy", (amount, user) => {
    return {
      payload: {
        amount,
        user,
        id: nanoid(),
      },
    };
  });

  // Define reducer
  const counterReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(increment, (state) => {
        state.counter += 1;
      })
      .addCase(decrement, (state) => {
        state.counter -= 1;
      })
      .addCase(resetCounter, (state) => {
        state.counter = 0;
      })
      .addCase(incrementBy, (state, action) => {
        state.counter += action.payload.amount;
      });
  });

  // Create store
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

  // Dispatch actions
  store.dispatch(increment());
  store.dispatch(increment());
  store.dispatch(incrementBy(100, ""));
  console.log(store.getState());

  return <div className="App">react</div>;
}

export default App;
