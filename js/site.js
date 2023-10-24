function getValues() {

    let loanValueInput = document.getElementById('loanInput');
    let termValueInput = document.getElementById('termInput');
    let rateValueInput = document.getElementById('interestInput');

    if (loanValueInput == null || loanValueInput == undefined)
        return;
    if (termValueInput == null || termValueInput == undefined)
        return;
    if (rateValueInput == null || rateValueInput == undefined)
        return;
    
    let loanValue = loanValueInput.value;

    loanValue = parseInt(loanValueInput.value);

    let termValue = termValueInput.value;

    let rateValue = rateValueInput.value;

    let x = Math.pow(1 + (rateValue / 1200), termValue);

    let totalMonthlyPayment = ((loanValue) * x * (rateValue / 1200)) / (x - 1);

    let remainingBalance = loanValue;

    let totalInterestPaid = 0;

    let principalPayments = [];

    let interestPayments = [];

    let interestPaids = [];

    let remainingBalances = [];

    for (let i = 0; i < termValue; i++) {
        interestPayments[i] = remainingBalance * (rateValue / 1200);
        principalPayments[i] = totalMonthlyPayment - interestPayments[i];
        remainingBalance = remainingBalance - principalPayments[i];
        remainingBalances[i] = remainingBalance; 
        totalInterestPaid = totalInterestPaid + interestPayments[i];
        interestPaids[i] = totalInterestPaid;
    }

    let values = {
        loanValue: loanValue,
        termValue: termValue,
        rateValue: rateValue,
        totalMonthlyPayment: totalMonthlyPayment,
        totalInterestPaid: totalInterestPaid
    };



    displayValues(values, interestPayments, principalPayments, remainingBalances, interestPaids);

    return values;
    
}

function displayValues(values, interestPayments, principalPayments, remainingBalances, interestPaids) {

    let totalCost = +values.loanValue + +values.totalInterestPaid;

    document.getElementById('total-principal').innerHTML = `Total Principal: ${values.loanValue.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;

    document.getElementById('monthly-payment').innerHTML = values.totalMonthlyPayment.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    document.getElementById('total-interest').innerHTML = `Total Interest: ${values.totalInterestPaid.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;

    document.getElementById('total-cost').innerHTML = `Total Cost: ${totalCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;
    
    const paymentTable = document.getElementById('mortgage-table');

    paymentTable.innerHTML = '';

    // build the table
    for (let i = 0; i < principalPayments.length; i++) {
        let value = values[i];

        let tableRow = document.createElement('tr');

        let tableMonth = document.createElement('td');
        tableMonth.innerText = i + 1;
        tableRow.appendChild(tableMonth);

        let tablePayment = document.createElement('td');
        tablePayment.innerText = (values.totalMonthlyPayment).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        tableRow.appendChild(tablePayment);

        let tablePrincipal = document.createElement('td');
        tablePrincipal.innerText = (principalPayments[i]).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        tableRow.appendChild(tablePrincipal);

        let tableInterest = document.createElement('td');
        tableInterest.innerText = (interestPayments[i]).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        tableRow.appendChild(tableInterest);

        let tableTotalInterestPaid = document.createElement('td');
        tableTotalInterestPaid.innerText = (interestPaids[i]).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        tableRow.appendChild(tableTotalInterestPaid);

        let tableBalance = document.createElement('td');
        tableBalance.innerText = Math.abs(remainingBalances[i]).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        tableRow.appendChild(tableBalance);

        paymentTable.appendChild(tableRow);
    }
}