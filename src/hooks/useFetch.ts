import { useReducer, useCallback } from 'react';

export const useFetch = (request: any) => {
  const STATUS = {
    idle: 'idle',
    fetching: 'fetching',
    fetched: 'fetched',
    errored: 'errored',
  };

  const initialState = {
    data: null,
    error: null,
    status: STATUS.idle,
  };

  const ACTIONS = Object.freeze({
    fetch: 'fetch',
    error: 'error',
    success: 'success',
  });

  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.fetch: {
        if (action.options.keepPreviousData) {
          return { ...state, fetching: true };
        }

        return {
          status: STATUS.fetching,
          data: null,
          error: null,
        };
      }

      case ACTIONS.error: {
        return {
          status: STATUS.errored,
          error: action.error,
          data: null,
        };
      }

      case ACTIONS.success: {
        return {
          status: STATUS.fetched,
          error: null,
          data: action.data,
        };
      }

      default:
        return state;
    }
  }, initialState);

  const fetch = useCallback(
    async (params = {}, options = { keepPreviousData: false }) => {
      dispatch({ type: ACTIONS.fetch, options });

      try {
        const response = await request(params);
        dispatch({ type: ACTIONS.success, data: response });
      } catch (error) {
        dispatch({ type: ACTIONS.error, error });
      }
    },
    [request, ACTIONS],
  );

  return [state, fetch];
};

export default useFetch;
