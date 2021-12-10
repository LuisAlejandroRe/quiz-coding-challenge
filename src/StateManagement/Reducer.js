export const initialState = {
  questions: null,
  results: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };

    case "SET_RESULTS":
      const newResultsArray = [...state.results, action.result]; 
      return {
        ...state,
        results: newResultsArray,
      };

    case "RESET": 
      return {
        questions: null,
        results: [],
      };

    default:
      return state;
  }
};

export default reducer;