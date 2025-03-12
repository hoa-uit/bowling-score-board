export const retrieveData = (id: string) => {
  return JSON.parse(localStorage.getItem(id) || 'null');
};

export const saveData = (id: string, data: any) => {
  localStorage.setItem(id, JSON.stringify(data));
};
