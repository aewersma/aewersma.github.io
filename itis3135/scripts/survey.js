const form = document.getElementById("introductionForm");
const coursesContainer = document.getElementById("courses-container");
const addCourseButton = document.getElementById("course-btn");

const prefilledCourses = [
  { 
    code: "ITIS 3688", 
    name: "Computers and Their Impact on Society", 
    reason: "A study of current topics (software piracy, hacking, professional conduct) in computer science and the impact of computers on various subsets (home, government, and education) of society. Other courses I was aiming for filled up and I needed to complete this one anyways."
  },
  { 
    code: "FREN 1201", 
    name: "Elementary French", 
    reason: "For students with limited or no previous experience in French. First course in a two-course sequence to develop competence in culture, speaking and writing, listening and reading comprehension in French. I self-taught starting in 2019, looking to improve my grammar and fluency."
  },
  { 
    code: "STAT 2122", 
    name: "Introduction to Probability and Statistics", 
    reason: "A study of probability models, discrete and continuous random variables, inference about Bernoulli probability, inference about population mean, inference about population variance, the maximum likelihood principle, the minimax principle, Bayes procedures, and linear models. Required course for my major."
  },
  { 
    code: "POLS 3380", 
    name: "Security and Intelligence in a Democratic Society", 
    reason: "Examines roles, missions, and methods of the U.S. intelligence community. Topics include: collection, analysis, politicization of intelligence, sharing intelligence, interactions between the intelligence community and elected officials, covert action, and ethical issues. Core class for my new major, Security and Intelligence Studies."
  },
  { 
    code: "ITIS 3135", 
    name: "Web-Based Application Design and Development", 
    reason: "Design and programming concepts for developing interactive web based applications: HTML, CSS, the Document Object Model (DOM), event-driven programming, client side scripting, and web security considerations. Core class for ITIS, also have some experience with creating simple websites in middle and high school."
  }
];

document.getElementById("image").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const previewImage = document.getElementById("previewImage");
  if (file) {
    previewImage.src = URL.createObjectURL(file);
  } else {
    previewImage.src = "images/Image002.png";
  }
});

function addCourse(course = { code: "", name: "", reason: "" }) {
  const li = document.createElement("li");

  const codeAndNameDiv = document.createElement("div");
  codeAndNameDiv.style.display = "flex";
  codeAndNameDiv.style.gap = "2%";
  codeAndNameDiv.style.marginBottom = "5px";
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const courseCodeId = `courseCode-${uniqueId}`;
  const courseCodeLabel = document.createElement("label");
  courseCodeLabel.setAttribute("for", courseCodeId);
  courseCodeLabel.textContent = "Course Code";
  courseCodeLabel.classList.add("hidden-label");
  
  const courseCodeInput = document.createElement("input");
  courseCodeInput.type = "text";
  courseCodeInput.name = "courseCode[]";
  courseCodeInput.id = courseCodeId;
  courseCodeInput.placeholder = "Course Code";
  courseCodeInput.required = true;
  courseCodeInput.classList.add("course-code-input");
  courseCodeInput.value = course.code || "";
  codeAndNameDiv.appendChild(courseCodeLabel);
  codeAndNameDiv.appendChild(courseCodeInput);

  const courseNameId = `courseName-${uniqueId}`;
  const courseNameLabel = document.createElement("label");
  courseNameLabel.setAttribute("for", courseNameId);
  courseNameLabel.textContent = "Course Name";
  courseNameLabel.classList.add("hidden-label");
  
  const courseNameInput = document.createElement("input");
  courseNameInput.type = "text";
  courseNameInput.name = "courseName[]";
  courseNameInput.id = courseNameId;
  courseNameInput.placeholder = "Course Name";
  courseNameInput.required = true;
  courseNameInput.classList.add("course-name-input");
  courseNameInput.value = course.name || "";
  codeAndNameDiv.appendChild(courseNameLabel);
  codeAndNameDiv.appendChild(courseNameInput);

  const courseReasonDiv = document.createElement("div");
  const courseReasonId = `courseReason-${uniqueId}`;
  const courseReasonLabel = document.createElement("label");
  courseReasonLabel.setAttribute("for", courseReasonId);
  courseReasonLabel.textContent = "Reason for Taking the Course";
  courseReasonLabel.classList.add("hidden-label");
  
  const courseReasonInput = document.createElement("textarea");
  courseReasonInput.name = "courseReason[]";
  courseReasonInput.id = courseReasonId;
  courseReasonInput.placeholder = "Reason for taking the course";
  courseReasonInput.required = true;
  courseReasonInput.classList.add("course-reason-input");
  courseReasonInput.value = course.reason || "";
  courseReasonDiv.appendChild(courseReasonLabel);
  courseReasonDiv.appendChild(courseReasonInput);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-course");
  deleteBtn.innerText = "Delete Course";
  deleteBtn.addEventListener("click", function () {
    coursesContainer.removeChild(li);
  });

  li.appendChild(codeAndNameDiv);
  li.appendChild(courseReasonDiv);
  li.appendChild(deleteBtn);
  coursesContainer.appendChild(li);
}

document.addEventListener("DOMContentLoaded", function () {
  prefilledCourses.forEach(addCourse);
});

function resetFormProgress() {
  while (coursesContainer.firstChild) {
    coursesContainer.removeChild(coursesContainer.firstChild);
  }
  prefilledCourses.forEach(addCourse);
  
  const previewImage = document.getElementById("previewImage");
  previewImage.src = "images/Image002.png";
}

form.addEventListener("reset", function () {
  setTimeout(resetFormProgress, 0);
});

function handleSubmit(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const instructions = document.querySelector("h3");
  if (instructions) {
    instructions.remove();
  }

  const formData = new FormData(form);
  const firstName = formData.get("firstName");
  const middleInitial = formData.get("middleInitial") ? formData.get("middleInitial").trim() : "";
  const nickname = formData.get("nickname") ? formData.get("nickname").trim() : "";
  const lastName = formData.get("lastName");
  const mascot = formData.get("mascot");

  let resultHTML = `<h3>${firstName}`;
  if (middleInitial) {
    resultHTML += ` ${middleInitial}.`;
  }
  if (nickname) {
    resultHTML += ` "${nickname}"`;
  }
  resultHTML += ` ${lastName}'s ${mascot}</h3>`;

  const image = document.getElementById("image").files[0];
  const imageUrl = image ? URL.createObjectURL(image) : "images/Image002.png";
  const imageAlt = formData.get("imageAlt");

  resultHTML += `<figure>
    <img src="${imageUrl}" alt="${imageAlt}" class="image-preview">
    <figcaption><em>${formData.get("imageCaption")}</em></figcaption>
  </figure>`;

  resultHTML += `<ul>`;
  resultHTML += `<li><strong>Personal background:</strong> ${formData.get("personalBackground")}</li>`;
  resultHTML += `<li><strong>Professional Background:</strong> ${formData.get("professionalBackground")}</li>`;
  resultHTML += `<li><strong>Academic background:</strong> ${formData.get("academicBackground")}</li>`;
  resultHTML += `<li><strong>Background in this subject:</strong> ${formData.get("subjectBackground")}</li>`;
  resultHTML += `<li><strong>Primary Computer Platform:</strong> ${formData.get("primaryPlatform")}</li>`;

  const courseCodes = formData.getAll("courseCode[]");
  const courseNames = formData.getAll("courseName[]");
  const courseReasons = formData.getAll("courseReason[]");
  if (courseCodes.length > 0) {
    resultHTML += `<li><strong>Courses I'm Taking & Why:</strong>
      <ul>`;
    for (let i = 0; i < courseCodes.length; i++) {
      const code = courseCodes[i];
      const name = courseNames[i];
      const reason = courseReasons[i];
      resultHTML += `<li><strong>${code}: ${name} - </strong> ${reason}</li>`;
    }
    resultHTML += `</ul></li>`;
  } else {
    resultHTML += `<li><strong>Courses I'm Taking & Why:</strong> None</li>`;
  }
  
  const funnyThing = (formData.get("funnyThing") || "").trim();
  if (funnyThing) {
    resultHTML += `<li><strong>Funny/Interesting item about yourself:</strong> ${funnyThing}</li>`;
  }
  const anythingElse = (formData.get("anythingElse") || "").trim();
  if (anythingElse) {
    resultHTML += `<li><strong>I'd also like to share:</strong> ${anythingElse}</li>`;
  }
  resultHTML += `</ul>`;

  resultHTML += `<p><a href="#" id="resetLink" class="buttons">Reset</a></p>`;

  const resultSection = document.getElementById("resultSection");
  resultSection.innerHTML = resultHTML;
  resultSection.style.display = "block";
  form.style.display = "none";

  document.getElementById("resetLink").addEventListener("click", function (e) {
    e.preventDefault();
    form.reset();
    resetFormProgress();
    resultSection.style.display = "none";
    form.style.display = "block";
  });
}

if (form) {
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("reset", resetFormProgress);
}

if (addCourseButton) {
  addCourseButton.addEventListener("click", addCourse);
}
