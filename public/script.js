const BASE_URL = "http://localhost:5000";

const output = document.getElementById("output");

// ==============================
// Display JSON
// ==============================

function showData(data) {
    output.textContent = JSON.stringify(data, null, 4);
}

// ==============================
// Display Error
// ==============================

function showError(error) {
    output.textContent = error;
}

// ==============================
// GET Overview
// ==============================

async function getOverview() {

    try {

        const response = await fetch(`${BASE_URL}/api/overview`);

        const data = await response.json();

        showData(data);

    }

    catch (err) {

        showError(err.message);

    }

}

// ==============================
// GET Brain
// ==============================

async function getBrain() {

    try {

        const response = await fetch(`${BASE_URL}/api/brain`);

        const data = await response.json();

        showData(data);

    }

    catch (err) {

        showError(err.message);

    }

}

// ==============================
// GET Neurons
// ==============================

async function getNeurons() {

    try {

        const response = await fetch(`${BASE_URL}/api/neurons`);

        const data = await response.json();

        showData(data);

    }

    catch (err) {

        showError(err.message);

    }

}

// ==============================
// GET Logs
// ==============================

async function getLogs() {

    try {

        const response = await fetch(`${BASE_URL}/api/logs`);

        const data = await response.json();

        showData(data);

    }

    catch (err) {

        showError(err.message);

    }

}