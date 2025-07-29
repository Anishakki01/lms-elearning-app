// 🔄 Page Loader + Fade-in Transition
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";

  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");

  // Auto call dashboard logic
  if (window.location.pathname.includes("dashboard.html")) {
    showEnrolledCourses();
  }
});

// ✅ Enroll Button Logic (used in course-detail.html)
function enrollCourse(courseName) {
  let courses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  if (!courses.includes(courseName)) {
    courses.push(courseName);
    localStorage.setItem("enrolledCourses", JSON.stringify(courses));
    alert("Enrolled in " + courseName);
  } else {
    alert("You are already enrolled in " + courseName);
  }
}

// 📈 Show Enrolled Courses with Progress (on dashboard.html)
function showEnrolledCourses() {
  const container = document.getElementById("enrolledCourses");

  // Safety check
  if (!container) {
    console.error("Container not found: #enrolledCourses");
    return;
  }

  const courses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
  const progress = JSON.parse(localStorage.getItem("progress")) || {};

  if (courses.length === 0) {
    container.innerHTML = "<p class='text-gray-600'>No courses enrolled yet.</p>";
    return;
  }

  courses.forEach(course => {
    let totalChapters = 0;
    let completed = 0;

    // Example: for HTML Mastery course
    if (course === "HTML Mastery") {
      const chapterIds = ["html-1", "html-2", "html-3"];
      totalChapters = chapterIds.length;

      chapterIds.forEach(id => {
        if (progress[id]) completed++;
      });
    }

    const percent = totalChapters > 0
      ? Math.floor((completed / totalChapters) * 100)
      : 0;

    const card = `
      <div class="bg-white rounded shadow p-4">
        <h3 class="font-bold text-lg mb-2">${course}</h3>
        <div class="w-full bg-gray-200 rounded-full h-4">
          <div class="bg-blue-600 h-4 rounded-full" style="width: ${percent}%"></div>
        </div>
        <p class="text-sm text-gray-500 mt-1">${percent}% completed</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

// 🌙 Dark Mode Toggle
function applyTheme(theme) {
  const body = document.getElementById("body");

  if (theme === "dark") {
    body.classList.add("bg-gray-900", "text-white");
    body.classList.remove("bg-gray-100", "text-gray-800");
    localStorage.setItem("theme", "dark");
    document.getElementById("toggleTheme").innerText = "☀️ Light Mode";
  } else {
    body.classList.remove("bg-gray-900", "text-white");
    body.classList.add("bg-gray-100", "text-gray-800");
    localStorage.setItem("theme", "light");
    document.getElementById("toggleTheme").innerText = "🌙 Dark Mode";
  }
}

// 🔄 Load saved theme on page load
window.addEventListener("load", () => {
  // ... existing loader + dashboard logic

  // Theme Logic
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  const toggleBtn = document.getElementById("toggleTheme");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      applyTheme(currentTheme === "light" ? "dark" : "light");
    });
  }
});
