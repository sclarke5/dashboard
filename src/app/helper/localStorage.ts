export const loadState = (type: string) => {
  try {
    const serializedState = type === 'settings' ? localStorage.getItem('settings') : localStorage.getItem('projects');
    if(serializedState === null) {
      return undefined;
    } 

    return JSON.parse(serializedState);

  } catch(err) {
    return undefined;
  }
}

export const saveState = (type: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    if(type === 'settings') {
      localStorage.setItem('settings', serializedState);
    } else {
      localStorage.setItem('projects', serializedState);
    }
  } catch(err) {
    console.log('error: ', err);
  }
}