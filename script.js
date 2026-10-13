
/* ================================
   DESTINATION SEARCH
================================ */

const destinations = [

    // Andhra Pradesh
    "Vijayawada",
    "Visakhapatnam",
    "Tirupati",
    "Guntur",
    "Araku Valley",
    "Amaravati",

    // Telangana
    "Hyderabad",
    "Warangal",

    // Karnataka
    "Bengaluru",
    "Mysore",
    "Coorg",
    "Hampi",
    "Gokarna",
    "Mangalore",

    // Tamil Nadu
    "Chennai",
    "Ooty",
    "Kodaikanal",
    "Madurai",
    "Coimbatore",
    "Rameswaram",
    "Pondicherry",

    // Kerala
    "Kochi",
    "Munnar",
    "Alappuzha",
    "Wayanad",
    "Kovalam",
    "Varkala",
    "Thekkady",

    // Goa
    "Goa",

    // Maharashtra
    "Mumbai",
    "Pune",
    "Nashik",
    "Lonavala",
    "Mahabaleshwar",

    // Rajasthan
    "Jaipur",
    "Udaipur",
    "Jaisalmer",
    "Jodhpur",
    "Pushkar",
    "Mount Abu",

    // Delhi & North India
    "Delhi",
    "Agra",
    "Amritsar",
    "Rishikesh",
    "Haridwar",
    "Varanasi",

    // Himachal Pradesh
    "Manali",
    "Shimla",
    "Dharamshala",
    "Kasol",
    "Dalhousie",

    // Uttarakhand
    "Mussoorie",
    "Nainital",
    "Auli",

    // Jammu & Kashmir / Ladakh
    "Srinagar",
    "Gulmarg",
    "Pahalgam",
    "Leh",
    "Ladakh",

    // West Bengal & Northeast
    "Kolkata",
    "Darjeeling",
    "Gangtok",
    "Shillong",
    "Guwahati",

    // Gujarat
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Dwarka",
    "Rann of Kutch",

    // International
    "Dubai",
    "Abu Dhabi",
    "Singapore",
    "Bangkok",
    "Bali",
    "Maldives",
    "Paris",
    "London",
    "Rome",
    "Switzerland",
    "Tokyo",
    "Seoul",
    "Sydney",
    "New York"

];

function searchDestination() {

    const input =
        document.getElementById("destination");

    const suggestions =
        document.getElementById("destination-suggestions");

    const search =
        input.value.trim().toLowerCase();


    suggestions.innerHTML = "";


    if (search === "") {
        return;
    }


    const matches =
        destinations
            .filter(function(city) {
                return city.toLowerCase().startsWith(search);
            })
            .slice(0, 6);


    matches.forEach(function(city) {

        const item =
            document.createElement("div");

        item.className = "suggestion-item";

        item.innerHTML = "📍 " + city;


        item.onclick = function() {

            input.value = city;

            suggestions.innerHTML = "";
        };


        suggestions.appendChild(item);
    });
}
/* ================================
   STARTING LOCATION SEARCH
================================ */

function searchStartLocation() {

    const input =
        document.getElementById("startLocation");

    const suggestions =
        document.getElementById("start-suggestions");

    const search =
        input.value.trim().toLowerCase();

    suggestions.innerHTML = "";

    if (search === "") {
        return;
    }

    const matches =
        destinations
            .filter(function(city) {
                return city.toLowerCase().startsWith(search);
            })
            .slice(0, 6);

    matches.forEach(function(city) {

        const item =
            document.createElement("div");

        item.className = "suggestion-item";

        item.innerHTML = "📍 " + city;

        item.onclick = function() {

            input.value = city;

            suggestions.innerHTML = "";
        };

        suggestions.appendChild(item);
    });
}

let selectedBudget = "";
let selectedStyle = "";
let selectedInterests = [];


/* ================================
   NAVIGATION
================================ */

function goToPlanner() {
    document.getElementById("planner").scrollIntoView({
        behavior: "smooth"
    });
}


function goToDestinations() {
    document.getElementById("destinations").scrollIntoView({
        behavior: "smooth"
    });
}


/* ================================
   BUDGET
================================ */

function chooseBudget(button, budget) {

    selectedBudget = budget;

    const buttons = document.querySelectorAll(".budget");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}


/* ================================
   INTERESTS
================================ */

function toggleInterest(button, interest) {

    if (selectedInterests.includes(interest)) {

        selectedInterests =
            selectedInterests.filter(function(item) {
                return item !== interest;
            });

        button.classList.remove("selected");

    } else {

        selectedInterests.push(interest);

        button.classList.add("selected");
    }
}


/* ================================
   TRAVEL STYLE
================================ */

function chooseStyle(button, style) {

    selectedStyle = style;

    const buttons =
        document.querySelectorAll(".travel-style");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}


/* ================================
   GENERATE TRIP
================================ */

function generateTrip() {

    const startLocation =
        document.getElementById("startLocation").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const days =
        Number(document.getElementById("days").value);

    const travelers =
        Number(document.getElementById("travelers").value);

    const result =
        document.getElementById("planner-result");


    /* VALIDATION */

    if (startLocation === "") {

        showResult(
            result,
            "📍 Please enter your starting location."
        );

        return;
    }


    if (destination === "") {

        showResult(
            result,
            "🌍 Please enter your destination."
        );

        return;
    }


    if (!days || days < 1) {

        showResult(
            result,
            "📅 Please enter the number of days."
        );

        return;
    }


    if (!travelers || travelers < 1) {

        showResult(
            result,
            "👥 Please enter the number of travelers."
        );

        return;
    }


    if (selectedBudget === "") {

        showResult(
            result,
            "💰 Please choose a budget."
        );

        return;
    }


    if (selectedInterests.length === 0) {

        showResult(
            result,
            "❤️ Choose at least one interest."
        );

        return;
    }


    if (selectedStyle === "") {

        showResult(
            result,
            "🧭 Choose your travel style."
        );

        return;
    }


    /* ================================
       MATCH SCORE
    ================================= */

    let score = 70;

    score += selectedInterests.length * 4;

    if (selectedStyle === "Balanced") {
        score += 5;
    }

    if (selectedBudget === "Medium") {
        score += 5;
    }

    if (score > 98) {
        score = 98;
    }


    /* ================================
       ESTIMATED BUDGET
    ================================= */

    let dailyBudget = 0;

    if (selectedBudget === "Low") {
        dailyBudget = 1800;
    }

    if (selectedBudget === "Medium") {
        dailyBudget = 3500;
    }

    if (selectedBudget === "High") {
        dailyBudget = 7000;
    }


    const estimatedTotal =
        dailyBudget * days * travelers;


    const formattedBudget =
        estimatedTotal.toLocaleString("en-IN");


    /* ================================
       ITINERARY
    ================================= */

    let itinerary = "";


    if (selectedStyle === "Relaxed") {

        itinerary = `
            <strong>Relaxed itinerary</strong>
            <br>
            Fewer activities with more free time
            to explore ${destination}.
        `;

    } else if (selectedStyle === "Packed") {

        itinerary = `
            <strong>Packed itinerary</strong>
            <br>
            More activities and experiences
            throughout your ${days}-day trip.
        `;

    } else {

        itinerary = `
            <strong>Balanced itinerary</strong>
            <br>
            A mix of sightseeing, experiences
            and free time.
        `;
    }


    /* ================================
       RESULT
    ================================= */

    result.innerHTML = `

        <div class="trip-result-card">

            <div class="trip-result-top">

                <div>

                    <small>YOUR TRIPWISE PLAN</small>

                    <h3>
                        ${destination}
                    </h3>

                    <p>
                        ${days} days •
                        ${travelers} travelers
                    </p>

                </div>


                <div class="match-score">

                    <strong>${score}%</strong>

                    <small>
                        Trip Match
                    </small>

                </div>

            </div>


            <hr>


            <div class="trip-summary">

                <div>
                    <span>📍</span>
                    <strong>From</strong>
                    <p>${startLocation}</p>
                </div>


                <div>
                    <span>💰</span>
                    <strong>Budget</strong>
                    <p>${selectedBudget}</p>
                </div>


                <div>
                    <span>💵</span>
                    <strong>Estimated</strong>
                    <p>₹${formattedBudget}</p>
                </div>

            </div>


            <div class="trip-interests">

                <strong>Your interests</strong>

                <p>
                    ${selectedInterests.join(" • ")}
                </p>

            </div>


            <div class="trip-itinerary">

                <strong>🗓️ Trip style</strong>

                <p>
                    ${itinerary}
                </p>

            </div>


            <button
                class="optimize-btn"
                onclick="optimizeTrip()">

                ✨ Optimize My Trip

            </button>

        </div>
    `;

    result.classList.add("show");

    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/* ================================
   RESULT MESSAGE
================================ */

function showResult(result, message) {

    result.innerHTML = message;

    result.classList.add("show");
}


/* ================================
   OPTIMIZE TRIP
================================ */

function optimizeTrip() {

    const result =
        document.getElementById("planner-result");

    result.innerHTML += `

        <div class="optimization-message">

            ✨ <strong>TripWise Optimization</strong>

            <p>
                We're looking for ways to reduce unnecessary
                costs while keeping your selected experiences.
            </p>

            <div class="optimization-items">

                ✓ Review accommodation options<br>

                ✓ Compare transportation choices<br>

                ✓ Prioritize your selected interests

            </div>

        </div>
    `;
}
/* ================================
   TRAVEL & STAY
================================ */

let selectedTransport = "";
let selectedHotel = "";


/* TRANSPORT */

function chooseTransport(button, transport) {

    selectedTransport = transport;

    const buttons =
        document.querySelectorAll(".travel-option");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}


/* HOTEL */

function chooseHotel(button, hotel) {

    selectedHotel = hotel;

    const buttons =
        document.querySelectorAll(".hotel-option");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}
function findTravelOptions() {
    const result = document.getElementById("travel-stay-result");
    const destination = document.getElementById("destination").value.trim();

    if (!selectedTransport) {
        result.innerHTML = "<p>Please choose Flight, Train or Bus.</p>";
        return;
    }

    if (!selectedBudget) {
        result.innerHTML = "<p>Please choose your trip budget in the Smart Trip Planner.</p>";
        return;
    }

    if (!selectedHotel) {
        result.innerHTML = "<p>Please choose your preferred hotel type.</p>";
        return;
    }

    if (!destination) {
        result.innerHTML = "<p>Please enter your destination in the Smart Trip Planner.</p>";
        return;
    }

    // Show travel and stay recommendations
    showTripwiseRecommendations(destination);

    // Scroll to the recommendation cards
    document.getElementById("recommendations").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* FIND OPTIONS */

const tripwiseRecommendations = {

    "Goa": {
        low: {
            hotels: ["Savage Hotel", "Ocean Breeze Stay"],
            travel: ["Goa Ride Travels", "Coastal Connect"],
            interests: {
                Beaches: ["Beachside Budget Stay"],
                Adventure: ["Goa Adventure Travels"],
                Food: ["Goa Food Trails"],
                Nature: ["Goa Nature Tours"],
                Culture: ["Goa Heritage Travels"],
                Shopping: ["Goa Shopping Tours"]
            }
        },
        medium: {
            hotels: ["Palm Cove Resort", "Sunset Bay Hotel"],
            travel: ["Swing Travels", "Sunway Tours"],
            interests: {
                Beaches: ["Palm Beach Tours"],
                Adventure: ["Goa Adventure Tours"],
                Food: ["Goa Food Explorer"],
                Nature: ["Goa Nature Connect"],
                Culture: ["Goa Heritage Tours"],
                Shopping: ["Goa Shopping Connect"]
            }
        },
        high: {
            hotels: ["Sunset Bay Resort", "Palm Coast Luxury Stay"],
            travel: ["Goa Elite Travels", "Coastal Premium Tours"],
            interests: {
                Beaches: ["Goa Premium Beach Tours"],
                Adventure: ["Goa Extreme Adventures"],
                Food: ["Goa Gourmet Trails"],
                Nature: ["Goa Premium Nature Tours"],
                Culture: ["Goa Cultural Experiences"],
                Shopping: ["Goa Premium Shopping Tours"]
            }
        }
    },

    "Manali": {
        low: {
            hotels: ["Mountain View Stay", "Pine Woods Retreat"],
            travel: ["Snowline Travels", "Manali Connect"]
        },
        medium: {
            hotels: ["Snow Valley Resort", "Himalayan Comfort Hotel"],
            travel: ["Himalayan Trails", "Mountain Ride Tours"]
        },
        high: {
            hotels: ["Himalayan Grand Resort", "Mountain Crown Retreat"],
            travel: ["Himalayan Elite Tours", "Snow Peak Travels"]
        }
    },

    "Vijayawada": {
        low: {
            hotels: ["City Comfort Inn", "Central Stay Vijayawada"],
            travel: ["Krishna Travels", "City Ride Travels"]
        },
        medium: {
            hotels: ["Riverfront Residency", "Krishna View Hotel"],
            travel: ["AP Travel Connect", "Vijaya Tours"]
        },
        high: {
            hotels: ["Riverfront Grand", "Krishna Luxury Stay"],
            travel: ["AP Premium Travels", "Vijaya Elite Tours"]
        }
    },

    "Hyderabad": {
        low: {
            hotels: ["Deccan Comfort", "City Pearl Hotel"],
            travel: ["CityRide Tours", "Hyderabad Connect"]
        },
        medium: {
            hotels: ["Charminar View Stay", "Hyderabad Central"],
            travel: ["Deccan Travels", "Telangana Travel Hub"]
        },
        high: {
            hotels: ["Deccan Grand Hotel", "Charminar Luxury Stay"],
            travel: ["Hyderabad Elite Tours", "Deccan Premium Travels"]
        }
    },

    "Visakhapatnam": {
        low: {
            hotels: ["Coastal Comfort Stay", "Vizag Budget Inn"],
            travel: ["Vizag Ride Travels", "Coastal Connect Vizag"]
        },
        medium: {
            hotels: ["Bay View Residency", "Harbour View Hotel"],
            travel: ["Vizag Travel Hub", "Coastal Trails"]
        },
        high: {
            hotels: ["Bay Grand Resort", "Ocean Crown Vizag"],
            travel: ["Vizag Elite Travels", "Coastal Premium Tours"]
        }
    },

    "Bengaluru": {
        low: {
            hotels: ["City Nest Bengaluru", "Garden City Stay"],
            travel: ["Bengaluru Connect", "City Ride Tours"]
        },
        medium: {
            hotels: ["Urban Comfort Hotel", "Garden View Residency"],
            travel: ["Bangalore Travel Hub", "City Explorer Tours"]
        },
        high: {
            hotels: ["Bengaluru Grand", "Garden City Luxury"],
            travel: ["Bengaluru Elite Travels", "Urban Premium Tours"]
        }
    },

    "Kochi": {
        low: {
            hotels: ["Harbour Comfort Stay", "Kochi Budget Rooms"],
            travel: ["Kochi Ride Travels", "Coastal Kerala Tours"]
        },
        medium: {
            hotels: ["Harbour View Hotel", "Kerala Comfort Resort"],
            travel: ["Kochi Travel Hub", "Backwater Trails"]
        },
        high: {
            hotels: ["Kerala Grand Resort", "Harbour Crown Stay"],
            travel: ["Kerala Elite Tours", "Premium Backwater Travels"]
        }
    },

    "Jaipur": {
        low: {
            hotels: ["Pink City Stay", "Jaipur Comfort Inn"],
            travel: ["Pink City Travels", "Rajasthan Ride Tours"]
        },
        medium: {
            hotels: ["Heritage View Hotel", "Royal Jaipur Stay"],
            travel: ["Rajasthan Travel Hub", "Pink City Explorer"]
        },
        high: {
            hotels: ["Royal Palace Resort", "Jaipur Grand Heritage"],
            travel: ["Royal Rajasthan Tours", "Jaipur Elite Travels"]
        }
    },

    "Delhi": {
        low: {
            hotels: ["Capital Comfort Stay", "Delhi City Inn"],
            travel: ["Delhi Connect Travels", "Capital Ride Tours"]
        },
        medium: {
            hotels: ["Central Delhi Hotel", "Capital View Residency"],
            travel: ["Delhi Travel Hub", "Capital Explorer Tours"]
        },
        high: {
            hotels: ["Capital Grand Hotel", "Imperial Delhi Stay"],
            travel: ["Delhi Elite Travels", "Capital Premium Tours"]
        }
    },

    "Mumbai": {
        low: {
            hotels: ["Mumbai City Stay", "Harbour Comfort Inn"],
            travel: ["Mumbai Ride Travels", "City Connect Tours"]
        },
        medium: {
            hotels: ["Marine View Hotel", "Mumbai Central Stay"],
            travel: ["Mumbai Travel Hub", "Coastal Explorer"]
        },
        high: {
            hotels: ["Marine Grand Resort", "Mumbai Crown Hotel"],
            travel: ["Mumbai Elite Travels", "Coastal Premium Tours"]
        }
    },
    "Ooty": {
        low: {
            hotels: ["Ooty Budget Inn", "Pine View Stay"],
            travel: ["Ooty Hill Travels", "Nilgiri Connect"]
        },
        medium: {
            hotels: ["Blue Hills Resort", "Garden Valley Hotel"],
            travel: ["Nilgiri Travel Hub", "Mountain Ride Tours"]
        },
        high: {
            hotels: ["Ooty Grand Retreat", "Cloud Nine Resort"],
            travel: ["Nilgiri Elite Tours", "Premium Hill Travels"]
        }
    },

    "Coorg": {
        low: {
            hotels: ["Coorg Green Stay", "Coffee Estate Inn"],
            travel: ["Coorg Nature Travels", "Green Valley Tours"]
        },
        medium: {
            hotels: ["Coffee Blossom Resort", "Coorg Valley Hotel"],
            travel: ["Coorg Travel Hub", "Western Ghats Tours"]
        },
        high: {
            hotels: ["Coorg Grand Resort", "Misty Hills Retreat"],
            travel: ["Coorg Elite Tours", "Premium Nature Travels"]
        }
    },

    "Chennai": {
        low: {
            hotels: ["Marina Budget Stay", "Chennai City Inn"],
            travel: ["Chennai Connect", "Coastal City Travels"]
        },
        medium: {
            hotels: ["Marina View Hotel", "Chennai Comfort Suites"],
            travel: ["Chennai Travel Hub", "City Explorer Tours"]
        },
        high: {
            hotels: ["Chennai Grand Hotel", "Ocean Crown Resort"],
            travel: ["Chennai Elite Travels", "Coastal Premium Tours"]
        }
    },

    "Guntur": {
        low: {
            hotels: ["Guntur Comfort Inn", "City Budget Stay"],
            travel: ["Guntur Ride Travels", "City Connect Tours"]
        },
        medium: {
            hotels: ["Grand Guntur Hotel", "City View Residency"],
            travel: ["Guntur Travel Hub", "Andhra Explorer Tours"]
        },
        high: {
            hotels: ["Guntur Grand Residency", "Premium City Suites"],
            travel: ["Guntur Elite Travels", "Andhra Premium Tours"]
        }
    },

    "Agra": {
        low: {
            hotels: ["Taj City Budget Stay", "Agra Comfort Inn"],
            travel: ["Agra City Travels", "Heritage Connect"]
        },
        medium: {
            hotels: ["Taj View Residency", "Heritage Garden Hotel"],
            travel: ["Agra Travel Hub", "Taj Explorer Tours"]
        },
        high: {
            hotels: ["Taj Grand Retreat", "Royal Heritage Resort"],
            travel: ["Agra Elite Tours", "Royal Heritage Travels"]
        }
    },

};


function getRandomRecommendation(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function showTripwiseRecommendations(destination) {
    showTravelGroups(
    document.getElementById("startLocation").value,
    document.getElementById("destination").value
);
    const section = document.getElementById("recommendations");

    if (!section) {
        alert("Recommendations section not found!");
        return;
    }

    const data = tripwiseRecommendations[destination];
    const budget = (selectedBudget || "medium").toLowerCase();

    if (!data) {
        section.style.display = "block";
        section.innerHTML = `
            <h2>Explore ${destination}</h2>
            <p>Sorry, recommendations are not available for this destination yet.</p>
        `;
        section.scrollIntoView({ behavior: "smooth" });
        return;
    }

    const budgetData = data[budget] || data.medium;

    if (!budgetData || !budgetData.hotels || !budgetData.travel) {
        section.innerHTML = "<p>Recommendations are not available for this budget.</p>";
        section.style.display = "block";
        section.scrollIntoView({ behavior: "smooth" });
        return;
    }

    const transportImages = {
        Flight: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
        Train: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
        Bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80"
    };

    const hotelImages = [
"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80"
];

const hotelImage = () =>
hotelImages[Math.floor(Math.random() * hotelImages.length)];

    //const transport = selectedTransport || "Bus";
    const hotels = budgetData.hotels;
    const travel = budgetData.travel;

    const hotel1 = hotels[0];
    const hotel2 = hotels[1] || hotels[0];
    const transportNames = {
    Bus: [
        "APSRTC",
        "TSRTC",
        "Orange Travels",
        "VRL Travels",
        "IntrCity SmartBus",
        "zingbus",
        "SRS Travels",
        "Kaveri Travels"
    ],
    Train: [
        "Vande Bharat Express",
        "Shatabdi Express",
        "Rajdhani Express",
        "Duronto Express",
        "Garib Rath Express",
        "Jan Shatabdi Express",
        "Godavari Express",
        "Pinakini Express"
    ],
    Flight: [
        "IndiGo",
        "Air India",
        "Air India Express",
        "Akasa Air",
        "SpiceJet",
        "Alliance Air",
        "Emirates",
        "Qatar Airways"
    ]
};

const transportKey = String(selectedTransport || "Bus").trim();
const transport = {
    bus: "Bus",
    train: "Train",
    flight: "Flight"
}[transportKey.toLowerCase()] || "Bus";

const transportRecommendations = {
    Bus: [
        {
            name: "APSRTC",
            description: "Explore state-run bus services for your journey.",
            tags: ["Bus", "Road travel"]
        },
        {
            name: "Orange Travels",
            description: "Explore private intercity bus services.",
            tags: ["Bus", "Intercity"]
        },
        {
            name: "IntrCity SmartBus",
            description: "Explore scheduled intercity bus options.",
            tags: ["Bus", "Comfort"]
        }
    ],

    Train: [
        {
            name: "Vande Bharat Express",
            description: "Explore semi-high-speed train services.",
            tags: ["Train", "Express"]
        },
        {
            name: "Rajdhani Express",
            description: "Explore premium long-distance train services.",
            tags: ["Train", "Long distance"]
        },
        {
            name: "Shatabdi Express",
            description: "Explore intercity express train services.",
            tags: ["Train", "Intercity"]
        }
    ],

    Flight: [
        {
            name: "IndiGo",
            description: "Explore airline options for your destination.",
            tags: ["Flight", "Airline"]
        },
        {
            name: "Air India",
            description: "Explore domestic and international air travel.",
            tags: ["Flight", "Airline"]
        },
        {
            name: "Akasa Air",
            description: "Explore airline services for your journey.",
            tags: ["Flight", "Airline"]
        }
    ]
};

const options = transportRecommendations[transport];
const recommendation =
    options[Math.floor(Math.random() * options.length)];

const travelName = recommendation.name;
const travelDescription = recommendation.description;
const travelTags = recommendation.tags;
function createCard(title, type, description, image, tags) {
    const icons = {
        HOTEL: "🏠",
        FLIGHT: "✈️",
        BUS: "🚌",
        TRAIN: "🚆"
    };

    const icon = icons[type.toUpperCase()] || "🌍";

    return `
        <article class="recommendation-card">
            <div class="recommendation-icon">
                ${icon}
            </div>

            <img
                class="recommendation-photo"
                src="${image}"
                alt="${type}"
                loading="lazy"
            >

            <div class="recommendation-content">
                <span class="recommendation-type">${type}</span>
                <h3>${title}</h3>
                <p>${description}</p>

                <div class="recommendation-tags">
                    ${tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
            </div>
        </article>
    `;
}

    section.innerHTML = `
        <div class="recommendations-heading">
            <span>TRIPWISE PICKS</span>
            <h2>Your Trip to ${destination}</h2>
            <p>Explore travel and stay ideas for your selected budget.</p>
        </div>

        <div class="recommendation-grid">
            ${createCard(
                hotel1,
                "HOTEL",
                "A sample stay suggestion for your trip.",
                hotelImage(),
                ["Stay", budget + " budget"]
            )}

            ${createCard(
                hotel2,
                "HOTEL",
                "Another accommodation suggestion to explore.",
                hotelImage(),
                ["Alternative", "Stay"]
            )}

            ${createCard(
                travelName,
                transport.toUpperCase(),
                `Explore ${transport.toLowerCase()} options for ${destination}.`,
                transportImages[transport] || transportImages.Bus,
                [transport, "Travel"]
            )}
        </div>
    `;

    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth", block: "start" });
}
function getRandomRecommendation(list) {
    return list[Math.floor(Math.random() * list.length)];
}
/* ===== TRIPWISE GROUPMATCH ===== */

function calculateGroupMatch() {
const groupName = document.getElementById("groupName").value.trim();
const budget = document.getElementById("groupBudget").value;
const style = document.getElementById("groupStyle").value;
const interest = document.getElementById("groupInterest").value;
const members = Number(document.getElementById("groupMembers").value);
const result = document.getElementById("groupmatch-result");

if (!groupName) {
    alert("Please enter a group name.");
    return;
}

if (!Number.isInteger(members) || members < 2 || members > 50) {
    alert("Please enter between 2 and 50 travelers.");
    return;
}

// Demo score based on the selected settings
const budgetPoints = {
    Low: 30,
    Medium: 25,
    High: 20
};

const stylePoints = {
    Relaxed: 30,
    Balanced: 25,
    Packed: 20
};

const interestPoints = {
    Beaches: 20,
    Adventure: 19,
    Nature: 18,
    Food: 17,
    Culture: 16,
    Shopping: 15
};

const score = Math.min(
    100,
    budgetPoints[budget] +
    stylePoints[style] +
    interestPoints[interest]
);

let message;

if (score >= 80) {
    message = "Great starting point for planning your group trip!";
} else if (score >= 65) {
    message = "A good starting point. Discuss everyone's preferences before deciding.";
} else {
    message = "Compare everyone's preferences to find a trip that suits the group.";
}

result.innerHTML = `
    <div class="groupmatch-icon">🤝</div>
    <h3>${groupName}</h3>
    <p>${members} travelers · ${budget} budget</p>

    <div class="match-score">
        ${score}<span>/100</span>
    </div>

    <p>${message}</p>
    <p><strong>Travel style:</strong> ${style}</p>
    <p><strong>Main interest:</strong> ${interest}</p>

    <small>
        Demo score based on selected settings.
        It does not yet compare individual travelers.
    </small>
`;

result.scrollIntoView({
    behavior: "smooth",
    block: "center"
});

}
/* ===== TRIPWISE TRAVEL GROUPS ===== */

const travelGroups = {
    "vijayawada|goa": [
        {
            name: "Goa Weekend Gang",
            members: 8,
            description: "Beach visits, food and budget travel."
        },
        {
            name: "Beach Explorers",
            members: 5,
            description: "Discover beaches and hidden places."
        }
    ],

    "vijayawada|ooty": [
        {
            name: "Ooty Nature Lovers",
            members: 6,
            description: "Hills, gardens and beautiful views."
        },
        {
            name: "Mountain Trip Friends",
            members: 4,
            description: "A relaxed hill station trip."
        }
    ],

    "guntur|coorg": [
        {
            name: "Coorg Adventure Group",
            members: 7,
            description: "Nature, waterfalls and adventure."
        },
        {
            name: "Green Escape Travelers",
            members: 5,
            description: "Coffee estates and scenic views."
        }
    ],

    "vijayawada|hyderabad": [
        {
            name: "Hyderabad City Squad",
            members: 9,
            description: "Food spots, shopping and city attractions."
        },
        {
            name: "Weekend Explorers",
            members: 4,
            description: "Explore famous places on a short trip."
        }
    ],

    "guntur|goa": [
        {
            name: "Goa Budget Travelers",
            members: 6,
            description: "Affordable stays, beaches and local food."
        }
    ],

    "vijayawada|chennai": [
        {
            name: "Chennai Beach Buddies",
            members: 5,
            description: "Beaches, temples and local attractions."
        }
    ],

    "guntur|ooty": [
        {
            name: "Ooty Hill Station Crew",
            members: 7,
            description: "Cool weather, gardens and mountain views."
        }
    ],

    "vijayawada|jaipur": [
        {
            name: "Jaipur Heritage Group",
            members: 6,
            description: "Forts, palaces and Rajasthani culture."
        }
    ]
};

function showTravelGroups(startLocation, destination) {
    const container = document.getElementById("travel-group-list");

    if (!container) return;

    const start = startLocation.trim().toLowerCase();
    const end = destination.trim().toLowerCase();

    if (!start || !end) {
        container.innerHTML = `
            <p class="travel-groups-placeholder">
                Enter your starting point and destination
                to find travel groups.
            </p>
        `;
        return;
    }

    const key = `${start}|${end}`;
    const groups = travelGroups[key] || [];

    if (groups.length === 0) {
        container.innerHTML = `
            <p class="travel-groups-placeholder">
                No demo groups are available for
                ${startLocation} to ${destination} yet.
            </p>
        `;
        return;
    }

    container.innerHTML = groups.map((group, index) => `
        <div class="travel-group-card">
            <h3>👥 ${group.name}</h3>
            <p>${group.members} members</p>
            <p>${group.description}</p>

            <button type="button"
                onclick='openTravelChat(${JSON.stringify(key)}, ${index})'>
                Open Chat
            </button>
        </div>
    `).join("");

    // Automatically scroll to the Travel Group section
    document.getElementById("travel-groups").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* ===== TRAVEL GROUP CHAT FUNCTIONS ===== */

function openTravelChat(destination, groupIndex) {
const group = travelGroups[destination][groupIndex];

const modal = document.getElementById("travel-chat-modal");
const title = document.getElementById("travel-chat-title");
const messages = document.getElementById("travel-chat-messages");

title.textContent = group.name;
messages.innerHTML = "";

const welcome = document.createElement("p");
welcome.className = "travel-chat-welcome";
welcome.textContent = "Welcome to " + group.name + "! Start your conversation.";
messages.appendChild(welcome);

modal.style.display = "flex";

document.getElementById("travel-chat-input").focus();

}

function closeTravelChat() {
document.getElementById("travel-chat-modal").style.display = "none";
}

function sendTravelMessage(event) {
event.preventDefault();

const input = document.getElementById("travel-chat-input");
const messages = document.getElementById("travel-chat-messages");
const messageText = input.value.trim();

if (messageText === "") {
    return;
}

const welcome = messages.querySelector(".travel-chat-welcome");

if (welcome) {
    welcome.remove();
}

const message = document.createElement("div");
message.className = "travel-chat-message";

const sender = document.createElement("strong");
sender.textContent = "You";

const text = document.createElement("span");
text.textContent = messageText;

message.appendChild(sender);
message.appendChild(text);
messages.appendChild(message);

input.value = "";
messages.scrollTop = messages.scrollHeight;
input.focus();

}


/* ===== TRIPWISE SIGN UP FUNCTION ===== */

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const age = Number(document.getElementById("signup-age").value);

        if (!name || !Number.isInteger(age) || age < 1 || age > 120) {
            alert("Please enter a valid name and age.");
            return;
        }

        const signupScreen = document.getElementById("signup-screen");

        signupScreen.style.display = "none";

        alert("Welcome to TripWise, " + name + "!");
    });
}
