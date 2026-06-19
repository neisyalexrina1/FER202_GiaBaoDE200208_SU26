export const FEEDBACK_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
}

export const initialFeedbackState = {
  items: [],
  loading: false,
  error: null,
}

export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case FEEDBACK_ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null }

    case FEEDBACK_ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload }

    case FEEDBACK_ACTIONS.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }

    case FEEDBACK_ACTIONS.ADD:
      return { ...state, items: [...state.items, action.payload] }

    case FEEDBACK_ACTIONS.EDIT:
      return {
        ...state,
        items: state.items.map((f) =>
          f.id === action.payload.id ? action.payload : f
        ),
      }

    case FEEDBACK_ACTIONS.DELETE:
      return {
        ...state,
        items: state.items.filter((f) => f.id !== action.payload),
      }

    default:
      return state
  }
}
