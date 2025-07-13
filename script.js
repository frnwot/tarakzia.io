// Profession multipliers and text mappings
const professionData = {
  doctor: { multiplier: 0.2, mood: '😠 অত্যন্ত রাগী', contribution: 'উৎসর্গী ডোনার', icon: '💉' },
  engineer: { multiplier: 0.15, mood: '😐 মাঝারি', contribution: 'প্রকৌশলী', icon: '🛠️' },
  teacher: { multiplier: 0.12, mood: '😊 আনন্দিত', contribution: 'শিক্ষকের অবদান', icon: '📚' },
  govt_job: { multiplier: 0.18, mood: '😕 একটু চিন্তিত', contribution: 'সরকারী সহকর্মী', icon: '🏢' },
  nongovt_job: { multiplier: 0.17, mood: '😐', contribution: 'বেসরকারি কর্মী', icon: '💼' },
  businessman: { multiplier: 0.25, mood: '😎 খুশি', contribution: 'ব্যবসায়ী', icon: '💰' },
  freelancer: { multiplier: 0.13, mood: '😌 শান্ত', contribution: 'ফ্রিল্যান্সার', icon: '🖥️' },
  rickshaw_puller: { multiplier: 0.1, mood: '😓 ক্লান্ত', contribution: 'রিকশাওয়ালা', icon: '🚲' },
  day_laborer: { multiplier: 0.08, mood: '😩 পরিশ্রমী', contribution: 'দিনমজুর', icon: '🔨' },
  unemployed: { multiplier: 0.05, mood: '😭 হতাশ', contribution: 'বেকার', icon: '🛌' },
  expatriate_worker: { multiplier: 0.3, mood: '😤 পরিশ্রমী প্রবাসী', contribution: 'প্রবাসী শ্রমিক', icon: '✈️' },
  genz: { multiplier: 0.01, mood: '🤡 ক্রিঞ্জ', contribution: 'Gen-Z', icon: '🧢' },
  retired_awami: { multiplier: 0.05, mood: '😌 অবসরপ্রাপ্ত', contribution: 'অবসরপ্রাপ্ত নেতা', icon: '🎖️' },
  other: { multiplier: 0.1, mood: '😐 অন্যান্য', contribution: 'অন্যান্য', icon: '❓' },
};

function calculateChada() {
  const profession = document.getElementById('profession').value;
  const salaryInput = document.getElementById('salary').value;
  const errorDiv = document.getElementById('error-message');
  const resultContainer = document.getElementById('result-container');

  errorDiv.classList.add('hidden');
  resultContainer.classList.add('hidden');

  if (profession === 'default') {
    errorDiv.textContent = 'দয়া করে আপনার পেশা নির্বাচন করুন।';
    errorDiv.classList.remove('hidden');
    return;
  }
  if (!salaryInput || salaryInput <= 0) {
    errorDiv.textContent = 'দয়া করে বৈধ মাসিক আয় লিখুন।';
    errorDiv.classList.remove('hidden');
    return;
  }

  const salary = parseFloat(salaryInput);
  const data = professionData[profession] || professionData['other'];

  const chada = salary * data.multiplier;
  const remaining = salary - chada;

  // Set result texts
  document.getElementById('remaining-salary').textContent = `${remaining.toFixed(2)} টাকা`;
  document.getElementById('survival-text').textContent = 'পকেট ফাঁকা না হলেও বেঁচে থাকবেন!';
  document.getElementById('leader-mood-icon').textContent = data.icon;
  document.getElementById('leader-mood-text').textContent = data.mood;
  document.getElementById('contribution-icon').textContent = data.icon;
  document.getElementById('contribution-text').textContent = data.contribution;
  document.getElementById('humor-text').textContent = `আপনার অবদান চাঁদার হিসাব অনুযায়ী: ${chada.toFixed(2)} টাকা প্রতি মাস।`;

  // Detailed breakdown
  const details = `
    <p><strong>মোট মাসিক আয়:</strong> ${salary.toFixed(2)} টাকা</p>
    <p><strong>মাসিক চাঁদা:</strong> ${chada.toFixed(2)} টাকা (${(data.multiplier * 100).toFixed(0)}%)</p>
    <p><strong>অবশিষ্ট টাকা:</strong> ${remaining.toFixed(2)} টাকা</p>
  `;
  document.getElementById('result-details').innerHTML = details;

  // Chart.js data
  const ctx = document.getElementById('chadaChart').getContext('2d');
  if(window.chadaChartInstance) {
    window.chadaChartInstance.destroy();
  }
  window.chadaChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['চাঁদা', 'অবশিষ্ট টাকা'],
      datasets: [{
        data: [chada, remaining],
        backgroundColor: ['#dc2626', '#2563eb'],
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { enabled: true }
      }
    }
  });

  // Show results
  resultContainer.classList.remove('hidden');
}

function generateReceipt() {
  const receiptContainer = document.getElementById('receipt-container');
  const professionText = document.getElementById('profession').options[document.getElementById('profession').selectedIndex].text;
  const chadaText = document.getElementById('remaining-salary').textContent;
  const remainingText = document.getElementById('remaining-salary').textContent;
  const leaderMoodText = document.getElementById('leader-mood-text').textContent;
  const contributionText = document.getElementById('contribution-text').textContent;

  document.getElementById('receipt-profession').textContent = professionText;
  document.getElementById('receipt-chada').textContent = chadaText;
  document.getElementById('receipt-remaining').textContent = remainingText;
  document.getElementById('receipt-leader-mood').textContent = leaderMoodText;
  document.getElementById('receipt-contribution').textContent = contributionText;

  html2canvas(receiptContainer, { scale: 2 }).then(canvas => {
    const dataUrl = canvas.toDataURL('image/png');
    const receiptPreview = document.getElementById('receipt-preview');
    const downloadLink = document.getElementById('download-link');

    receiptPreview.innerHTML = '';
    receiptPreview.appendChild(canvas);
    downloadLink.href = dataUrl;

    // Show modal
    document.getElementById('receipt-modal').classList.remove('hidden');
  });
}

function closeModal() {
  document.getElementById('receipt-modal').classList.add('hidden');
}
