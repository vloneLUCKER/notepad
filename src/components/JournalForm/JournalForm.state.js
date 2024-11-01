export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
  },
  values: {
    text: "",
    title: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUES":
      return { ...state, values: { ...state.values, ...action.payload } };
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "FILL": {
      const titleValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;
      const textValidity = state.values.text?.trim().length;
      //   console.log(action.payLoad, INITIAL_STATE.values);
      return {
        ...state,
        isValid: {
          text: textValidity,
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: titleValidity && textValidity && dateValidity,
      };
    }
    case "RESET":
      return {
        ...state,
        values: INITIAL_STATE.values,
      };
  }
}
