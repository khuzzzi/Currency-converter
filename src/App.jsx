import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// lets create app on the usd as base unit.


function App() {
  let URL = "https://v6.exchangerate-api.com/v6/045093810f76659a9c01c17e/latest/USD"
  const [basecurrency , setBaseCurrency] = useState("USD")
  const handlebasecurrency = (e)=>{
    setBaseCurrency(e.target.value)
  }
  URL = `https://v6.exchangerate-api.com/v6/045093810f76659a9c01c17e/latest/${basecurrency}`
  
  const [currency , setCurrency] = useState(null)
  const handleCurrencyChange = (e)=>{
    setCurrency(e.target.value)
  }
  // amount to be converted
  const [amount, setAmount] = useState(0)
  const handleAmountChange = (e)=>{
    setAmount(e.target.value)
  }
  const [convertedamount , setConvertedAmount] = useState(null)
  const [exchangerate , setExchangeRate] = useState(null)
  
  
  const handleConversion = async ()=>{
    let response = await fetch (URL)
    let data = await response.json();
    setExchangeRate(data.conversion_rates)

    if (data.conversion_rates && currency in data.conversion_rates){
      const rate = data.conversion_rates[currency]
      setConvertedAmount(rate * amount)
    }else{
      setConvertedAmount("currency Not Found")
    }
  }



  
  
      
      

  
  


  return (
    <>
      <center>
        <h1 style={{ margin: "20px" }}>Currency Converter App</h1>
        
        <form style={{margin : "20px"}}>
         
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Base Currency : </label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlebasecurrency} style={{width : "30%"}}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Add The Currency That You Want To Convert To : </label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleCurrencyChange} style={{width : "30%"}}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">How Much To Convert To ? </label>
            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleAmountChange} style={{width : "30%"}}/>
          </div>
        </form>
        <button type="button" class="btn btn-primary" onClick={handleConversion}>Convert</button>
        <div style={{margin : "20px"}}>
          <p>THE {basecurrency} TO {currency} IS :</p>
          {convertedamount}
        </div>
      </center>
    </>
  )
}

export default App
