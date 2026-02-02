const AUTH_URL = 'http://localhost:3001/api/auth';
const TASKS_URL = 'http://localhost:3001/api/tasks';

export const api = {
    signup: async (name: string, email: string, password: string) => {
        const response = await fetch(`${AUTH_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');
        return data;
    },

    login: async (email: string, password: string) => {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        return data;
    },

    logout: async (token: string) => {
        const response = await fetch(`${AUTH_URL}/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        return response.json();
    },

    // TASKS
    getTasks: async (token: string) => {
        const response = await fetch(`${TASKS_URL}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    createTask: async (token: string, task: any) => {
        const response = await fetch(`${TASKS_URL}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        return response.json();
    },

    updateTask: async (token: string, id: string, task: any) => {
        const response = await fetch(`${TASKS_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        return response.json();
    },

    deleteTask: async (token: string, id: string) => {
        const response = await fetch(`${TASKS_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    getUser: async (token: string) => {
        const response = await fetch(`${AUTH_URL}/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }
};
