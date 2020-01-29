$(document).ready(function() {
    var beginCard = "<div class=\"card col-sm-6 col-lg-4\">";
    var beginCardBody = "<div class=\"card-body\">";
    var endDiv = "</div>";

    var beginCapsule = "<dl class=\"row\">";
    var endCapsule = "</dl>";
    var beginTitle = "<dt class=\"col-lg-5\">";
    var endTitle = "</dt>";
    var beginContent = "<dd class=\"col-lg-7\">"
    var endContent = "</dd>"

    initDisplay();

    function initDisplay() {
        
        $("#lang").html(switchLang);
        $("#lang").click(function() {
            var url = window.location.pathname;
            window.location = url + "?l=" + switchLang;
        });
        selectContrainte();
        $("#generationNumber").val(3);
        $("#contrainteButton").html(param.constraint.show);
        $("#title").html(param.title);
        $("#generationNumberLabel").html(param.generationNumber.label);
        $("#generationToolLabel").html(param.generationTool.label);
        $('#generationTool').append(new Option(param.generationTool.option.writing.label, param.generationTool.option.writing.value));
        $('#generationTool').append(new Option(param.generationTool.option.persona.label, param.generationTool.option.persona.value));
        $("#resetContraintes").html(param.constraint.reset);
        $("footer .container").html(param.footer);
        $("#createList").html(param.generationTool.generate);
        $("#constraintP").html(getConstraintPersonaCard());
        $("#constraintW").html(getConstraintWritingCard());
    }

    function selectContrainte() {
        var generationTool = $("#generationTool").val();
        if(generationTool == param.generationTool.option.persona.value) {
            $("#constraintW").hide();
            $("#constraintP").show();
        } else {
            $("#constraintP").hide();
            $("#constraintW").show();
        }
    }

    $("#generationTool").change(function(){
        selectContrainte();
    });

    $('.collapse').on('hide.bs.collapse', function () {
        $("#contrainteButton").html(param.constraint.show);
    });

    $('.collapse').on('show.bs.collapse', function () {
        $("#contrainteButton").html(param.constraint.hide);
    });

    $("#resetContraintes").click(function(){
        $("#constraintP :input").val("");
        $("#constraintW :input").val("");
    });

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
        $("#Persona .card:nth-child(2n)").each(function() {
            $(this).addClass("bg-dark text-white");
        });
        $("#Writing .card:nth-child(2n)").each(function() {
            $(this).addClass("bg-dark text-white");
        });
    });

    /******************************************************/
    /*******************CONSTRAINT CARDS*******************/
    /******************************************************/

    function getConstraintWritingCard() {
        return beginCapsule + 
        encapsulate(param.writing.theme, getInputTextWithId("c_theme")) +
        encapsulate(param.writing.style, getInputTextWithId("c_style")) +
        endCapsule;
    }

    function getConstraintPersonaCard() {
        return beginCapsule + 
        encapsulate(param.persona.name, getInputTextWithId("c_name")) +
        encapsulate(param.persona.age, getInputNumberWithId("c_age")) +
        encapsulate(param.persona.job, getInputTextWithId("c_job")) +
        encapsulate(param.persona.role, getInputTextWithId("c_role")) +
        encapsulate(param.persona.title, getInputTextWithId("c_title")) +
        encapsulateConstraintPhysical() +
        encapsulateConstraintTraits() +
        endCapsule;
    }
    
    function encapsulateConstraintPhysical() {
        return encapsulate(param.persona.physical.string, "") +
        beginCapsule +
        encapsulate(param.persona.physical.gender.string, getInputTextWithId("c_gender")) +
        encapsulate(param.persona.physical.height, getInputNumberWithId("c_height")) +
        encapsulate(param.persona.physical.weight, getInputNumberWithId("c_weight")) +
        encapsulate(param.persona.physical.hair_color, getInputTextWithId("c_hair_color")) +
        encapsulate(param.persona.physical.hair_style, getInputTextWithId("c_hair_style")) +
        encapsulate(param.persona.physical.eyes_color, getInputTextWithId("c_eyes_color")) +
        encapsulate(param.persona.physical.face_shape, getInputTextWithId("c_face_shape")) +
        encapsulate(param.persona.physical.morphology, getInputTextWithId("c_morphology")) +
        endCapsule;
    }
    
    function encapsulateConstraintTraits() {
        return encapsulate(param.persona.traits.string, "") +
        beginCapsule +
        encapsulate(param.persona.traits.good_traits, getTextareaWithId("c_good_traits")) +
        encapsulate(param.persona.traits.bad_traits, getTextareaWithId("c_bad_traits")) +
        encapsulate(param.persona.traits.caracteristics, getTextareaWithId("c_caracteristics")) +
        encapsulate(param.persona.traits.handicap, getTextareaWithId("c_handicap")) +
        endCapsule;
    }

    function getInputTextWithId(id) {
        return "<input type=\"text\" id=\"" + id + "\">";
    }

    function getInputNumberWithId(id) {
        return "<input type=\"number\" id=\"" + id + "\">";
    }

    function getTextareaWithId(id) {
        return "<textarea id=\"" + id + "\" placeholder=\"a, b, c\"></textarea>";
    }

    /*******************************************************/
    /**********************ENCAPSULATE**********************/
    /*******************************************************/

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
            encapsulate(param.writing.theme, writing.theme) +
            encapsulate(param.writing.style, writing.style) +
            endCapsule + endDiv + endDiv;
    }

    function getRandomTheme() {
        var c_value = $("#c_theme").val();
        if(c_value != "") {
            return c_value;
        }
        return getRandomValueInArray(themes);
    }

    function getRandomStyle() {
        var c_value = $("#c_style").val();
        if(c_value != "") {
            return c_value;
        }
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
            encapsulate(param.persona.name, persona.name) +
            encapsulate(param.persona.age, persona.age) +
            encapsulate(param.persona.job, persona.job) +
            encapsulate(param.persona.role, persona.role) +
            encapsulate(param.persona.title, persona.title) +
            encapsulatePhysical(persona.physical) +
            encapsulateTraits(persona.traits) +
            endCapsule + endDiv + endDiv;
    }

    function getRandomAge() {
        var c_value = $("#c_age").val();
        if(c_value != "") {
            return c_value;
        }
        return Math.floor(Math.random()*100);
    }

    function getRandomName(gender) {
        var c_value = $("#c_name").val();
        if(c_value != "") {
            return c_value;
        }
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
        var c_value = $("#c_hair_color").val();
        if(c_value != "") {
            return c_value;
        }
        return getRandomValueInArray(hair_colors);
    }

    function getRandomHairStyle() {
        var c_value = $("#c_hair_style").val();
        if(c_value != "") {
            return c_value;
        }
        return getRandomValueInArray(hair_styles);
    }

    function getRandomEyesColor() {
        var c_value = $("#c_eyes_color").val();
        if(c_value != "") {
            return c_value;
        }
        return getRandomValueInArray(eyes_colors);
    }

    function getRandomFaceShape() {
        var c_value = $("#c_face_shape").val();
        if(c_value != "") {
            return c_value;
        }
        return getRandomValueInArray(face_shapes);
    }

    function getRandomGender() {
        return getRandomIntoInterval(0,1);
    }

    function getRandomHeight(age, gender) {
        var c_value = $("#c_height").val();
        if(c_value != "") {
            return c_value;
        }
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
        var c_value = $("#c_weight").val();
        if(c_value != "") {
            return c_value;
        }
        var minWeight = height * height * 1.5;
        var maxWeight = height * height * 3.1;
        return getRandomIntoInterval(minWeight, maxWeight);
    }

    function getRandomMorphology(weight, height) {
        var c_value = $("#c_morphology").val();
        if(c_value != "") {
            return c_value;
        }
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
        var c_value = $("#c_role").val();
        if(c_value != "") {
            return c_value;
        }
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
        var c_value = $("#c_job").val();
        if(c_value != "") {
            return c_value;
        }
        var job = param.none;
        if (age > 18) {
			job = getRandomValueInArray(jobs);
		}
        return job;
    }

    function getRandomTraits() {
        var n_good_traits = getRandomIntoInterval(1, 3);
		var n_bad_traits = getRandomIntoInterval(0, 2);
		var n_handicap = getRandomIntoInterval(0, getRandomIntoInterval(0, getRandomIntoInterval(0, 3)));
        var n_caracteristics = getRandomIntoInterval(1, 5);
        
        var traits = {};
        
        var c_value = $("#c_good_traits").val();
        traits.good_traits = getTraitIfNotEmpty(c_value, n_good_traits, good_traits);
        
        c_value = $("#c_bad_traits").val();
        traits.bad_traits = getTraitIfNotEmpty(c_value, n_bad_traits, bad_traits);
        
        c_value = $("#c_handicap").val();
        traits.handicap = getTraitIfNotEmpty(c_value, n_handicap, handicap);
        
        c_value = $("#c_caracteristics").val();
        traits.caracteristics = getTraitIfNotEmpty(c_value, n_caracteristics, caracteristics);

        return traits;
    }

    function getTraitIfNotEmpty(c_value, n_value, values) {
        if(c_value != "") {
            return stringToJsonArray(c_value);
        } else if (n_value > 0) {
            return addTraits(n_value, values);
        }
    }

    function stringToJsonArray(string) {
        return JSON.parse("[\"" + string.replace(/,/g, "\", \"") + "\"]")
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
        var c_value = $("#c_title").val();
        if(c_value != "") {
            return c_value;
        }
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
        var maleStr = param.persona.physical.gender.male;
        var femaleStr = param.persona.physical.gender.female;
        return encapsulate(param.persona.physical.string, "") +
        beginCapsule +
        encapsulate(param.persona.physical.gender.string, physical.gender == 1 ? maleStr : femaleStr) +
        encapsulate(param.persona.physical.height, physical.height/100 + "m") +
        encapsulate(param.persona.physical.weight, (physical.weight/1000).toFixed(1) + "kg") +
        encapsulate(param.persona.physical.hair_color, physical.hair_color) +
        encapsulate(param.persona.physical.hair_style, physical.hair_style) +
        encapsulate(param.persona.physical.eyes_color, physical.eyes_color) +
        encapsulate(param.persona.physical.face_shape, physical.face_shape) +
        encapsulate(param.persona.physical.morphology, physical.morphology) +
        endCapsule;
    }
    
    function encapsulateTraits(traits) {
        return encapsulate(param.persona.traits.string, "") +
        beginCapsule +
        encapsulate(param.persona.traits.good_traits, stringifyArray(traits.good_traits)) +
        encapsulate(param.persona.traits.bad_traits, stringifyArray(traits.bad_traits)) +
        encapsulate(param.persona.traits.caracteristics, stringifyArray(traits.caracteristics)) +
        encapsulate(param.persona.traits.handicap, stringifyArray(traits.handicap)) +
        endCapsule;
    }

    function stringifyArray(array) {
        if(array == undefined) {
            return param.none;
        }
        return array.toString().replace(/,/g, ",</br>");
    }
});