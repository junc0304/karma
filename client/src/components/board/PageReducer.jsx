import { BOARD_PROPERTY } from '../../config';

const { PAGINATION_SIZE, PAGE_SIZE } = BOARD_PROPERTY;

const initialBoardState = {
  index: { start: 0, end: PAGE_SIZE },
  page: { start: 1, current: 1, end: 1 },
  pageSet: 1,
  pageSize: PAGE_SIZE,
  pageSetSize: PAGINATION_SIZE,
  lastPage: 1,
  lastPageSet: 1,
}

export const pageReducer = (state = initialBoardState, action) => {
  let { lastPage, lastPageSet, page, pageSet, pageSetSize } = state;
  let { start, current, end } = page;
  switch (action.type) {
    case 'nextPage': {
      if (current === lastPage) {
        return state;
      }
      if (current % pageSetSize === 0) {
        return {
          ...state,
          page: {
            ...page,
            start: Math.min(start + pageSetSize, (lastPageSet - 1) * pageSetSize + 1),
            current: Math.min(current + 1, lastPage),
            end: Math.min(end + pageSetSize, lastPage)
          },
          pageSet: Math.min(pageSet + 1, lastPageSet)
        }
      }
      return {
        ...state,
        page: {
          ...page,
          current: Math.min(current + 1, lastPage)
        }
      }
    }

    case 'prevPage': {
      if (current === 1) {
        return state
      }
      if (current % pageSetSize === 1) {
        return {
          ...state,
          page: {
            ...page,
            start: Math.max(start - pageSetSize, 1),
            current: Math.max(current - 1, 1),
            end: Math.max(end - pageSetSize, pageSetSize)
          },
          pageSet: Math.max(pageSet - 1, 1)
        }
      }
      return {
        ...state,
        page: {
          ...page,
          current: Math.min(current - 1, 1)
        }
      }
    }

    case 'nextPageSet': {
      if (pageSet === lastPageSet) {
        return state;
      }
      return {
        ...state,
        page: {
          ...page,
          start: Math.min(start + pageSetSize, lastPage),
          current: Math.min((pageSet * pageSetSize) + 1, lastPage),
          end: Math.min(end + pageSetSize, lastPage)
        },
        pageSet: Math.min(pageSet + 1, lastPageSet)
      }
    }
    case 'prevPageSet': {
      if (pageSet === 1) {
        return state;
      }
      return {
        ...state,
        page: {
          ...page,
          start: Math.max(start - pageSetSize, 1),
          current: Math.max((pageSet - 1) * pageSetSize, 1),
          end: Math.max(end - pageSetSize, pageSetSize)
        },
        pageSet: Math.max(pageSet - 1, 1)
      }
    }

    case 'firstPage': {
      return {
        ...state,
        page: {
          ...page,
          start: 1,
          current: 1,
          end: Math.min(pageSetSize, lastPage)
        },
        pageSet: 1
      }
    }

    case 'lastPage': {
      return {
        ...state,
        page: {
          ...page,
          start: Math.max(lastPage - (lastPage % pageSetSize - 1), 1),
          current: lastPage,
          end: lastPage
        },
        pageSet: lastPageSet
      }
    }
    case 'goToPage': {
      return {
        ...state,
        page: {
          ...page,
          current: action.value,
        },
        pageSet
      }
    }
    default:
      return state;
  }
}