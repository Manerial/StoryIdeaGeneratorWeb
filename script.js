$(document).ready(function() {
    $("#generationNumber").val(3);

    $("#createList").click(function(){
        var generationNumber = $("#generationNumber").val();
        var generationTool = $("#generationTool").val();
        var writing = $('#Writing');
        var persona = $('#Persona');
        persona.empty();
        writing.empty();
        if(generationTool == "p") {
            writing.hide();
            for(var number = 1; number <= generationNumber; number++) {
                persona.append(getRandomPersonaCard());
            }
            persona.show();
        } else {
            persona.hide();
            for(var number = 1; number <= generationNumber; number++) {
                writing.append(getRandomWritingCard());
            }
            writing.show();
        }
        $(".card:nth-child(2n)").each(function() {
            $(this).addClass("bg-dark text-white");
        });
    });

    var beginCard = "<div class=\"card col-sm-6 col-lg-4\">";
    var beginCardBody = "<div class=\"card-body\">";
    var endDiv = "</div>";

    var beginCapsule = "<dl class=\"row\">";
    var endCapsule = "</dl>";
    var beginTitle = "<dt class=\"col-lg-5\">";
    var endTitle = "</dt>";
    var beginContent = "<dd class=\"col-lg-7\">"
    var endContent = "</dd>"

    function encapsulate(title, value) {
        var eTitle = beginTitle + title + endTitle;
        var eValue = beginContent + value + endContent;
        return eTitle + eValue;
    }

    function getRandomWritingCard() {
        var writing = {};
        writing.theme = getRandomTheme();
        writing.style = getRandomStyle();
        return beginCard + beginCardBody + beginCapsule + 
            encapsulate("Theme:", writing.theme) +
            encapsulate("Style:", writing.style) +
            endCapsule + endDiv + endDiv;
    }

    function getRandomTheme() {
        return getRandomValueInArray(themes);
    }

    function getRandomStyle() {
        return getRandomValueInArray(styles);
    }

    function getRandomPersonaCard() {
        var persona = {};
        persona.age = getRandomAge();
        persona.physical = getRandomPhysical(persona.age);
        persona.name = getRandomName(persona.physical.gender);
        persona.role = getRandomRole(persona.age);
        persona.job = getRandomJob(persona.age);
        persona.traits = getRandomTraits();
        persona.title = getRandomTitle();
        return beginCard + beginCardBody + beginCapsule + 
            encapsulate("Nom:", persona.name) +
            encapsulate("Age:", persona.age) +
            encapsulate("Job:", persona.job) +
            encapsulate("Role:", persona.role) +
            encapsulatePhysical(persona.physical) +
            encapsulateTraits(persona.traits) +
            endCapsule + endDiv + endDiv;
    }

    function getRandomAge() {
        return Math.floor(Math.random()*100);
    }

    function getRandomName(gender) {
        var name = "";
        if (gender == 1) {
            name = getRandomValueInArray(boys);
        } else {
            name = getRandomValueInArray(girls);
        }
        return name;
    }

    function getRandomPhysical(age) {
        var physical = {};
        physical.hair_color = getRandomHairColor();
		physical.hair_style = getRandomHairStyle();
		physical.eyes_color = getRandomEyesColor();
		physical.face_shape = getRandomFaceShape();
		physical.gender = getRandomGender();
		physical.height = getRandomHeight(age, physical.gender);
		physical.weight = getRandomWeight(physical.height);
        physical.morphology = getRandomMorphology(physical.weight, physical.height);
        return physical;
    }

    function getRandomHairColor() {
        return getRandomValueInArray(hair_colors);
    }

    function getRandomHairStyle() {
        return getRandomValueInArray(hair_styles);
    }

    function getRandomEyesColor() {
        return getRandomValueInArray(eyes_colors);
    }

    function getRandomFaceShape() {
        return getRandomValueInArray(face_shapes);
    }

    function getRandomGender() {
        return Math.floor(Math.random());
    }

    function getRandomHeight(age, gender) {
        var height = 0;
        if (age < 18) {
            height = getRandomIntoInterval(40 + age*5, 100 + age*5);
        } else if (gender == 1) {
            height = getRandomIntoInterval(150, 230);
        } else {
            height = getRandomIntoInterval(130, 200);
        }
        return height;
    }

    function getRandomWeight(height) {
        var minWeight = height * height * 1.5;
        var maxWeight = height * height * 3.1;
        return getRandomIntoInterval(minWeight, maxWeight);
    }

    function getRandomMorphology(weight, height) {
        var BMI = getBMI(weight, height);
        var morphology = "";
        var debug = 0;
        do{
            morphology = getRandomKeyInJson(morphologies);
            debug++;
            if(debug > 1000) {
                debugger;
            }
        } while(!checkBMI(morphologies[morphology], BMI));
        return morphology;
        
    }

    function getRandomRole(age) {
        var role = "";
        do{
            role = getRandomKeyInJson(roles);
        } while(!checkAge(roles[role], age));
        return role;
    }

    function checkAge(ageRankStr, age) {
        if (ageRankStr.includes("+")) {
			var ageString = ageRankStr.split("+")[0];
			var ageRank = parseInt(ageString);
			return ageRank < age;
		} else if (ageRankStr.includes("-")) {
			var ageString = ageRankStr.split("-")[0];
			var ageRank = parseInt(ageString);
			return ageRank > age;
		} else {
            return ageRankStr == "ALL";
        }
    }

    function checkBMI(BMIRankStr, BMI) {
		var BMIString;
		var BMIMin = 0;
		var BMIMax = 100;
		if (BMIRankStr.includes("+")) {
			BMIString = BMIRankStr.split("+")[0];
			BMIMin = parseInt(BMIString);
		} else if (BMIRankStr.includes("-")) {
			BMIString = BMIRankStr.split("-")[0];
			BMIMax = parseInt(BMIString);
		} else if (BMIRankStr.includes("/")) {
			BMIString = BMIRankStr.split("/")[0];
			BMIMin = parseInt(BMIString);
			BMIString = BMIRankStr.split("/")[1];
			BMIMax = parseInt(BMIString);
		}
        return BMIMin <= BMI && BMI <= BMIMax;
    }

    function getRandomJob(age) {
        var job = "Aucun";
        if (age > 18) {
			job = getRandomValueInArray(jobs);
		}
        return job;
    }

    function getRandomTraits() {
        var n_good_traits = getRandomIntoInterval(1, 3);
		var n_bad_traits = getRandomIntoInterval(0, 2);
		var n_handicaps = getRandomIntoInterval(0, getRandomIntoInterval(0, getRandomIntoInterval(0, 3)));
        var n_caracteristics = getRandomIntoInterval(1, 5);
        
        var traits = {};
        if (n_good_traits > 0) traits.good_traits = addTraits(n_good_traits, good_traits);
        if (n_bad_traits > 0) traits.bad_traits = addTraits(n_bad_traits, bad_traits);
        if (n_handicaps > 0) traits.handicaps = addTraits(n_handicaps, handicaps);
        if (n_caracteristics > 0) traits.caracteristics = addTraits(n_caracteristics, caracteristics);

        return traits;
    }

    function addTraits(numberOfTraits, data) {
        var traits = [];
        for(var i = 0; i < numberOfTraits; i++) {
            var trait = "";
            do {
                trait = getRandomValueInArray(data);
            } while(traits.includes(trait));
            traits[i] = trait;
        }
        return traits;
    }

    function getRandomTitle() {
        return getRandomValueInArray(prefixes) + " " +
        getRandomValueInArray(suffixes) + " " +
        getRandomValueInArray(adjectives);
    }

    function getRandomValueInArray(array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    function getRandomKeyInJson(json) {
        return getRandomValueInArray(Object.keys(json));
    }

    function getRandomIntoInterval(min, max) {
        return Math.floor(Math.random()*(max - min + 1)) + min;
    }
    
	function getBMI(weight, height) {
		var weightKG = weight / 1000;
		var heightM = height / 100;
		var BMI = weightKG / (heightM * heightM);
		return BMI;
    }
    
    function encapsulatePhysical(physical) {
        return encapsulate("Physique:", "") +
        beginCapsule +
        encapsulate("Taille:", physical.height/100 + "m") +
        encapsulate("Poids:", (physical.weight/1000).toFixed(1) + "kg") +
        encapsulate("Couleur cheveux:", physical.hair_color) +
        encapsulate("Coiffure:", physical.hair_style) +
        encapsulate("Couleur yeux:", physical.eyes_color) +
        encapsulate("Visage:", physical.face_shape) +
        encapsulate("Morphologie:", physical.morphology) +
        endCapsule;
    }
    
    function encapsulateTraits(traits) {
        return encapsulate("Traits:", "") +
        beginCapsule +
        encapsulate("Bon:", stringifyArray(traits.good_traits)) +
        encapsulate("Mal:", stringifyArray(traits.bad_traits)) +
        encapsulate("Caractère:", stringifyArray(traits.caracteristics)) +
        encapsulate("Handicapes:", stringifyArray(traits.handicaps)) +
        endCapsule;
    }

    function stringifyArray(array) {
        if(array == undefined) {
            return "Aucun";
        }
        return array.toString().replace(/,/g, ",</br>");
    }
});