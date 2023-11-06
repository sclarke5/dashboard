export type TaskProps = {
  id: string;
  content: string;
}

export type ColumnProps = {
  id: string;
  title: string;
  taskIds: string[];
}

export type ColumnComponentProps = {
  column: ColumnProps;
  tasks: TaskProps[];
  disabledFlag: boolean;
  index: number;
}

export type TaskComponentProps = {
  task: TaskProps;
  index: number;
}

export type ProjectData = {
  tasks: {
    [key: string]: TaskProps;
  }
  columns: {
    [key: string]: ColumnProps;
  }
  columnOrder: string[]
}