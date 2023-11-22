export const loadState = (type: string) => {
  try {
    let serializedState;
    if(type === 'theme') {
      serializedState = localStorage.getItem('theme');
    } 

    if(serializedState === null || serializedState === undefined) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }

  } catch(err) {
    return undefined;
  }
}

export const saveState = (type: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    if(type === 'theme') {
      localStorage.setItem('theme', serializedState);
    }
  } catch(err) {
    console.log('error: ', err);
  }
}