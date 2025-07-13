// script.js

function calculateChada() {
  const profession = document.getElementById("profession").value;
  const salaryInput = document.getElementById("salary");
  const salary = Number(salaryInput.value);

  const errorMessage = document.getElementById("error-message");
  const resultContainer = document.getElementById("result-container");
  errorMessage.classList.add("hidden");
  resultContainer.classList.add("hidden");

  if (profession === "default" || !salary || salary <= 0) {
    errorMessage.textContent = "অনুগ্রহ করে সঠিক পেশা এবং মাসিক আয় লিখুন।";
    errorMessage.classList.remove("hidden");
    return;
  }

  // Define contribution % by profession (fictional for satire)
  const contributionPercentages = {
    doctor: 10,
    engineer: 8,
    teacher: 7,
    govt_job: 12,
    nongovt_job: 15,
    businessman: 20,
    freelancer: 6,
    rickshaw_puller: 3,
    day_laborer: 2,
    unemployed: 0,
    expatriate_worker: 25,
    genz: 5,
    retired_awami: 50,
    other: 7,
  };

  // Get contribution %
  let contribution = contributionPercentages[profession] ?? 7;

  // Special overrides
  if (profession === "retired_awami") {
    showRetiredAwamiMessage();
    return;
  }

  // Calculate
  const chadaAmount = (salary * contribution) / 100;
  const remainingSalary = salary - chadaAmount;

  // Prepare icons (using emoji)
  const survivalIcon = remainingSalary >= 0
    ? "💵"
    : "😭";

  const leaderMoodIcon = chadaAmount > 0 ? "😈" : "😐";

  const contributionIcon = contribution > 15 ? "🏦" : "💰";

  // Update DOM
  document.getElementById("survival-icon").textContent = survivalIcon;
  document.getElementById("remaining-salary").textContent =
    `${remainingSalary.toFixed(2)} টাকা`;

  document.getElementById("survival-text").textContent =
    remainingSalary >= 0
      ? "এখনো বাঁচার আশা আছে!"
      : "বাঁচা দুঃসাধ্য, পকেট ফাঁকা!";

  document.getElementById("leader-mood-icon").textContent = leaderMoodIcon;
  document.getElementById("leader-mood-text").textContent =
    chadaAmount > 0
      ? "হাই কমান্ড খুশি"
      : "হাই কমান্ড হতাশ";

  document.getElementById("contribution-icon").textContent = contributionIcon;
  document.getElementById("contribution-text").textContent =
    `আপনি পরিশোধ করবেন ${chadaAmount.toFixed(2)} টাকা (${contribution}%)`;

  // Humor text
  const humorPhrases = [
    "রাজনীতি মানে পকেট ফাঁকা, কিন্তু মন খোলা!",
    "চাঁদা দিলেই নেতা হাসে, না দিলে বঞ্চনা!",
    "যত চাঁদা, তত ভালোবাসা!",
    "চাঁদা দিয়ে যুদ্ধে নয়, ব্যালকনিতে রাজনীতি!",
  ];
  const humorText =
    humorPhrases[Math.floor(Math.random() * humorPhrases.length)];
  document.getElementById("humor-text").textContent = humorText;

  // Detailed results
  const details = `
    <p>আপনার পেশা: <strong>${profession.replace(/_/g, " ")}</strong></p>
    <p>মাসিক আয়: <strong>${salary.toFixed(2)} টাকা</strong></p>
    <p>মাসিক চাঁদা: <strong>${chadaAmount.toFixed(2)} টাকা (${contribution}%)</strong></p>
    <p>মাসিক হাতে থাকবে: <strong>${remainingSalary.toFixed(2)} টাকা</strong></p>
  `;
  document.getElementById("result-details").innerHTML = details;

  // Show result container
  resultContainer.classList.remove("hidden");

  // Render chart
  renderChart(chadaAmount, remainingSalary);
}

let chartInstance = null;

function renderChart(chadaAmount, remainingSalary) {
  const ctx = document.getElementById("chadaChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["চাঁদা (ব্যয়)", "হাতে থাকবে"],
      datasets: [
        {
          data: [chadaAmount, remainingSalary < 0 ? 0 : remainingSalary],
          backgroundColor: ["#ef4444", "#3b82f6"],
          hoverOffset: 20,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              family: "'Noto Sans Bengali', sans-serif",
              size: 16,
              weight: "bold",
            },
            color: "#1e40af",
          },
          position: "bottom",
        },
      },
    },
  });
}

function showRetiredAwamiMessage() {
  const errorMessage = document.getElementById("error-message");
  const resultContainer = document.getElementById("result-container");

  resultContainer.classList.add("hidden");
  errorMessage.innerHTML = `
    <div class="text-center p-6 bg-green-50 border-2 border-green-300 rounded-lg">
      <h2 class="text-2xl font-bold text-green-700 mb-4">🏛️ অবসরপ্রাপ্ত নেতার জন্য বিশেষ বার্তা! 🏛️</h2>
      <p class="text-green-700 mb-2">
        আপনি তো আমাদের পুরানো সহযোদ্ধা! ৫০% ছাড়ে চাঁদা, ১৫ বছরের কিস্তিতে পরিশোধ, পার্টি অফিসে বিনামূল্যে চা!
      </p>
      <p class="italic text-green-600">"রাজনীতিতে অবসর নেই, শুধু দায়িত্ব বদলায়!"</p>
    </div>
  `;
  errorMessage.classList.remove("hidden");
}
