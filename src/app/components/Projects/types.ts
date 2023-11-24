import React, { Dispatch, SetStateAction } from "react";

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
  data: ProjectData;
  setData: Dispatch<SetStateAction<ProjectData>>;
  addTask: (column: ColumnProps) => void;
}

export type TaskComponentProps = {
  task: TaskProps;
  index: number;
  data: ProjectData;
  setData: Dispatch<SetStateAction<ProjectData>>;
  removeTask: (task: TaskProps) => void;
}

export type EditTaskProps = {
  task?: TaskProps;
  currentColumn?: ColumnProps | null; 
  toggleDrawer: () => void;
  data: ProjectData;
  setData: Dispatch<SetStateAction<ProjectData>>;
}

export type ProjectData = {
  id?: number;
  tasks: {
    [key: string]: TaskProps;
  }
  columns: {
    [key: string]: ColumnProps;
  }
  columnOrder: string[];
  archivedTasks: {
    [key: string]: TaskProps;
  }
  archivedColumns: {
    [key: string]: ColumnProps;
  }
  projectType: string | null;
  name: string;
}

export type UserData = {
  id: number;
  name: string;
  email: string;
}