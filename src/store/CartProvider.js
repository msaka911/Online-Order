import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {

  if (action.type === 'ADD') {
    
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id);

    const existingCartItem=state.items[existingCartItemIndex]

   
    let updatedItems;
    let updateItem;
    if (existingCartItem){
       
       updateItem={...existingCartItem,
       amount:action.item.amount+existingCartItem.amount
      }
       updatedItems=[...state.items]
       updatedItems[existingCartItemIndex]=updateItem;
    }
    else{
     updatedItems = state.items.concat(action.item);}

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
    
  }
  if (action.type==='REMOVE'){
    let updateItem;
    let updatedItems;
   

    const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id);

    const existingCartItem=state.items[existingCartItemIndex]

    const updatedTotalAmount = state.totalAmount-existingCartItem.price ;
    
    if(existingCartItem.amount===1){
      
      state.items.splice(existingCartItemIndex,1);
      updatedItems=state.items;
    }
    else{
      updateItem={...existingCartItem,
        amount:existingCartItem.amount-1
       }
        updatedItems=[...state.items]
        updatedItems[existingCartItemIndex]=updateItem;

    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
    
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
