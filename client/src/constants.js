export const ENDPOINT = "http://localhost:9000/" 
export const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.status,
    Completed: (task) => task.status,
  };