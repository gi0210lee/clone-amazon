import { LocalConvenienceStoreOutlined } from "@mui/icons-material"

// 상태 초기
export const initialState = {
    basket: [],
    user: null,
}


export const getBasketTotal = (basket) => (
    basket?.reduce((amount, item) => item.price + amount, 0)
)

// Reducer
// 행동을 데이터 레이어로 쏴주는 것(dispatch)
// return State 와 Action
// action.item <= 바스켓 내용물
const reducer = (state, action) => {
    // console.log(action)

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id)

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    '(ID ' +
                    action.id +
                    ')이 장바구니에 존재하지 않습니다.'
                )
            }
            return {
                ...state,
                basket: newBasket

            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
}

export default reducer;