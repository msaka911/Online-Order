import { useContext ,useEffect,useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const [isClicked,setClicked]=useState(false)

  const btnClass=`${classes.button} ${isClicked ? classes.bump : ''}`;
  
  useEffect(()=>{ 
    if (cartCtx.items.length===0){
      return 
    }
    setClicked(true);
    const timer=setTimeout(() => {
      setClicked(false);
    }, 300);
    return ()=>{
      clearTimeout(timer);
    }
    
  },[cartCtx.items])




  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
