// Global variables
let tasks = [];
let editingTaskId = null;
let isGridView = false;

// Load tasks from localStorage on page load
function loadTasks() {
    const storedTasks = localStorage.getItem('studentTasks');
    if (storedTasks) {
        try {
            tasks = JSON.parse(storedTasks);
        } catch (e) {
            console.error('Error parsing tasks from localStorage:', e);
            tasks = [];
        }
    }
    renderTasks();
    updateStatistics();
    updateSubjectFilter();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('studentTasks', JSON.stringify(tasks));
}

// Show add form
function showAddForm() {
    editingTaskId = null;
    document.getElementById('formTitle').innerHTML = '<i class="fas fa-plus-circle text-cyan-400"></i> Tambah Tugas Baru';
    document.getElementById('taskName').value = '';
    document.getElementById('taskSubject').value = '';
    document.getElementById('taskPriority').value = 'medium';
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskDeadline').min = today;
    
    clearErrors();
    document.getElementById('formModal').classList.remove('hidden');
}

// Show edit form
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;
        document.getElementById('formTitle').innerHTML = '<i class="fas fa-edit text-cyan-400"></i> Edit Tugas';
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskSubject').value = task.subject;
        document.getElementById('taskPriority').value = task.priority || 'medium';
        document.getElementById('taskDeadline').value = task.deadline;
        clearErrors();
        document.getElementById('formModal').classList.remove('hidden');
    }
}

// Close form
function closeForm() {
    document.getElementById('formModal').classList.add('hidden');
    editingTaskId = null;
    clearErrors();
}

// Clear error messages
function clearErrors() {
    document.getElementById('errorName').classList.add('hidden');
    document.getElementById('errorSubject').classList.add('hidden');
    document.getElementById('errorDeadline').classList.add('hidden');
    document.getElementById('taskName').classList.remove('border-red-500');
    document.getElementById('taskSubject').classList.remove('border-red-500');
    document.getElementById('taskDeadline').classList.remove('border-red-500');
}

// Validate form
function validateForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('taskName').value.trim();
    const subject = document.getElementById('taskSubject').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (!name) {
        document.getElementById('errorName').classList.remove('hidden');
        document.getElementById('taskName').classList.add('border-red-500');
        isValid = false;
    }

    if (!subject) {
        document.getElementById('errorSubject').classList.remove('hidden');
        document.getElementById('taskSubject').classList.add('border-red-500');
        isValid = false;
    }

    if (!deadline) {
        document.getElementById('errorDeadline').classList.remove('hidden');
        document.getElementById('taskDeadline').classList.add('border-red-500');
        isValid = false;
    } else {
        const selectedDate = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            document.getElementById('errorDeadline').classList.remove('hidden');
            document.getElementById('taskDeadline').classList.add('border-red-500');
            isValid = false;
        }
    }

    return isValid;
}

// Save task
function saveTask() {
    if (!validateForm()) {
        return;
    }

    const name = document.getElementById('taskName').value.trim();
    const subject = document.getElementById('taskSubject').value;
    const priority = document.getElementById('taskPriority').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (editingTaskId) {
        // Update existing task
        const index = tasks.findIndex(t => t.id === editingTaskId);
        if (index !== -1) {
            tasks[index] = {
                ...tasks[index],
                name,
                subject,
                priority,
                deadline,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // Add new task
        const newTask = {
            id: Date.now(),
            name,
            subject,
            priority,
            deadline,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
    }

    saveTasks();
    renderTasks();
    updateStatistics();
    updateSubjectFilter();
    closeForm();
    
    // Show success notification
    showNotification('Tugas berhasil disimpan!', 'success');
}

// Toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        saveTasks();
        renderTasks();
        updateStatistics();
        
        // Show notification
        const message = task.completed ? 'Tugas selesai! 🎉' : 'Tugas dikembalikan ke belum selesai';
        showNotification(message, 'info');
    }
}

// Delete task
function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        if (confirm(`Apakah Anda yakin ingin menghapus tugas "${task.name}"?`)) {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
            updateStatistics();
            updateSubjectFilter();
            showNotification('Tugas berhasil dihapus', 'warning');
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-xl text-white font-semibold z-50 fade-in ${
        type === 'success' ? 'bg-green-500' :
        type === 'warning' ? 'bg-orange-500' :
        type === 'error' ? 'bg-red-500' : 'bg-cyan-500'
    }`;
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Format time since creation
function formatTimeSince(dateString) {
    const created = new Date(dateString);
    const now = new Date();
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return "Hari ini";
    } else if (diffDays === 1) {
        return "1 hari yang lalu";
    } else {
        return `${diffDays} hari yang lalu`;
    }
}

// Check if deadline is near (within 3 days)
function isDeadlineNear(dateString) {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
}

// Check if deadline has passed
function isDeadlinePassed(dateString) {
    const deadline = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline < today;
}

// Get priority label with icons
function getPriorityLabel(priority) {
    switch(priority) {
        case 'high': 
            return { 
                text: 'Tinggi', 
                color: 'bg-red-500/20 text-red-400 border-red-500/30',
                icon: 'fas fa-fire'
            };
        case 'medium': 
            return { 
                text: 'Sedang', 
                color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                icon: 'fas fa-exclamation'
            };
        case 'low': 
            return { 
                text: 'Rendah', 
                color: 'bg-green-500/20 text-green-400 border-green-500/30',
                icon: 'fas fa-leaf'
            };
        default: 
            return { 
                text: 'Sedang', 
                color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                icon: 'fas fa-exclamation'
            };
    }
}

// Sort tasks
function sortTasks(tasksToSort) {
    const sortBy = document.getElementById('sortTasks').value;
    
    return [...tasksToSort].sort((a, b) => {
        switch(sortBy) {
            case 'deadline':
                return new Date(a.deadline) - new Date(b.deadline);
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium'];
            case 'created':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });
}

// Filter tasks
function getFilteredTasks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value;
    const filterSubject = document.getElementById('filterSubject').value;

    return tasks.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(searchTerm) ||
                            task.subject.toLowerCase().includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || 
                            (filterStatus === 'completed' && task.completed) ||
                            (filterStatus === 'pending' && !task.completed);
        const matchesSubject = filterSubject === 'all' || task.subject === filterSubject;
        
        return matchesSearch && matchesStatus && matchesSubject;
    });
}

// Toggle view mode
function toggleViewMode() {
    isGridView = !isGridView;
    const viewToggle = document.getElementById('viewToggle');
    
    if (isGridView) {
        viewToggle.innerHTML = '<i class="fas fa-grid"></i><span>Tampilan Grid</span>';
    } else {
        viewToggle.innerHTML = '<i class="fas fa-list"></i><span>Tampilan Daftar</span>';
    }
    
    renderTasks();
}

// Render tasks
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    const sortedTasks = sortTasks(filteredTasks);
    const tasksList = document.getElementById('tasksList');
    document.getElementById('taskCount').textContent = `(${filteredTasks.length})`;

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-4 text-gray-500">
                    <i class="fas fa-inbox"></i>
                </div>
                <p class="text-gray-400 text-lg">
                    ${tasks.length === 0 
                        ? 'Belum ada tugas. Mulai dengan menambahkan tugas pertama Anda!' 
                        : 'Tidak ada tugas yang sesuai dengan filter.'}
                </p>
                ${tasks.length === 0 ? `
                    <button onclick="showAddForm()" class="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl transition-all">
                        <i class="fas fa-plus mr-2"></i>Tambah Tugas Pertama
                    </button>
                ` : ''}
            </div>
        `;
        return;
    }

    if (isGridView) {
        // Grid view
        tasksList.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${sortedTasks.map(task => `
                    <div class="task-item bg-gray-700/50 border border-gray-600 rounded-xl p-5 transition-all hover-lift hover:border-cyan-500/50 backdrop-blur-sm">
                        <div class="flex flex-col h-full">
                            <div class="flex justify-between items-start mb-3">
                                <button onclick="toggleComplete(${task.id})" class="text-2xl transition-transform hover:scale-110 ${
                                    task.completed ? 'text-green-400' : 'text-gray-400'
                                }">
                                    <i class="fas fa-${task.completed ? 'check-circle' : 'circle'}"></i>
                                </button>
                                <div class="flex gap-2">
                                    <button onclick="editTask(${task.id})" 
                                            class="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all hover:scale-110"
                                            title="Edit tugas">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteTask(${task.id})" 
                                            class="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all hover:scale-110"
                                            title="Hapus tugas">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <h3 class="font-semibold text-lg mb-3 ${
                                task.completed ? 'line-through text-gray-500' : 'text-white'
                            }">
                                ${task.name}
                            </h3>
                            
                            <div class="space-y-2 mb-4 flex-grow">
                                <span class="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                                    <i class="fas fa-book"></i>
                                    ${task.subject}
                                </span>
                                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                                    getPriorityLabel(task.priority).color
                                }">
                                    <i class="${getPriorityLabel(task.priority).icon}"></i>
                                    ${getPriorityLabel(task.priority).text}
                                </span>
                                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                                    isDeadlineNear(task.deadline) && !task.completed
                                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                        : 'bg-gray-600 text-gray-300 border-gray-500'
                                }">
                                    <i class="fas fa-calendar"></i>
                                    ${formatDate(task.deadline)}
                                </span>
                            </div>

                            <div class="text-xs text-gray-400 mt-auto flex items-center gap-2">
                                <i class="fas fa-clock"></i>
                                Dibuat: ${formatTimeSince(task.createdAt)}
                            </div>

                            ${isDeadlineNear(task.deadline) && !task.completed ? `
                                <div class="mt-3 text-xs text-red-400 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                                    <i class="fas fa-exclamation-triangle pulse-effect"></i>
                                    <span>Deadline mendekat!</span>
                                </div>
                            ` : ''}

                            ${isDeadlinePassed(task.deadline) && !task.completed ? `
                                <div class="mt-3 text-xs text-red-400 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                                    <i class="fas fa-skull-crossbones"></i>
                                    <span>Deadline telah lewat!</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // List view
        tasksList.innerHTML = sortedTasks.map(task => `
            <div class="task-item bg-gray-700/50 border border-gray-600 rounded-xl p-5 transition-all hover-lift hover:border-cyan-500/50 mb-4 backdrop-blur-sm ${
                task.priority ? `priority-${task.priority}` : 'priority-medium'
            }">
                <div class="flex items-start gap-4">
                    <button onclick="toggleComplete(${task.id})" class="mt-1 flex-shrink-0 text-2xl transition-transform hover:scale-110 ${
                        task.completed ? 'text-green-400' : 'text-gray-400'
                    }">
                        <i class="fas fa-${task.completed ? 'check-circle' : 'circle'}"></i>
                    </button>

                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="font-semibold text-lg ${
                                    task.completed ? 'line-through text-gray-500' : 'text-white'
                                }">
                                    ${task.name}
                                </h3>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    <span class="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/30">
                                        <i class="fas fa-book"></i>
                                        ${task.subject}
                                    </span>
                                    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                                        getPriorityLabel(task.priority).color
                                    }">
                                        <i class="${getPriorityLabel(task.priority).icon}"></i>
                                        ${getPriorityLabel(task.priority).text}
                                    </span>
                                    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                                        isDeadlineNear(task.deadline) && !task.completed
                                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                            : 'bg-gray-600 text-gray-300 border-gray-500'
                                    }">
                                        <i class="fas fa-calendar"></i>
                                        ${formatDate(task.deadline)}
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="editTask(${task.id})" 
                                        class="p-2 text-cyan-400 hover