import React, { useReducer, useState } from 'react';



/*
const initialBoardState = {
  page: {
    start: 1,
    current: 1,
    end: {pageSize}
  },
  pageSet: 1,
  pageSize: 10,
  pageSetSize: 5,
  lastPage: 15,
  lastPageSet: 3,
  currentData: [],
  data: [],
} */

export const paginationReducer = (state, action) => {
  let { lastPage, lastPageSet, page, pageSet, pageSetSize } = state;
  console.log(action.type, state)
  switch (action.type) {
    case 'nextPage': {
      if (page.current % pageSetSize === 0)
        return {
          ...state,
          page: {
            ...page,
            start: Math.min(page.start + pageSetSize, (lastPageSet -1)* pageSetSize + 1),
            current: Math.min(page.current + 1),
            end: Math.min(page.end + pageSetSize, lastPage)
          },
          pageSet: Math.min(pageSet + 1, lastPageSet) /* {
            ...pageSet,
            current: Math.min(pageSet.current + 1, lastPageSet)
          } */
        }
      else
        return {
          ...state,
          page: {
            ...page,
            current: Math.min(page.current + 1, lastPage)
          }
        }
    }
    case 'prevPage': {
      if (page.current % pageSetSize === 1)
        return {
          ...state,
          page: {
            ...page,
            start: Math.max(page.start - pageSetSize, 1),
            current: Math.max(page.current - 1, 1),
            end: Math.max(page.end - pageSetSize, pageSetSize)
          },
          pageSet: Math.max(pageSet - 1, 1) /*  {
            ...pageSet,
            current: Math.max(pageSet.current - 1, 1)
          } */
        }
      else
        return {
          ...state,
          page: {
            ...page,
            current: Math.min(page.current - 1, 1)
          }
        }
    }
    case 'nextPageSet': {
      return {
        ...state,
        page: {
          ...page,
          start: Math.min(page.start + pageSetSize, lastPage),
          current: Math.min((pageSet.current * pageSetSize) + 1, lastPage),
          end: Math.min(page.end + pageSetSize, lastPage)
        },
        pageSet: Math.min(pageSet + 1, lastPageSet) /* {
          ...pageSet,
          current: Math.min(pageSet.current + 1, lastPageSet)
        } */
      }
    }
    case 'prevPageSet': {
      return {
        ...state,
        page: {
          ...page,
          start: Math.max(page.start - pageSetSize, 1),
          current: Math.max((pageSet.current - 1) * pageSetSize, 1),
          end: Math.max(page.end - pageSetSize, pageSetSize)
        },
        pageSet:  Math.max(pageSet - 1, 1)/*  {
          ...pageSet,
          current: Math.max(pageSet.current - 1, 1)
        } */
      }
    }
    case 'firstPage': {
      return {
        ...state, 
        page: { ...page,
          start: 1,
          current: 1,
          end: pageSetSize
        },
        pageSet: 1 /* {
          current: 1,
        }, */
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
        pageSet: lastPageSet/* {
          current: lastPageSet
        } */
      }
    }
    default: {
    }
  }
}
