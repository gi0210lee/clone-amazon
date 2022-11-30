import React, { createContext, useContext, useReducer } from "react";

// Context
// 컴토넌트 단계단계 마다 프롭스를 넘겨주지 안아도
// 데이터 레이어를 구성하여 그때그때 활용할 수 있다.
// ex) Redux
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)