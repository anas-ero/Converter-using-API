window.onload = () => {
    currencies()
}
// If you wanna know how to use it , check readme file.
const api_key = "YOUR_API_HERE";
function convert() {
    const amount = parseFloat(document.getElementById("amount").value);
    const baseCurrency = document.getElementById("baseCurrency").value;
    const targetCurrency = document.getElementById("targetCurrency").value;
    const result = document.getElementById("result");

    if (!amount || baseCurrency === targetCurrency) {
        result.textContent = "Please enter a valid amount and different currencies.";
        return;
    }

    fetch(`https://api.currencyapi.com/v3/latest?apikey=${api_key}&base_currency=${baseCurrency}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.data[targetCurrency].value;
            const converted = amount * rate;
            result.textContent = `${amount} ${baseCurrency} = ${converted.toFixed(2)} ${targetCurrency}`;
        })
        .catch(error => {
            console.error(error);
            result.textContent = "Something went wrong. Check API key or internet.";
        });
}

function currencies() {
    // If you wanna know how to use it , check readme file.
    const api_key = "YOUR_API_HERE";
    fetch(`https://api.currencyapi.com/v3/currencies?apikey=${api_key}`)
    .then(res => res.json())
    .then(data => {
        const currencies = data.data;
        const baseSelect = document.getElementById("baseCurrency")
        const targetSelect  = document.getElementById("targetCurrency")

        for (let currency in currencies) {
            const option = document.createElement("option")
            option.value = currency
            option.textContent = `${currency} - (${currencies[currency].name})`;
            const option2 = option.cloneNode(true)

            baseSelect.appendChild(option)
            targetSelect.appendChild(option2)
        }
    })
    .catch(error => {
        console.error(error);
        result.textContent = "Something went wrong. Check API key or internet.";
    });
}
