let prices = { a: 0.15, b: 0.20, c: 0.25, d: 0.20, e: 0.20 };
let portfolio = { a: 0, b: 0, c: 0, d: 0, e: 0 };
let balance = 1000.00;

function trade(contractId, action) {
    const quantity = parseInt(document.getElementById(`quantity-${contractId}`).value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Invalid quantity");
        return;
    }
    
    const price = prices[contractId];
    const cost = price * quantity;
    
    if (action === 'buy') {
        if (balance >= cost) {
            balance -= cost;
            portfolio[contractId] += quantity;
            prices[contractId] = Math.min(0.99, price + 0.001 * quantity);
        } else {
            alert("Insufficient balance");
        }
    } else if (action === 'sell') {
        if (portfolio[contractId] >= quantity) {
            balance += cost;
            portfolio[contractId] -= quantity;
            prices[contractId] = Math.max(0.01, price - 0.001 * quantity);
        } else {
            alert("Not enough contracts");
        }
    }
    updateUI();
}

function updateUI() {
    for (const id in prices) {
        document.querySelector(`#contract-${id} .price-value`).textContent = prices[id].toFixed(2);
        document.querySelector(`#contract-${id} .probability`).textContent = (prices[id] * 100).toFixed(0) + '%';
    }
    document.getElementById('balance').textContent = balance.toFixed(2);
    
    const holdingsDiv = document.getElementById('holdings');
    holdingsDiv.innerHTML = '';
    for (const id in portfolio) {
        if (portfolio[id] > 0) {
            holdingsDiv.innerHTML += `<p>Contract ${id.toUpperCase()}: ${portfolio[id]} contracts</p>`;
        }
    }
}

// Simulate market activity
setInterval(() => {
    const ids = ['a', 'b', 'c', 'd', 'e'];
    const id = ids[Math.floor(Math.random() * 5)];
    const change = (Math.random() > 0.5 ? 0.01 : -0.01);
    prices[id] = Math.max(0.01, Math.min(0.99, prices[id] + change));
    updateUI();
}, 5000);

updateUI();