require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===============================
// Static Files
// ===============================
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// Read Database
// ===============================
const dataFile = path.join(__dirname, "data", "nervous-data.json");

let nervousData = {};

try {
    const file = fs.readFileSync(dataFile, "utf8");
    nervousData = JSON.parse(file);
    console.log("✅ Nervous System Database Loaded");
} catch (err) {
    console.log("Database not found.");
}

// ===============================
// Stimulus Logs
// ===============================

let history = [];

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// GET Overview
// ===============================

app.get("/api/overview", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Overview fetched successfully.",

        data: nervousData.system_overview

    });

});

// ===============================
// GET Brain
// ===============================

app.get("/api/brain", (req, res) => {

    res.status(200).json({

        success: true,

        data: nervousData.brain

    });

});

// ===============================
// GET Neurons
// ===============================

app.get("/api/neurons", (req, res) => {

    res.status(200).json({

        success: true,

        data: nervousData.neurons

    });

});

// ===============================
// GET Logs
// ===============================

app.get("/api/logs", (req, res) => {

    res.status(200).json({

        success: true,

        total: history.length,

        data: history

    });

});
// ===============================
// POST : Stimulate Nervous System
// ===============================

app.post("/api/stimulate", (req, res) => {

    const { stimulus, location, intensity } = req.body;

    let errors = [];

    // ===============================
    // Validation
    // ===============================

    if (!stimulus || stimulus.trim() === "") {
        errors.push("Stimulus is required.");
    }

    const validLocations = [
        "hand",
        "foot",
        "eye",
        "ear",
        "skin",
        "nose",
        "tongue"
    ];

    if (!location || !validLocations.includes(location.toLowerCase())) {
        errors.push(
            "Location must be hand, foot, eye, ear, skin, nose or tongue."
        );
    }

    if (
        intensity === undefined ||
        intensity < 1 ||
        intensity > 10
    ) {
        errors.push("Intensity must be between 1 and 10.");
    }

    if (errors.length > 0) {

        return res.status(400).json({

            success: false,

            message: "Validation Failed",

            errors

        });

    }

    // ===============================
    // Simulation Variables
    // ===============================

    let action = "";
    let type = "";
    let pathway = [];
    let explanation = "";

    const bodyPart = location.toLowerCase();

    // ===============================
    // Hand / Foot Reflex
    // ===============================

    if (
        (bodyPart === "hand" ||
            bodyPart === "foot" ||
            bodyPart === "skin")
        &&
        intensity >= 7
    ) {

        type = "Spinal Reflex";

        action =
            bodyPart === "hand"
                ? "Withdraw Hand"
                : "Withdraw Foot";

        explanation =
            "Pain receptors immediately send signals to the spinal cord. The spinal cord sends a motor command before the brain consciously feels pain.";

        pathway = [

            "Pain Receptor",

            "Sensory Neuron",

            "Spinal Cord",

            "Motor Neuron",

            "Muscle",

            "Brain"

        ];

    }

    // ===============================
    // Eye Reflex
    // ===============================

    else if (bodyPart === "eye") {

        if (intensity >= 5) {

            type = "Optical Reflex";

            action = "Blink Eyes";

            explanation =
                "The optic nerve sends signals to the midbrain causing an immediate blink.";

            pathway = [

                "Retina",

                "Optic Nerve",

                "Midbrain",

                "Motor Neuron",

                "Eyelid"

            ];

        } else {

            type = "Visual Processing";

            action = "Observe Object";

            explanation =
                "Visual information is processed by the occipital lobe.";

            pathway = [

                "Retina",

                "Optic Nerve",

                "Thalamus",

                "Occipital Lobe"

            ];

        }

    }
        // ===============================
    // Ear Reflex
    // ===============================

    else if (bodyPart === "ear") {

        if (intensity >= 8) {

            type = "Acoustic Reflex";

            action = "Startle Response";

            explanation =
                "A loud sound activates the auditory nerve and brainstem, causing a quick startle reflex.";

            pathway = [
                "Cochlea",
                "Auditory Nerve",
                "Brainstem",
                "Motor Neuron",
                "Neck Muscles"
            ];

        } else {

            type = "Hearing";

            action = "Hear Sound";

            explanation =
                "Normal sound is processed by the temporal lobe.";

            pathway = [
                "Cochlea",
                "Auditory Nerve",
                "Thalamus",
                "Temporal Lobe"
            ];

        }

    }

    // ===============================
    // Nose
    // ===============================

    else if (bodyPart === "nose") {

        type = "Smell";

        action = "Recognize Smell";

        explanation =
            "Odor molecules stimulate receptors that send signals to the olfactory bulb.";

        pathway = [
            "Olfactory Receptors",
            "Olfactory Nerve",
            "Olfactory Bulb",
            "Brain"
        ];

    }

    // ===============================
    // Tongue
    // ===============================

    else if (bodyPart === "tongue") {

        type = "Taste";

        action = "Recognize Taste";

        explanation =
            "Taste buds detect chemicals and send signals to the gustatory cortex.";

        pathway = [
            "Taste Buds",
            "Sensory Neuron",
            "Brainstem",
            "Thalamus",
            "Gustatory Cortex"
        ];

    }

    // ===============================
    // Skin
    // ===============================

    else {

        type = "Touch";

        action = "Feel Touch";

        explanation =
            "Touch receptors send information to the parietal lobe.";

        pathway = [
            "Touch Receptors",
            "Sensory Neuron",
            "Spinal Cord",
            "Thalamus",
            "Parietal Lobe"
        ];

    }

    // ===============================
    // Save History
    // ===============================

    const log = {

        id: history.length + 1,

        stimulus,

        location,

        intensity,

        type,

        action,

        time: new Date().toLocaleString()

    };

    history.unshift(log);

    if (history.length > 20) {

        history.pop();

    }

    // ===============================
    // Response
    // ===============================

    res.status(200).json({

        success: true,

        message: "Simulation Completed Successfully",

        simulation: {

            stimulus,

            location,

            intensity,

            type,

            action,

            explanation,

            pathway

        },

        history

    });

});
// ===============================
// 404 Route
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
    console.log("====================================");
    console.log("🧠 Nervous System API Running");
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log("====================================");
});