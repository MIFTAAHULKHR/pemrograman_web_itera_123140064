// Global variables
let tasks = [];
let editingTaskId = null;
let isGridView = false;

// Load tasks from localStorage on page load
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
    updateStatistics();
    updateSubjectFilter();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show add form
function showAddForm() {
    editingTaskId = null;
    document.getElementById('formTitle').textContent = 'Tambah Tugas Baru';
    document.getElementById('taskName').value = '';
    document.getElementById('taskSubject').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskDeadline').value = '';
    clearErrors();
    document.getElementById('formModal').classList.remove('hidden');
}

// Show edit form
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;
        document.getElementById('formTitle').textContent = 'Edit Tugas';
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
                deadline
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
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
    }

    saveTasks();
    renderTasks();
    updateStatistics();
    updateSubjectFilter();
    closeForm();
}

// Toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStatistics();
    }
}

// Delete task
function deleteTask(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStatistics();
        updateSubjectFilter();
    }
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

// Get priority label
function getPriorityLabel(priority) {
    switch(priority) {
        case 'high': return { text: 'Tinggi', color: 'bg-red-100 text-red-700' };
        case 'medium': return { text: 'Sedang', color: 'bg-yellow-100 text-yellow-700' };
        case 'low': return { text: 'Rendah', color: 'bg-green-100 text-green-700' };
        default: return { text: 'Sedang', color: 'bg-yellow-100 text-yellow-700' };
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
        viewToggle.innerHTML = '<span>📊</span> Tampilan Grid';
    } else {
        viewToggle.innerHTML = '<span>📋</span> Tampilan Daftar';
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
                <div class="text-6xl mb-4">📚</div>
                <p class="text-gray-500 text-lg">
                    ${tasks.length === 0 
                        ? 'Belum ada tugas. Tambahkan tugas pertama Anda!' 
                        : 'Tidak ada tugas yang sesuai dengan filter.'}
                </p>
            </div>
        `;
        return;
    }

    if (isGridView) {
        // Grid view
        tasksList.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${sortedTasks.map(task => `
                    <div class="task-item border rounded-xl p-4 transition-all hover:shadow-md ${
                        task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                    } ${task.priority ? `priority-${task.priority}` : 'priority-medium'}">
                        <div class="flex flex-col h-full">
                            <div class="flex justify-between items-start mb-2">
                                <button onclick="toggleComplete(${task.id})" class="text-2xl">
                                    ${task.completed ? '✅' : '⭕'}
                                </button>
                                <div class="flex gap-1">
                                    <button onclick="editTask(${task.id})" 
                                            class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            title="Edit tugas">
                                        ✏️
                                    </button>
                                    <button onclick="deleteTask(${task.id})" 
                                            class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Hapus tugas">
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <h3 class="font-semibold text-lg mb-2 ${
                                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }">
                                ${task.name}
                            </h3>
                            
                            <div class="space-y-2 mb-4 flex-grow">
                                <span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                    ${task.subject}
                                </span>
                                <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                    getPriorityLabel(task.priority).color
                                }">
                                    ${getPriorityLabel(task.priority).text}
                                </span>
                                <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                    isDeadlineNear(task.deadline) && !task.completed
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-700'
                                }">
                                    📅 ${formatDate(task.deadline)}
                                </span>
                            </div>

                            <div class="text-xs text-gray-500 mt-auto">
                                Dibuat: ${formatTimeSince(task.createdAt)}
                            </div>

                            ${isDeadlineNear(task.deadline) && !task.completed ? `
                                <div class="mt-2 text-xs text-red-600 flex items-center gap-1">
                                    ⚠️ Deadline segera!
                                </div>
                            ` : ''}

                            ${isDeadlinePassed(task.deadline) && !task.completed ? `
                                <div class="mt-2 text-xs text-red-600 flex items-center gap-1">
                                    ❌ Deadline telah lewat!
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
            <div class="task-item border rounded-xl p-4 transition-all hover:shadow-md mb-3 ${
                task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
            } ${task.priority ? `priority-${task.priority}` : 'priority-medium'}">
                <div class="flex items-start gap-3">
                    <button onclick="toggleComplete(${task.id})" class="mt-1 flex-shrink-0 text-2xl">
                        ${task.completed ? '✅' : '⭕'}
                    </button>

                    <div class="flex-1">
                        <h3 class="font-semibold text-lg ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }">
                            ${task.name}
                        </h3>
                        
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                ${task.subject}
                            </span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium ${
                                getPriorityLabel(task.priority).color
                            }">
                                ${getPriorityLabel(task.priority).text}
                            </span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium ${
                                isDeadlineNear(task.deadline) && !task.completed
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-700'
                            }">
                                📅 ${formatDate(task.deadline)}
                            </span>
                        </div>

                        <div class="text-sm text-gray-500 mt-2">
                            Dibuat: ${formatTimeSince(task.createdAt)}
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button onclick="editTask(${task.id})" 
                                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit tugas">
                            ✏️
                        </button>
                        <button onclick="deleteTask(${task.id})" 
                                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus tugas">
                            🗑️
                        </button>
                    </div>
                </div>

                ${isDeadlineNear(task.deadline) && !task.completed ? `
                    <div class="mt-2 ml-9 text-sm text-red-600 flex items-center gap-1">
                        ⚠️ Deadline segera! Selesaikan tugas ini
                    </div>
                ` : ''}

                ${isDeadlinePassed(task.deadline) && !task.completed ? `
                    <div class="mt-2 ml-9 text-sm text-red-600 flex items-center gap-1">
                        ❌ Deadline telah lewat! Segera selesaikan
                    </div>
                ` : ''}
            </div>
        `).join('');
    }
}

// Update statistics
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const urgent = tasks.filter(t => 
        !t.completed && 
        (t.priority === 'high' || isDeadlineNear(t.deadline))
    ).length;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('urgentTasks').textContent = urgent;
}

// Update subject filter options
function updateSubjectFilter() {
    const uniqueSubjects = [...new Set(tasks.map(t => t.subject))];
    const filterSubject = document.getElementById('filterSubject');
    const currentValue = filterSubject.value;
    
    filterSubject.innerHTML = '<option value="all">Semua Mata Kuliah</option>' +
        uniqueSubjects.map(subject => 
            `<option value="${subject}">${subject}</option>`
        ).join('');
    
    filterSubject.value = currentValue;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchInput').addEventListener('input', renderTasks);
    document.getElementById('filterStatus').addEventListener('change', renderTasks);
    document.getElementById('filterSubject').addEventListener('change', renderTasks);
    document.getElementById('sortTasks').addEventListener('change', renderTasks);

    // Initialize app
    loadTasks();
});