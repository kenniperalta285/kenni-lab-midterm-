function isValidStudentNumber(value) {
if (typeof value !== "string") {
return false;
}
var re = /^\d{2}-\d{4}-\d{3}$/;
return re.test(value.trim());
}

function isValidPassword(value) {
if (typeof value !== "string") {
return false;
}
var rules = [
value.length >= 8,
/[A-Z]/.test(value),
/[0-9]/.test(value),
/[@$!]/.test(value),
!/\s/.test(value)
];
for (var i = 0; i < rules.length; i++) {
if (rules[i] === false) {
return false;
}
}
return true;
}

function validEmail(value) {
return /^\S+@\S+\.\S+$/.test(value.trim());
}

function validMobile(value) {
var v = value.trim();
return /^09\d{9}$/.test(v) || /^\+639\d{9}$/.test(v);
}

if (typeof document !== "undefined") {

var $ = function (id) {
return document.getElementById(id);
};

var setMsg = function (field, errorBox, text) {
$(errorBox).textContent = text;
$(field).setAttribute("aria-invalid", text === "" ? "false" : "true");
return text === "";
};

var rules = {
name: function () {
var n = $("fullName").value.trim();
return n.length >= 2 ? setMsg("fullName", "fullNameError", "") : setMsg("fullName", "fullNameError", "Please type your full name (at least 2 letters).");
},
studentNo: function () {
return isValidStudentNumber($("studentNumber").value) ? setMsg("studentNumber", "studentNumberError", "") : setMsg("studentNumber", "studentNumberError", "Enter a student number in the format 24-1234-123.");
},
mail: function () {
return validEmail($("email").value) ? setMsg("email", "emailError", "") : setMsg("email", "emailError", "Please enter a valid email.");
},
mobile: function () {
return validMobile($("mobileNumber").value) ? setMsg("mobileNumber", "mobileNumberError", "") : setMsg("mobileNumber", "mobileNumberError", "Use 09xxxxxxxxx or +639xxxxxxxxx.");
},
pass: function () {
return isValidPassword($("password").value) ? setMsg("password", "passwordError", "") : setMsg("password", "passwordError", "Password needs 8+ chars, uppercase, a number and @ $ or !.");
},
confirm: function () {
var p = $("password").value;
var c = $("confirmPassword").value;
return (c !== "" && c === p) ? setMsg("confirmPassword", "confirmPasswordError", "") : setMsg("confirmPassword", "confirmPasswordError", "Passwords do not match.");
},
course: function () {
var val = $("course").value;
return (val === "BSIT" || val === "BSCS") ? setMsg("course", "courseError", "") : setMsg("course", "courseError", "Please pick a course.");
},
terms: function () {
return $("terms").checked ? setMsg("terms", "termsError", "") : setMsg("terms", "termsError", "You need to agree to the terms.");
}
};

window.addEventListener("load", function () {

var form = $("registrationForm");

form.addEventListener("submit", function (e) {
e.preventDefault();

var ok = true;
for (var key in rules) {
if (rules[key]() === false) {
ok = false;
}
}

if (ok) {
$("summaryName").textContent = $("fullName").value.trim();
$("summaryStudentNumber").textContent = $("studentNumber").value.trim();
$("summaryEmail").textContent = $("email").value.trim();
$("summaryMobileNumber").textContent = $("mobileNumber").value.trim();
$("summaryCourse").textContent = $("course").value;

$("registrationSummary").hidden = false;
$("successMessage").textContent = "Registration details validated successfully!";
}
});

$("password").addEventListener("input", function () {
var pw = $("password").value;
if (pw === "") {
$("passwordFeedback").textContent = "";
} else if (isValidPassword(pw)) {
$("passwordFeedback").textContent = "Strong password.";
} else {
$("passwordFeedback").textContent = "Needs 8+ chars, uppercase, number and @ $ or !.";
}
});

$("fullName").addEventListener("blur", rules.name);
$("course").addEventListener("change", rules.course);
$("terms").addEventListener("change", rules.terms);

$("studentNumber").addEventListener("input", function () {
if ($("studentNumberError").textContent !== "") rules.studentNo();
});
$("email").addEventListener("input", function () {
if ($("emailError").textContent !== "") rules.mail();
});
$("mobileNumber").addEventListener("input", function () {
if ($("mobileNumberError").textContent !== "") rules.mobile();
});
$("confirmPassword").addEventListener("input", function () {
if ($("confirmPasswordError").textContent !== "") rules.confirm();
});

form.addEventListener("reset", function () {
var errorBoxes = ["fullNameError", "studentNumberError", "emailError", "mobileNumberError", "passwordError", "confirmPasswordError", "courseError", "termsError"];
for (var i = 0; i < errorBoxes.length; i++) {
$(errorBoxes[i]).textContent = "";
}

var allFields = ["fullName", "studentNumber", "email", "mobileNumber", "password", "confirmPassword", "course", "terms"];
for (var j = 0; j < allFields.length; j++) {
$(allFields[j]).setAttribute("aria-invalid", "false");
}

var summaryBoxes = ["summaryName", "summaryStudentNumber", "summaryEmail", "summaryMobileNumber", "summaryCourse"];
for (var k = 0; k < summaryBoxes.length; k++) {
$(summaryBoxes[k]).textContent = "";
}

$("passwordFeedback").textContent = "";
$("successMessage").textContent = "";
$("registrationSummary").hidden = true;
});

});

}

if (typeof module !== "undefined" && module.exports) {
module.exports = { isValidStudentNumber: isValidStudentNumber, isValidPassword: isValidPassword };
}
