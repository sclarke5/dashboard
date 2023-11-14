export const loadState = (type: string) => {
  try {
    let serializedState;
    if(type === 'settings') {
      serializedState = localStorage.getItem('settings')
    } else if (type === 'projects'){
      serializedState = localStorage.getItem('projects');
    } else if (type === 'theme') {
      serializedState = localStorage.getItem('theme');
    } 

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
    } else if (type === 'projects') {
      localStorage.setItem('projects', serializedState);
    } else if (type === 'theme') {
      localStorage.setItem('theme', serializedState);
    }
  } catch(err) {
    console.log('error: ', err);
  }
}