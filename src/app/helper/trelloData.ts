 export const trelloData = {

  strict: {
    name: 'New Strict Project',
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch TV' },
      'task-3': { id: 'task-3', content: 'Charge me phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To Do',
        taskIds: ['task-1', 'task-2', 'task-3'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: ['task-4'],
      },
      'column-3': {
        id: 'column-3',
        title: 'Review',
        taskIds: [],
      },
      'column-4': {
        id: 'column-4',
        title: 'Done',
        taskIds: [],
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
    archivedColumns: {},
    archivedTasks: {},
    projectType: null
  },
  casual: {
    name: 'New Casual Project',
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Buy groceries' },
      'task-3': { id: 'task-3', content: 'Cook dinner' },
      'task-4': { id: 'task-4', content: '1 lb Ground beef' },
      'task-5': { id: 'task-5', content: 'Michael Scott: (416) 844:7777'}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Chores',
        taskIds: ['task-1', 'task-2', 'task-3'],
      },
      'column-2': {
        id: 'column-2',
        title: 'Shopping',
        taskIds: ['task-4'],
      },
      'column-3': {
        id: 'column-3',
        title: 'Contacts',
        taskIds: ['task-5'],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
    archivedColumns: {},
    archivedTasks: {},
    projectType: null
  }
 }