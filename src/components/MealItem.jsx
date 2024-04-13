import React from 'react'
import Button from '../UI/Button'

import {currentFormatten} from '../util/formatting'
import { useContext } from 'react'
import CartContext from '../store/CartContext'
export default function MealItem({meal}) {
  const cartCtx=useContext(CartContext)
  function handleAddToCart(){
    cartCtx.addItem(meal)
  }
  return (
    <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className='meal-item-price'>{currentFormatten.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-actions'><Button onClick={handleAddToCart} >add to cart</Button></p>
        </article>
    </li>
  )
}
