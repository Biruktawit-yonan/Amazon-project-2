import React from 'react'
import numeral from "numeral"
function CurrencyFormater({value}) {
    const formattedPrice = numeral(value).format("$0,0.00");

  return (
<div>
{formattedPrice}




    </div>
  )
}

export default CurrencyFormater;