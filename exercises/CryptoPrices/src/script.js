document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, JavaScript is running!");

  // Add your JS code below here
  const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
  const vs_currency = "usd";
  let page = 1;
  const per_page = 10;

  const backBtn = document.querySelector("#backBtn");
  const nextBtn = document.querySelector("#nextBtn");

  // Fetch data form API
  function fetchCryptoData(page) {
    fetch(
      `${apiUrl}?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&locale=en`
    )
      .then((response) => response.json())
      .then((data) => {
        populateTable(data);
        toggleBtn(page);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Populate table with API data
  function populateTable(data) {
    const tbody = document.querySelector("#cryptoTable tbody");
    tbody.innerHTML = "";
    data.forEach((coin) => {
      const row = `
        <tr>
          <td>
            <img src="${coin.image}" 
            alt="${coin.name}" 
            width="24"
            height="24">
            ${coin.name}
        </td>
        <td>
          $${coin.current_price.toLocaleString()}
          <span class="high">H: ${coin.high_24h.toFixed(2)}</span>
          <span class="low">L: ${coin.low_24h.toFixed(2)}</span>
        </td>
        <td>$${coin.market_cap.toLocaleString()}</td>
      </tr>
      `;
      tbody.innerHTML += row;
    });
  }

  // Toggle button states
  function toggleBtn(page) {
    backBtn.disabled = page === 1;
    nextBtn.disabled = page === 10;
  }

  // Event listeners for pagination buttons
  backBtn.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchCryptoData(page);
    }
  });

  nextBtn.addEventListener("click", () => {
    page++;
    fetchCryptoData(page);
  });

  // Initial fetch
  fetchCryptoData(page);
});
