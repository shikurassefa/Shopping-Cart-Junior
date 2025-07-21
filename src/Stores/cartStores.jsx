
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const cartStore = create(
  persist(
    (set, get) => ({
      cart: [],
confirm: false,
isClicked: false,
handleNewOrder:()=>
{
set(()=>
{
  return {cart:[]}
})
},
handleDecrement:(id)=>
{
set((state)=>
{
  const itemExists = state.cart.find((item)=>
  {
    return item.id === id;
  })
  if(itemExists && itemExists.quantity > 1)
  {
    return {cart: state.cart.map((item)=>
    {
      if(item.id === id)
      {
        return {...item,quantity:item.quantity - 1}
      }
     return item;
    })}
  }
 else if(itemExists && itemExists.quantity === 1)
  {
    return {cart: state.cart.filter((item)=>
    {
      return item.id !== id;
  
    })}
  }

})
}
,
      addToCart: (id,name,price,category,image) => {
      
       
        set((state) => {
          const itemExists = state.cart.find((item) => {
          
            return item.id === id;
          });
      
          if (itemExists) {
            return {
              cart: state.cart.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                }
                return item;
              }),
            };
          } else {
            return {
              cart: [...state.cart, {id,name,price,category,image,quantity:1}]
            
            };
          }
        });
      },
      handleRemoveFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },
      getTotalQuantity: () => {
        return get().cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
      },
      
    }),
    {
      name: "cart-storage",
    }
  )
);


    