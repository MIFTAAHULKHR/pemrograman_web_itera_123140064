import { StorageManager } from "./app.js";

const storage = new StorageManager();

let schedules = storage.getItem('schedules', []);
let todos = storage.getItem('todos', []);
let notes = storage.getItem('notes', []);

const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');
const weatherDisplay = document.getElementById('weather-display');
const scheduleList = document.getElementById('schedule-list');
const todoList = document.getElementById('todo-list');
const noteList = document.getElementById('note-list');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalForm = document.getElementById('modal-form');
const formContent = document.getElementById('form-content');
const modalEditId = document.getElementById('modal-edit-id');
const modalType = document.getElementById('modal-type');
const closeModalButton = document.getElementById('close-modal');
const deleteButton = document.getElementById('modal-delete');

const updateTime = () => {
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    timeDisplay.textContent = now.toLocaleTimeString('id-ID', timeOptions).replace(/\./g, ':');
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('id-ID', dateOptions);
};

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) reject(new Error("Geolocation tidak didukung oleh browser."));
        else navigator.geolocation.getCurrentPosition(
            pos => resolve(pos.coords),
            err => reject(new Error(`Gagal mendapatkan lokasi: ${err.message}`))
        );
    });
};

const fetchWeather = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        renderWeather(data.current_weather);
    } catch (e) {
        weatherDisplay.innerHTML = `<p class="text-red-400">${e.message}</p>`;
    }
};

const getWeatherInfo = (code) => {
    const map = {
        0: { icon: 'sun', text: 'Cerah' },
        1: { icon: 'sun', text: 'Cerah Berawan' },
        2: { icon: 'cloud', text: 'Berawan' },
        3: { icon: 'cloud', text: 'Sangat Berawan' },
        61: { icon: 'cloud-rain', text: 'Hujan Ringan' },
        63: { icon: 'cloud-rain', text: 'Hujan' },
        65: { icon: 'cloud-rain', text: 'Hujan Lebat' },
    };
    return map[code] || { icon: 'help-circle', text: 'Tidak Diketahui' };
};

const renderWeather = (weather) => {
    const info = getWeatherInfo(weather.weathercode);
    weatherDisplay.innerHTML = `
        <div class="flex items-center space-x-4">
            <i data-feather="${info.icon}" class="w-16 h-16 text-blue-400"></i>
            <div>
                <p class="text-4xl font-bold">${weather.temperature}°C</p>
                <p class="text-lg text-gray-300">${info.text}</p>
                <p class="text-sm text-gray-400">Angin: ${weather.windspeed} km/j</p>
            </div>
        </div>
    `;
    feather.replace();
};

const renderSchedules = () => {
    scheduleList.innerHTML = schedules.length
        ? schedules.map(s => `
            <div class="bg-gray-700 p-3 rounded-lg flex justify-between items-center group">
                <div>
                    <p class="font-semibold">${s.course}</p>
                    <p class="text-sm text-gray-300">${s.day}, ${s.time}</p>
                    <p class="text-sm text-gray-400">${s.room}</p>
                </div>
                <button class="edit-schedule-btn hidden group-hover:block" data-id="${s.id}">
                    <i data-feather="edit-2"></i>
                </button>
            </div>`).join('')
        : `<p class="text-gray-500 text-center italic mt-4">Belum ada jadwal.</p>`;
    feather.replace();
};

const renderTodos = () => {
    todoList.innerHTML = todos.length
        ? todos.map(t => `
            <div class="bg-gray-700 p-3 rounded-lg flex justify-between items-center group">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="toggle-todo-btn w-5 h-5" data-id="${t.id}" ${t.completed ? 'checked' : ''}>
                    <span class="${t.completed ? 'line-through text-gray-500' : ''}">${t.task}</span>
                </div>
                <button class="edit-todo-btn hidden group-hover:block" data-id="${t.id}">
                    <i data-feather="edit-2"></i>
                </button>
            </div>`).join('')
        : `<p class="text-gray-500 text-center italic mt-4">Tidak ada tugas.</p>`;
    feather.replace();
};

const renderNotes = () => {
    noteList.innerHTML = notes.length
        ? notes.map(n => `
            <div class="bg-gray-700 p-4 rounded-lg h-40 flex flex-col justify-between cursor-pointer hover:bg-gray-600 transition-colors" data-id="${n.id}">
                <div>
                    <h4 class="font-semibold mb-1 truncate">${n.title}</h4>
                    <p class="text-sm text-gray-300 line-clamp-4">${n.content.replace(/\n/g, '<br>')}</p>
                </div>
                <p class="text-xs text-gray-500">${new Date(n.id).toLocaleDateString('id-ID')}</p>
            </div>`).join('')
        : `<p class="text-gray-500 text-center italic mt-4">Belum ada catatan.</p>`;
};

const createFormField = (id, label, type = 'text', value = '', required = true) => {
    const cls = "w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none";
    if (type === 'textarea') {
        return `<div><label>${label}</label><textarea id="${id}" class="${cls}" rows="4">${value}</textarea></div>`;
    }
    return `<div><label>${label}</label><input id="${id}" type="${type}" class="${cls}" value="${value}"></div>`;
};

const openModal = (type, item = null) => {
    modal.classList.remove('hidden');
    modal.classList.add('visible');
    modalType.value = type;
    modalEditId.value = item ? item.id : '';
    deleteButton.classList.toggle('hidden', !item);

    if (type === 'schedule') {
        modalTitle.textContent = item ? 'Edit Jadwal' : 'Tambah Jadwal';
        formContent.innerHTML = `
            ${createFormField('course', 'Mata Kuliah', 'text', item?.course || '')}
            ${createFormField('day', 'Hari', 'text', item?.day || '')}
            ${createFormField('time', 'Waktu', 'text', item?.time || '')}
            ${createFormField('room', 'Ruangan', 'text', item?.room || '')}
        `;
    } else if (type === 'todo') {
        modalTitle.textContent = item ? 'Edit Tugas' : 'Tambah Tugas';
        formContent.innerHTML = `${createFormField('task', 'Tugas', 'text', item?.task || '')}`;
    } else if (type === 'note') {
        modalTitle.textContent = item ? 'Edit Catatan' : 'Tambah Catatan';
        formContent.innerHTML = `
            ${createFormField('title', 'Judul', 'text', item?.title || '')}
            ${createFormField('content', 'Isi', 'textarea', item?.content || '')}
        `;
    }
    feather.replace();
};

const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('visible');
    modalForm.reset();
};

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = modalType.value;
    const id = modalEditId.value;

    if (type === 'schedule') {
        const newItem = {
            id: id || Date.now(),
            course: document.getElementById('course').value,
            day: document.getElementById('day').value,
            time: document.getElementById('time').value,
            room: document.getElementById('room').value
        };
        if (id) schedules = schedules.map(s => s.id == id ? newItem : s);
        else schedules.push(newItem);
        storage.setItem('schedules', schedules);
        renderSchedules();

    } else if (type === 'todo') {
        const newItem = {
            id: id || Date.now(),
            task: document.getElementById('task').value,
            completed: false
        };
        if (id) todos = todos.map(t => t.id == id ? newItem : t);
        else todos.push(newItem);
        storage.setItem('todos', todos);
        renderTodos();

    } else if (type === 'note') {
        const newItem = {
            id: id || Date.now(),
            title: document.getElementById('title').value,
            content: document.getElementById('content').value
        };
        if (id) notes = notes.map(n => n.id == id ? newItem : n);
        else notes.push(newItem);
        storage.setItem('notes', notes);
        renderNotes();
    }

    closeModal();
});

deleteButton.addEventListener('click', () => {
    const type = modalType.value;
    const id = modalEditId.value;
    if (type === 'schedule') {
        schedules = schedules.filter(s => s.id != id);
        storage.setItem('schedules', schedules);
        renderSchedules();
    } else if (type === 'todo') {
        todos = todos.filter(t => t.id != id);
        storage.setItem('todos', todos);
        renderTodos();
    } else if (type === 'note') {
        notes = notes.filter(n => n.id != id);
        storage.setItem('notes', notes);
        renderNotes();
    }
    closeModal();
});

closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

document.getElementById('add-schedule').addEventListener('click', () => openModal('schedule'));
document.getElementById('add-todo').addEventListener('click', () => openModal('todo'));
document.getElementById('add-note').addEventListener('click', () => openModal('note'));

scheduleList.addEventListener('click', e => {
    if (e.target.closest('.edit-schedule-btn')) {
        const id = e.target.closest('.edit-schedule-btn').dataset.id;
        const item = schedules.find(s => s.id == id);
        openModal('schedule', item);
    }
});

todoList.addEventListener('click', e => {
    const editBtn = e.target.closest('.edit-todo-btn');
    const checkbox = e.target.closest('.toggle-todo-btn');
    if (editBtn) {
        const id = editBtn.dataset.id;
        const item = todos.find(t => t.id == id);
        openModal('todo', item);
    } else if (checkbox) {
        const id = checkbox.dataset.id;
        todos = todos.map(t => t.id == id ? { ...t, completed: !t.completed } : t);
        storage.setItem('todos', todos);
        renderTodos();
    }
});

noteList.addEventListener('click', e => {
    const card = e.target.closest('[data-id]');
    if (card) {
        const id = card.dataset.id;
        const item = notes.find(n => n.id == id);
        openModal('note', item);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    renderSchedules();
    renderTodos();
    renderNotes();

    getUserLocation()
        .then(coords => fetchWeather(coords.latitude, coords.longitude))
        .catch(() => fetchWeather(-6.2088, 106.8456));

    feather.replace();
});
