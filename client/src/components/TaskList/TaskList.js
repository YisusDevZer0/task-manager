import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, addTask, updateTask } from '../../features/tasks/taskSlice';
import DataTable from 'react-data-table-component';

import Swal from 'sweetalert2';
import styles from './TaskList.module.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.tasks);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: '' });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === 'loading') return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Verifica que items sea un array
  const safeItems = Array.isArray(items) ? items : [];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente':
        return styles.statusPendiente;
      case 'En Progreso':
        return styles.statusEnProgreso;
      case 'Completada':
        return styles.statusCompletada;
      default:
        return '';
    }
  };

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentTask({ title: '', description: '', status: '' });
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setIsEdit(true);
    setCurrentTask({ 
      _id: task._id, 
      title: task.title, 
      description: task.description,
      status: task.status 
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!currentTask.title || !currentTask.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos requeridos.',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    const taskData = {
      _id: currentTask._id,
      title: currentTask.title,
      description: currentTask.description,
      status: currentTask.status,
    };

    if (isEdit) {
      dispatch(updateTask(taskData))
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea actualizada con éxito!',
            confirmButtonText: 'Cerrar',
          });
          setModalOpen(false);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar la tarea',
            text: error.message,
            confirmButtonText: 'Cerrar',
          });
        });
    } else {
      dispatch(addTask(taskData))
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea agregada con éxito!',
            confirmButtonText: 'Cerrar',
          });
          setModalOpen(false);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear la tarea',
            text: error.message,
            confirmButtonText: 'Cerrar',
          });
        });
    }
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId))
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Tarea eliminada con éxito!',
          confirmButtonText: 'Cerrar',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar la tarea',
          text: error.message,
          confirmButtonText: 'Cerrar',
        });
      });
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
      cell: row => <span>{row._id}</span>,
    },
    {
      name: 'Título',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: (row) => (
        <span className={getStatusClass(row.status)}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <button
            onClick={() => handleEdit(row)}
            className={styles.editButton}
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className={styles.deleteButton}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className={styles.header}>Lista de tareas</h2>

      <button className={styles.addButton} onClick={handleAdd}>
        Añadir nueva tarea
      </button>

      <DataTable
        columns={columns}
        data={safeItems} 
        pagination
        highlightOnHover
        pointerOnHover
        className="table"
      />

      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{isEdit ? 'Editar Tarea' : 'Añadir Nueva Tarea'}</h3>
            <label>Título:</label>
            <input
              type="text"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
            <label>Descripción:</label>
            <textarea
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
            <label>Status:</label>
            <select
              value={currentTask.status}
              onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
            >
              <option value="">Seleccionar...</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
            <div>
              <button onClick={handleSave} className={styles.saveButton}>Guardar</button>
              <button onClick={() => setModalOpen(false)} className={styles.closeButton}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;