// ==========================================
// CLASE TASKMANAGER (Gestor de Tareas)
// ==========================================

class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 0;
    }

    addTask(asignado, nombre, estado, fecha) {
        this.currentId++;

        const nuevaTarea = {
            id: this.currentId,
            asignadoA: asignado,
            nombre: nombre,
            estado: estado,
            fechaDeEntrega: fecha
        };

        this.tasks.push(nuevaTarea);
        return nuevaTarea;
    }

    getAllTasks() {
        return this.tasks;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}