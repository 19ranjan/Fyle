function calculateTax() {
    var grossIncome = parseFloat(document.getElementById('income').value);
    var extraIncome = parseFloat(document.getElementById('extraIncome').value);
    var deductions = parseFloat(document.getElementById('deductions').value);
    var age = document.getElementById('age').value;
    var errors = [];

    if (isNaN(grossIncome)) {
        showError('income', 'Please enter valid Gross Annual Income');
        errors.push('Please enter valid Gross Annual Income');
    } else {
        hideError('income');
    }
    if (isNaN(extraIncome)) {
        showError('extraIncome', 'Please enter valid Extra Income');
        errors.push('Please enter valid Extra Income');
    } else {
        hideError('extraIncome');
    }
    if (isNaN(deductions)) {
        showError('deductions', 'Please enter valid Deductions');
        errors.push('Please enter valid Deductions');
    } else {
        hideError('deductions');
    }
    if (age === "") {
        showError('age', 'Please select an age group');
        errors.push('Please select an age group');
    } else {
        hideError('age');
    }

    if (errors.length > 0) {
        return;
    }

    var taxableIncome = grossIncome + extraIncome - deductions - 800000;
    var taxRate;
    if (taxableIncome <= 0) {
        taxRate = 0;
    } else {
        if (age === "<40") {
            taxRate = 0.3;
        } else if (age === "≥40 & <60") {
            taxRate = 0.4;
        } else {
            taxRate = 0.1;
        }
    }

    var taxAmount = taxableIncome * taxRate;
    var income = taxableIncome + taxAmount - 800000;

    // Formatting money values in rupee format
    var grossIncomeFormatted = '₹' + grossIncome.toLocaleString('en-IN');
    var extraIncomeFormatted = '₹' + extraIncome.toLocaleString('en-IN');
    var deductionsFormatted = '₹' + deductions.toLocaleString('en-IN');
    var taxableIncomeFormatted = '₹' + taxableIncome.toLocaleString('en-IN');
    var incomeFormatted = '₹' + income.toLocaleString('en-IN');

    var resultText =
        '<h3>Tax Calculation Result</h3>' +
        '<p>Gross Annual Income: ' + grossIncomeFormatted + '</p>' +
        '<p>Extra Income: ' + extraIncomeFormatted + '</p>' +
        '<p>Deductions: ' + deductionsFormatted + '</p>' +
        '<p>Taxable Income: ' + taxableIncomeFormatted + '</p>' +
        '<p>Tax Rate: ' + (taxRate * 100) + '%</p>' +
        '<h3>Your Overall Income will be</h3>' +
        '<p>' + incomeFormatted + '</p>';
    document.getElementById('modal-body').innerHTML = resultText;
    $('#resultModal').modal('show');
}

function showError(inputId, errorMessage) {
    var errorElement = document.getElementById(inputId + '-error');
    errorElement.innerHTML = errorMessage;
    errorElement.style.display = 'block';
}

function hideError(inputId) {
    var errorElement = document.getElementById(inputId + '-error');
    errorElement.style.display = 'none';
}

function downloadResult() {
    var resultContent = document.getElementById('modal-body').innerHTML;
    var filename = 'tax_calculation_result.html'; // You can change the filename as needed
    var blob = new Blob([resultContent], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}





