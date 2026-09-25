
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

    /* Check travel selection */

    if (selectedTransport === "") {

        const result =
            document.getElementById("travel-stay-result");

        result.innerHTML =
            "✈️ Please choose your preferred travel option.";

        return;
    }


    /* Check hotel selection */

    if (selectedHotel === "") {

        const result =
            document.getElementById("travel-stay-result");

        result.innerHTML =
            "🏨 Please choose your preferred hotel type.";

        return;
    }


    /* Build main TripWise plan */

    generateTrip();


    /* Get destination */

    const destination =
        document.getElementById("destination").value.trim();


    /* Show recommendations */

    showTripwiseRecommendations(destination);

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
    }

};


function getRandomRecommendation(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function showTripwiseRecommendations(destination) {

    const section = document.getElementById("recommendations");

    if (!section) return;

    const data = tripwiseRecommendations[destination];

    if (!data) {
        section.style.display = "none";
        return;
    }

    const budget = (selectedBudget || "medium").toLowerCase();

    const budgetData = data[budget] || data.medium;

    const hotel1 = getRandomRecommendation(budgetData.hotels);

    let hotel2 = getRandomRecommendation(budgetData.hotels);

    while (hotel2 === hotel1 && budgetData.hotels.length > 1) {
        hotel2 = getRandomRecommendation(budgetData.hotels);
    }

    let travel = getRandomRecommendation(budgetData.travel);

    let interestText = "";

    if (selectedInterests.length > 0) {

        const interest =
            selectedInterests[
                Math.floor(Math.random() * selectedInterests.length)
            ];

        if (
            budgetData.interests &&
            budgetData.interests[interest]
        ) {
            travel = getRandomRecommendation(
                budgetData.interests[interest]
            );

            interestText =
                `Matched with your interest in ${interest}.`;
        }
    }

    section.style.display = "block";

    section.innerHTML = `
        <div class="recommendations-heading">

            <span>TRIPWISE PICKS</span>

            <h2>
                Places we recommend for ${destination}.
            </h2>

            <p>
                TripWise selected these options based on your
                destination, budget and interests.
            </p>

        </div>

        <div class="recommendation-grid">

            <div class="recommendation-card">

                <div class="recommendation-image">
                    🏨
                </div>

                <div class="recommendation-content">

                    <span class="recommendation-type">
                        HOTEL
                    </span>

                    <h3>${hotel1}</h3>

                    <p>
                        A ${budget} budget stay selected
                        by TripWise for your trip.
                    </p>

                    <div class="recommendation-tags">
                        <span>TripWise Pick</span>
                        <span>${budget} Budget</span>
                    </div>

                </div>

            </div>


            <div class="recommendation-card">

                <div class="recommendation-image">
                    🏨
                </div>

                <div class="recommendation-content">

                    <span class="recommendation-type">
                        HOTEL
                    </span>

                    <h3>${hotel2}</h3>

                    <p>
                        Another accommodation option
                        recommended for your journey.
                    </p>

                    <div class="recommendation-tags">
                        <span>Recommended</span>
                        <span>Stay</span>
                    </div>

                </div>

            </div>


            <div class="recommendation-card">

                <div class="recommendation-image">
                    🚌
                </div>

                <div class="recommendation-content">

                    <span class="recommendation-type">
                        TRAVEL SERVICE
                    </span>

                    <h3>${travel}</h3>

                    <p>
                        A travel service selected by TripWise
                        for your destination.
                    </p>

                    <div class="recommendation-tags">
                        <span>TripWise Pick</span>
                        <span>Travel</span>
                    </div>

                </div>

            </div>

        </div>

        ${
            interestText
                ? `<p style="text-align:center; margin-top:20px; color:#087f8c;">
                    ✨ ${interestText}
                   </p>`
                : ""
        }
    `;

    section.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
function getRandomRecommendation(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function showTripwiseRecommendations(destination) {

    const section = document.getElementById("recommendations");

    if (!section) return;

    const data = tripwiseRecommendations[destination];

    if (!data) {
        section.style.display = "none";
        return;
    }
    const budget = (selectedBudget || "medium").toLowerCase();

    const budgetData = data[budget] || data.medium;  

    const hotel1 = getRandomRecommendation(budgetData.hotels);

    let hotel2 = getRandomRecommendation(budgetData.hotels);

    while (hotel2 === hotel1 && budgetData.hotels.length > 1) {
        hotel2 = getRandomRecommendation(budgetData.hotels);
    }

    const travel = getRandomRecommendation(budgetData.travel);

    section.style.display = "block";

    section.innerHTML = `
        <div class="recommendations-heading">
            <span>TRIPWISE PICKS</span>
            <h2>Places we recommend for ${destination}.</h2>
            <p>
                TripWise selected these options based on your destination
                and trip preferences.
            </p>
        </div>

        <div class="recommendation-grid">

            <div class="recommendation-card">
                <div class="recommendation-image">🏨</div>

                <div class="recommendation-content">
                    <span class="recommendation-type">HOTEL</span>
                    <h3>${hotel1}</h3>
                    <p>
                        A stay option selected by TripWise
                        for your destination.
                    </p>

                    <div class="recommendation-tags">
                        <span>TripWise Pick</span>
                        <span>Stay</span>
                    </div>
                </div>
            </div>

            <div class="recommendation-card">
                <div class="recommendation-image">🏨</div>

                <div class="recommendation-content">
                    <span class="recommendation-type">HOTEL</span>
                    <h3>${hotel2}</h3>
                    <p>
                        Another accommodation option
                        recommended for your trip.
                    </p>

                    <div class="recommendation-tags">
                        <span>Recommended</span>
                        <span>Stay</span>
                    </div>
                </div>
            </div>

            <div class="recommendation-card">
                <div class="recommendation-image">🚌</div>

                <div class="recommendation-content">
                    <span class="recommendation-type">TRAVEL SERVICE</span>
                    <h3>${travel}</h3>
                    <p>
                        A travel service option suggested
                        by TripWise for your journey.
                    </p>

                    <div class="recommendation-tags">
                        <span>TripWise Pick</span>
                        <span>Travel</span>
                    </div>
                </div>
            </div>

        </div>
    `;

    section.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}