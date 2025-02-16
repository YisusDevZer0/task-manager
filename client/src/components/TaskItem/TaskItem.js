import React from 'react';
import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => {
  return (
    <div className={styles.taskItem}>
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <span className={`${styles.taskStatus} ${styles[`status${task.status}`]}`}>
          {task.status}
        </span>
      </div>
      <p>{task.description}</p>
      <div className={styles.taskActions}>
        <button className={styles.editButton}>Editar</button>
        <button className={styles.deleteButton}>Eliminar</button>
      </div>
    </div>
  );
};

export default TaskItem;