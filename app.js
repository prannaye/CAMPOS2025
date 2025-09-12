// ERP Student Management System - JavaScript

// Global variables
let currentUser = null;
let currentSection = 'dashboard';

// Sample data - in a real application, this would come from a database
const sampleData = {
  users: [
    {
      id: "admin001",
      username: "admin",
      password: "admin123",
      role: "admin",
      name: "Dr. Rajesh Verma",
      department: "Administration"
    },
    {
      id: "staff001",
      username: "staff",
      password: "staff123",
      role: "staff",
      name: "Ms. Priya Sharma",
      department: "Admissions"
    },
    {
      id: "student001",
      username: "student",
      password: "student123",
      role: "student",
      name: "Arjun Sharma",
      student_id: "STU001"
    }
  ],
  students: [
    {
      id: "STU001",
      name: "Arjun Sharma",
      email: "arjun.sharma@student.edu",
      phone: "+91-9876543210",
      course: "B.Tech Computer Science",
      year: 2,
      admission_date: "2024-08-15",
      fee_status: {
        total_fee: 85000,
        paid: 60000,
        pending: 25000,
        due_date: "2025-10-15"
      },
      hostel: {
        allocated: true,
        room_number: "A-201",
        floor: 2,
        building: "Boys Hostel A"
      },
      documents: {
        verified: true,
        pending: []
      }
    },
    {
      id: "STU002",
      name: "Priya Patel",
      email: "priya.patel@student.edu",
      phone: "+91-9876543211",
      course: "B.Tech Electronics",
      year: 1,
      admission_date: "2025-07-20",
      fee_status: {
        total_fee: 80000,
        paid: 80000,
        pending: 0,
        due_date: "2025-12-15"
      },
      hostel: {
        allocated: true,
        room_number: "B-105",
        floor: 1,
        building: "Girls Hostel B"
      },
      documents: {
        verified: true,
        pending: []
      }
    }
  ],
  applications: [
    {
      id: "APP001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      course: "B.Tech Computer Science",
      status: "pending",
      documents: {
        "10th_marksheet": "uploaded",
        "12th_marksheet": "uploaded",
        "aadhar": "pending",
        "photo": "uploaded"
      },
      merit_score: 85,
      applied_date: "2025-09-10"
    },
    {
      id: "APP002",
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      course: "B.Tech Electronics",
      status: "approved",
      documents: {
        "10th_marksheet": "verified",
        "12th_marksheet": "verified",
        "aadhar": "verified",
        "photo": "verified"
      },
      merit_score: 92,
      applied_date: "2025-09-08"
    }
  ],
  hostel_rooms: [
    {
      room_number: "A-101",
      building: "Boys Hostel A",
      floor: 1,
      type: "double",
      occupied: 2,
      capacity: 2,
      students: ["STU003", "STU004"]
    },
    {
      room_number: "A-201",
      building: "Boys Hostel A",
      floor: 2,
      type: "double",
      occupied: 1,
      capacity: 2,
      students: ["STU001"]
    },
    {
      room_number: "B-105",
      building: "Girls Hostel B",
      floor: 1,
      type: "single",
      occupied: 1,
      capacity: 1,
      students: ["STU002"]
    }
  ],
  dashboard_metrics: {
    total_students: 1250,
    applications_pending: 45,
    fee_collection_today: 125000,
    hostel_occupancy: {
      total_rooms: 500,
      occupied: 430,
      available: 70,
      occupancy_rate: 86
    },
    recent_activities: [
      {
        time: "10:30 AM",
        activity: "New application submitted - Rajesh Kumar"
      },
      {
        time: "11:15 AM",
        activity: "Fee payment received - Priya Patel (₹40,000)"
      },
      {
        time: "12:00 PM",
        activity: "Hostel room allocated - Room A-301"
      },
      {
        time: "02:30 PM",
        activity: "Document verification completed - 5 students"
      }
    ]
  },
  fee_analytics: {
    monthly_collection: [
      { month: "Jan", collected: 2500000 },
      { month: "Feb", collected: 2800000 },
      { month: "Mar", collected: 2600000 },
      { month: "Apr", collected: 3200000 },
      { month: "May", collected: 2900000 },
      { month: "Jun", collected: 3100000 }
    ],
    payment_methods: {
      online_banking: 45,
      upi: 35,
      credit_card: 15,
      cash: 5
    }
  },
  hostel_analytics: {
    room_types: {
      single: { total: 100, occupied: 85 },
      double: { total: 300, occupied: 260 },
      triple: { total: 100, occupied: 85 }
    },
    maintenance_requests: {
      pending: 12,
      in_progress: 8,
      completed: 45
    }
  }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  
  // Load sample data into localStorage if not exists
  if (!localStorage.getItem('erp_data')) {
    localStorage.setItem('erp_data', JSON.stringify(sampleData));
  }
});

// Initialize application
function initializeApp() {
  showLoginPage();
}

// Setup event listeners
function setupEventListeners() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  
  // Payment modal
  const processPaymentBtn = document.getElementById('process-payment-btn');
  if (processPaymentBtn) {
    processPaymentBtn.addEventListener('click', () => {
      showModal('payment-modal');
    });
  }
  
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', handlePayment);
  }
  
  const cancelPayment = document.getElementById('cancel-payment');
  if (cancelPayment) {
    cancelPayment.addEventListener('click', () => {
      closeModal('payment-modal');
    });
  }
  
  // Application modal
  const newApplicationBtn = document.getElementById('new-application-btn');
  if (newApplicationBtn) {
    newApplicationBtn.addEventListener('click', () => {
      showModal('application-modal');
    });
  }
  
  const applicationForm = document.getElementById('application-form');
  if (applicationForm) {
    applicationForm.addEventListener('submit', handleNewApplication);
  }
  
  const cancelApplication = document.getElementById('cancel-application');
  if (cancelApplication) {
    cancelApplication.addEventListener('click', () => {
      closeModal('application-modal');
    });
  }
  
  // Student actions
  const payFeesBtn = document.getElementById('pay-fees-btn');
  if (payFeesBtn) {
    payFeesBtn.addEventListener('click', handleStudentFeePayment);
  }
  
  const downloadReceiptBtn = document.getElementById('download-receipt-btn');
  if (downloadReceiptBtn) {
    downloadReceiptBtn.addEventListener('click', handleDownloadReceipt);
  }
  
  const maintenanceRequestBtn = document.getElementById('maintenance-request-btn');
  if (maintenanceRequestBtn) {
    maintenanceRequestBtn.addEventListener('click', handleMaintenanceRequest);
  }
  
  // Export report
  const exportReportBtn = document.getElementById('export-report-btn');
  if (exportReportBtn) {
    exportReportBtn.addEventListener('click', handleExportReport);
  }
  
  // Room allocation
  const allocateRoomBtn = document.getElementById('allocate-room-btn');
  if (allocateRoomBtn) {
    allocateRoomBtn.addEventListener('click', handleRoomAllocation);
  }
}

// Authentication functions
function handleLogin(e) {
  e.preventDefault();
  
  const role = document.getElementById('role-select').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const user = data.users.find(u => 
    u.username === username && 
    u.password === password && 
    u.role === role
  );
  
  if (user) {
    currentUser = user;
    showMainApplication();
    setupNavigation();
    showSuccessMessage('Login successful!');
  } else {
    showErrorMessage('Invalid credentials. Please try again.');
  }
}

function handleLogout() {
  currentUser = null;
  currentSection = 'dashboard';
  showLoginPage();
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.reset();
  }
}

// Navigation functions
function showLoginPage() {
  const loginPage = document.getElementById('login-page');
  const mainApp = document.getElementById('main-app');
  
  if (loginPage) loginPage.classList.add('active');
  if (mainApp) mainApp.classList.remove('active');
}

function showMainApplication() {
  const loginPage = document.getElementById('login-page');
  const mainApp = document.getElementById('main-app');
  
  if (loginPage) loginPage.classList.remove('active');
  if (mainApp) mainApp.classList.add('active');
  
  // Update navbar
  const userNameEl = document.getElementById('user-name');
  if (userNameEl && currentUser) {
    userNameEl.textContent = currentUser.name;
  }
}

function setupNavigation() {
  const sidebar = document.getElementById('sidebar-menu');
  if (!sidebar) return;
  
  sidebar.innerHTML = '';
  
  let menuItems = [];
  let defaultSection = '';
  
  if (currentUser.role === 'admin') {
    menuItems = [
      { id: 'admin-dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard', section: 'dashboard' },
      { id: 'admission-management', icon: 'fas fa-user-plus', text: 'Admissions', section: 'admissions' },
      { id: 'fee-management', icon: 'fas fa-money-bill', text: 'Fee Management', section: 'fees' },
      { id: 'hostel-management', icon: 'fas fa-building', text: 'Hostel Management', section: 'hostel' },
      { id: 'analytics-dashboard', icon: 'fas fa-chart-bar', text: 'Analytics', section: 'analytics' }
    ];
    defaultSection = 'admin-dashboard';
  } else if (currentUser.role === 'staff') {
    menuItems = [
      { id: 'admission-management', icon: 'fas fa-user-plus', text: 'Admissions', section: 'admissions' },
      { id: 'fee-management', icon: 'fas fa-money-bill', text: 'Fee Management', section: 'fees' },
      { id: 'hostel-management', icon: 'fas fa-building', text: 'Hostel Management', section: 'hostel' }
    ];
    defaultSection = 'admission-management';
  } else if (currentUser.role === 'student') {
    menuItems = [
      { id: 'student-dashboard', icon: 'fas fa-user', text: 'My Dashboard', section: 'student' }
    ];
    defaultSection = 'student-dashboard';
  }
  
  let firstMenuItem = null;
  
  menuItems.forEach((item, index) => {
    const menuItem = document.createElement('div');
    menuItem.className = 'sidebar-item';
    
    menuItem.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
    menuItem.addEventListener('click', () => navigateToSection(item.id, item.section, menuItem));
    sidebar.appendChild(menuItem);
    
    if (index === 0) {
      firstMenuItem = menuItem;
    }
  });
  
  // Show default section
  if (firstMenuItem && defaultSection) {
    setTimeout(() => {
      firstMenuItem.click();
    }, 100);
  }
}

function navigateToSection(sectionId, section, menuItem) {
  // Update active menu item
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.remove('active');
  });
  if (menuItem) {
    menuItem.classList.add('active');
  }
  
  // Hide all content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    sectionElement.classList.add('active');
    currentSection = section;
    
    // Load section data
    switch (section) {
      case 'dashboard':
        loadDashboard();
        break;
      case 'admissions':
        loadAdmissions();
        break;
      case 'fees':
        loadFeeManagement();
        break;
      case 'hostel':
        loadHostelManagement();
        break;
      case 'analytics':
        loadAnalytics();
        break;
      case 'student':
        loadStudentDashboard();
        break;
    }
  }
}

// Dashboard functions
function loadDashboard() {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const metrics = data.dashboard_metrics;
  
  // Update metrics
  const totalStudentsEl = document.getElementById('total-students');
  const pendingApplicationsEl = document.getElementById('pending-applications');
  const todayCollectionEl = document.getElementById('today-collection');
  const hostelOccupancyEl = document.getElementById('hostel-occupancy');
  
  if (totalStudentsEl) totalStudentsEl.textContent = metrics.total_students.toLocaleString();
  if (pendingApplicationsEl) pendingApplicationsEl.textContent = metrics.applications_pending;
  if (todayCollectionEl) todayCollectionEl.textContent = `₹${metrics.fee_collection_today.toLocaleString()}`;
  if (hostelOccupancyEl) hostelOccupancyEl.textContent = `${metrics.hostel_occupancy.occupancy_rate}%`;
  
  // Load activity feed
  loadActivityFeed(metrics.recent_activities);
  
  // Load fee chart
  setTimeout(() => {
    loadFeeChart();
  }, 500);
}

function loadActivityFeed(activities) {
  const feed = document.getElementById('activity-feed');
  if (!feed) return;
  
  feed.innerHTML = '';
  
  activities.forEach(activity => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-time">${activity.time}</div>
      <div class="activity-text">${activity.activity}</div>
    `;
    feed.appendChild(item);
  });
}

function loadFeeChart() {
  const chartCanvas = document.getElementById('fee-chart');
  if (!chartCanvas) return;
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const chartData = data.fee_analytics.monthly_collection;
  
  const ctx = chartCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.map(item => item.month),
      datasets: [{
        label: 'Monthly Collection (₹)',
        data: chartData.map(item => item.collected),
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₹' + (value / 1000000).toFixed(1) + 'M';
            }
          }
        }
      }
    }
  });
}

// Admissions functions
function loadAdmissions() {
  loadApplicationsTable();
}

function loadApplicationsTable() {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const applications = data.applications;
  const tbody = document.querySelector('#applications-table tbody');
  
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  applications.forEach(app => {
    const row = document.createElement('tr');
    
    const statusClass = app.status === 'approved' ? 'status--success' : 
                       app.status === 'pending' ? 'status--warning' : 'status--error';
    
    row.innerHTML = `
      <td>${app.id}</td>
      <td>${app.name}</td>
      <td>${app.course}</td>
      <td>${app.merit_score}</td>
      <td><span class="status ${statusClass}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></td>
      <td>
        <button class="btn btn--sm btn--primary" onclick="approveApplication('${app.id}')">
          ${app.status === 'pending' ? 'Approve' : 'View'}
        </button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

function approveApplication(appId) {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const application = data.applications.find(app => app.id === appId);
  
  if (application && application.status === 'pending') {
    application.status = 'approved';
    localStorage.setItem('erp_data', JSON.stringify(data));
    loadApplicationsTable();
    showSuccessMessage(`Application ${appId} approved successfully!`);
    
    // Add to recent activities
    data.dashboard_metrics.recent_activities.unshift({
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      activity: `Application approved - ${application.name}`
    });
    
    // Keep only last 10 activities
    if (data.dashboard_metrics.recent_activities.length > 10) {
      data.dashboard_metrics.recent_activities = data.dashboard_metrics.recent_activities.slice(0, 10);
    }
    
    localStorage.setItem('erp_data', JSON.stringify(data));
  }
}

function handleNewApplication(e) {
  e.preventDefault();
  
  const name = document.getElementById('applicant-name').value;
  const email = document.getElementById('applicant-email').value;
  const course = document.getElementById('applicant-course').value;
  const merit = parseInt(document.getElementById('applicant-merit').value);
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const newId = 'APP' + String(data.applications.length + 1).padStart(3, '0');
  
  const newApplication = {
    id: newId,
    name: name,
    email: email,
    course: course,
    status: 'pending',
    documents: {
      "10th_marksheet": "pending",
      "12th_marksheet": "pending",
      "aadhar": "pending",
      "photo": "pending"
    },
    merit_score: merit,
    applied_date: new Date().toISOString().split('T')[0]
  };
  
  data.applications.push(newApplication);
  data.dashboard_metrics.applications_pending++;
  
  // Add to recent activities
  data.dashboard_metrics.recent_activities.unshift({
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    activity: `New application submitted - ${name}`
  });
  
  localStorage.setItem('erp_data', JSON.stringify(data));
  
  closeModal('application-modal');
  const applicationForm = document.getElementById('application-form');
  if (applicationForm) {
    applicationForm.reset();
  }
  loadApplicationsTable();
  showSuccessMessage('New application submitted successfully!');
}

// Fee Management functions
function loadFeeManagement() {
  loadFeeTable();
  setTimeout(() => {
    loadPaymentMethodsChart();
  }, 500);
}

function loadFeeTable() {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const students = data.students;
  const tbody = document.querySelector('#fee-table tbody');
  
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  students.forEach(student => {
    const row = document.createElement('tr');
    const feeStatus = student.fee_status.pending === 0 ? 'Paid' : 
                     student.fee_status.pending > 0 ? 'Pending' : 'Overdue';
    const statusClass = feeStatus === 'Paid' ? 'status--success' : 
                       feeStatus === 'Pending' ? 'status--warning' : 'status--error';
    
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td>₹${student.fee_status.total_fee.toLocaleString()}</td>
      <td>₹${student.fee_status.paid.toLocaleString()}</td>
      <td>₹${student.fee_status.pending.toLocaleString()}</td>
      <td><span class="status ${statusClass}">${feeStatus}</span></td>
      <td>
        <button class="btn btn--sm btn--primary" onclick="processStudentPayment('${student.id}')">
          ${student.fee_status.pending > 0 ? 'Collect' : 'Receipt'}
        </button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

function loadPaymentMethodsChart() {
  const chartCanvas = document.getElementById('payment-methods-chart');
  if (!chartCanvas) return;
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const paymentMethods = data.fee_analytics.payment_methods;
  
  const ctx = chartCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Online Banking', 'UPI', 'Credit Card', 'Cash'],
      datasets: [{
        data: [
          paymentMethods.online_banking,
          paymentMethods.upi,
          paymentMethods.credit_card,
          paymentMethods.cash
        ],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function processStudentPayment(studentId) {
  const paymentStudentIdEl = document.getElementById('payment-student-id');
  if (paymentStudentIdEl) {
    paymentStudentIdEl.value = studentId;
  }
  showModal('payment-modal');
}

function handlePayment(e) {
  e.preventDefault();
  
  const studentId = document.getElementById('payment-student-id').value;
  const amount = parseInt(document.getElementById('payment-amount').value);
  const method = document.getElementById('payment-method').value;
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const student = data.students.find(s => s.id === studentId);
  
  if (student) {
    student.fee_status.paid += amount;
    student.fee_status.pending -= amount;
    
    if (student.fee_status.pending < 0) {
      student.fee_status.pending = 0;
    }
    
    // Update today's collection
    data.dashboard_metrics.fee_collection_today += amount;
    
    // Add to recent activities
    data.dashboard_metrics.recent_activities.unshift({
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      activity: `Fee payment received - ${student.name} (₹${amount.toLocaleString()})`
    });
    
    localStorage.setItem('erp_data', JSON.stringify(data));
    
    closeModal('payment-modal');
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
      paymentForm.reset();
    }
    loadFeeTable();
    showSuccessMessage(`Payment of ₹${amount.toLocaleString()} processed successfully!`);
  }
}

// Hostel Management functions
function loadHostelManagement() {
  loadHostelStats();
  loadRoomsTable();
  setTimeout(() => {
    loadRoomOccupancyChart();
  }, 500);
}

function loadHostelStats() {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const hostel = data.dashboard_metrics.hostel_occupancy;
  const maintenance = data.hostel_analytics.maintenance_requests;
  
  const totalRoomsEl = document.getElementById('total-rooms');
  const occupiedRoomsEl = document.getElementById('occupied-rooms');
  const availableRoomsEl = document.getElementById('available-rooms');
  const maintenanceRequestsEl = document.getElementById('maintenance-requests');
  
  if (totalRoomsEl) totalRoomsEl.textContent = hostel.total_rooms;
  if (occupiedRoomsEl) occupiedRoomsEl.textContent = hostel.occupied;
  if (availableRoomsEl) availableRoomsEl.textContent = hostel.available;
  if (maintenanceRequestsEl) maintenanceRequestsEl.textContent = maintenance.pending;
}

function loadRoomsTable() {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const rooms = data.hostel_rooms;
  const tbody = document.querySelector('#rooms-table tbody');
  
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  rooms.forEach(room => {
    const row = document.createElement('tr');
    const occupancyRate = (room.occupied / room.capacity * 100);
    const status = room.occupied === room.capacity ? 'Full' : 
                  room.occupied === 0 ? 'Available' : 'Partial';
    const statusClass = status === 'Full' ? 'status--error' : 
                       status === 'Available' ? 'status--success' : 'status--warning';
    
    row.innerHTML = `
      <td>${room.room_number}</td>
      <td>${room.building}</td>
      <td>Floor ${room.floor}</td>
      <td class="text-center">${room.type}</td>
      <td class="text-center">${room.occupied}/${room.capacity}</td>
      <td>${room.students.join(', ') || 'None'}</td>
      <td><span class="status ${statusClass}">${status}</span></td>
      <td>
        <button class="btn btn--sm btn--primary" onclick="manageRoom('${room.room_number}')">
          ${status === 'Available' ? 'Allocate' : 'Manage'}
        </button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

function loadRoomOccupancyChart() {
  const chartCanvas = document.getElementById('room-occupancy-chart');
  if (!chartCanvas) return;
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const roomTypes = data.hostel_analytics.room_types;
  
  const ctx = chartCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Single', 'Double', 'Triple'],
      datasets: [{
        label: 'Total Rooms',
        data: [roomTypes.single.total, roomTypes.double.total, roomTypes.triple.total],
        backgroundColor: '#FFC185',
        borderColor: '#FFC185',
        borderWidth: 1
      }, {
        label: 'Occupied Rooms',
        data: [roomTypes.single.occupied, roomTypes.double.occupied, roomTypes.triple.occupied],
        backgroundColor: '#1FB8CD',
        borderColor: '#1FB8CD',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}

function manageRoom(roomNumber) {
  showSuccessMessage(`Room ${roomNumber} management feature will be implemented here.`);
}

function handleRoomAllocation() {
  showSuccessMessage('Room allocation feature will be implemented here.');
}

// Student Dashboard functions
function loadStudentDashboard() {
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const student = data.students.find(s => s.id === currentUser.student_id);
  
  if (student) {
    const studentNameEl = document.getElementById('student-name');
    if (studentNameEl) {
      studentNameEl.textContent = student.name;
    }
    loadStudentProfile(student);
    loadStudentFeeStatus(student);
    loadStudentHostelInfo(student);
  }
}

function loadStudentProfile(student) {
  const profileDiv = document.getElementById('student-profile');
  if (!profileDiv) return;
  
  profileDiv.innerHTML = `
    <div class="profile-item">
      <span class="profile-label">Student ID</span>
      <span class="profile-value">${student.id}</span>
    </div>
    <div class="profile-item">
      <span class="profile-label">Email</span>
      <span class="profile-value">${student.email}</span>
    </div>
    <div class="profile-item">
      <span class="profile-label">Phone</span>
      <span class="profile-value">${student.phone}</span>
    </div>
    <div class="profile-item">
      <span class="profile-label">Course</span>
      <span class="profile-value">${student.course}</span>
    </div>
    <div class="profile-item">
      <span class="profile-label">Year</span>
      <span class="profile-value">${student.year}</span>
    </div>
    <div class="profile-item">
      <span class="profile-label">Admission Date</span>
      <span class="profile-value">${new Date(student.admission_date).toLocaleDateString()}</span>
    </div>
  `;
}

function loadStudentFeeStatus(student) {
  const feeDiv = document.getElementById('student-fee-status');
  if (!feeDiv) return;
  
  const pendingAmount = student.fee_status.pending;
  
  feeDiv.innerHTML = `
    <div class="fee-amount ${pendingAmount > 0 ? 'text-error' : 'text-success'}">
      ₹${pendingAmount.toLocaleString()}
    </div>
    <p>${pendingAmount > 0 ? 'Pending Amount' : 'All Fees Paid'}</p>
    <div class="fee-details">
      <div class="fee-detail">
        <span class="fee-detail-label">Total Fee</span>
        <span class="fee-detail-value">₹${student.fee_status.total_fee.toLocaleString()}</span>
      </div>
      <div class="fee-detail">
        <span class="fee-detail-label">Paid</span>
        <span class="fee-detail-value text-success">₹${student.fee_status.paid.toLocaleString()}</span>
      </div>
    </div>
    ${pendingAmount > 0 ? `<p class="text-error">Due Date: ${new Date(student.fee_status.due_date).toLocaleDateString()}</p>` : ''}
  `;
}

function loadStudentHostelInfo(student) {
  const hostelDiv = document.getElementById('student-hostel-info');
  if (!hostelDiv) return;
  
  if (student.hostel.allocated) {
    hostelDiv.innerHTML = `
      <div class="hostel-item">
        <i class="fas fa-building"></i>
        <div>
          <strong>Building:</strong> ${student.hostel.building}
        </div>
      </div>
      <div class="hostel-item">
        <i class="fas fa-door-open"></i>
        <div>
          <strong>Room Number:</strong> ${student.hostel.room_number}
        </div>
      </div>
      <div class="hostel-item">
        <i class="fas fa-layer-group"></i>
        <div>
          <strong>Floor:</strong> ${student.hostel.floor}
        </div>
      </div>
    `;
  } else {
    hostelDiv.innerHTML = `
      <div class="text-center">
        <i class="fas fa-home" style="font-size: 48px; color: var(--color-text-secondary); margin-bottom: 16px;"></i>
        <p>No hostel room allocated yet.</p>
      </div>
    `;
  }
}

// Analytics functions
function loadAnalytics() {
  setTimeout(() => {
    loadMonthlyCollectionChart();
  }, 500);
}

function loadMonthlyCollectionChart() {
  const chartCanvas = document.getElementById('monthly-collection-chart');
  if (!chartCanvas) return;
  
  const data = JSON.parse(localStorage.getItem('erp_data'));
  const chartData = data.fee_analytics.monthly_collection;
  
  const ctx = chartCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.map(item => item.month),
      datasets: [{
        label: 'Monthly Collection (₹)',
        data: chartData.map(item => item.collected),
        backgroundColor: '#1FB8CD',
        borderColor: '#1FB8CD',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₹' + (value / 1000000).toFixed(1) + 'M';
            }
          }
        }
      }
    }
  });
}

// Student action handlers
function handleStudentFeePayment() {
  showSuccessMessage('Redirecting to payment gateway...');
}

function handleDownloadReceipt() {
  showSuccessMessage('Receipt downloaded successfully!');
}

function handleMaintenanceRequest() {
  showSuccessMessage('Maintenance request submitted successfully!');
}

function handleExportReport() {
  showSuccessMessage('Report exported successfully!');
}

// Modal functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal(modalId = null) {
  if (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
    }
  } else {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden');
    });
  }
}

// Utility functions
function showSuccessMessage(message) {
  // Create a temporary success message
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message message--success';
  messageDiv.textContent = message;
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '100px';
  messageDiv.style.right = '20px';
  messageDiv.style.zIndex = '2001';
  messageDiv.style.minWidth = '300px';
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

function showErrorMessage(message) {
  // Create a temporary error message
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message message--error';
  messageDiv.textContent = message;
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '100px';
  messageDiv.style.right = '20px';
  messageDiv.style.zIndex = '2001';
  messageDiv.style.minWidth = '300px';
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN');
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    closeModal();
  }
});

// Make functions globally available for onclick handlers
window.approveApplication = approveApplication;
window.processStudentPayment = processStudentPayment;
window.manageRoom = manageRoom;