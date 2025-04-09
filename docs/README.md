# XFT NAV BINARY OPTION MARKET


### NAV RANGES
- Contract A: NAV below $20
- Contract B: NAV $20-$22
- Contract C: NAV $22-$24
- Contract D: NAV $24-$26
- Contract E: NAV above $26



### PROJECT TREE
```
index.html
script.js
style.css
assets/
docs/
```


```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as API Server
    participant DB as Database
    participant OC as Oracle Contract

    U->>FE: Visit platform
    FE->>API: Request market data
    API->>DB: Fetch contracts & prices
    DB->>API: Return data
    API->>FE: Display markets
    
    U->>FE: Place order (buy/sell)
    FE->>API: Submit order
    API->>DB: Validate balance
    API->>DB: Update portfolio & prices
    DB->>API: Confirm transaction
    API->>FE: Show updated position
    
    Note over OC: On settlement date
    OC->>API: Fetch official NAV
    API->>DB: Determine winning contract
    API->>DB: Process payouts
    DB->>API: Confirm settlements
    API->>FE: Display results to users
```

### SEQUENCES

```
Market Data: User loads site → server fetches current contract prices → UI displays markets

Trading: User submits order → server validates funds → updates user portfolio and market prices → confirms transaction

Settlement: Oracle retrieves official NAV → system identifies winning contract → processes payouts to holders → notifies users
```
