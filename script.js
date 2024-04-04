let container = document.getElementById("container");

function fetchData() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false ")
        .then((response) => {
            console.log("resolved", response);
            return response.json();
        })
        .then((data) => {
            console.log(data);

            data.forEach((coin) => {
                let row = document.createElement("div");
                row.classList.add("row");
                row.innerHTML = `
            <div>
            <img src=${coin.image} />
            <h3>${coin.name}</h3>
            </div>
            <h3>${coin.symbol}</h3>
            <h3>${coin.current_price}</h3>
            <h3>${coin.total_volume}</h3>
            <h3 id="percentage">${coin.market_cap_change_percentage_24h}</h3> 
            <h3>${coin.market_cap}</h3>
            
            `;

                container.appendChild(row);
                let intPercent = parseInt(coin.market_cap_change_percentage_24h);
                let percentage = row.querySelector("#percentage");
                if (intPercent < 0) {
                    percentage.classList.remove("green");
                    percentage.classList.add("red");
                } else {
                    percentage.classList.remove("red");
                    percentage.classList.add("green");
                }
            });
        });
}

fetchData();
