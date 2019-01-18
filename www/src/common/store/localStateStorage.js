import immutable from 'immutable';

export const saveGlobalState = (state) => {

  try {    
    const currentState = state.toObject();
    let currentStateObj = {};
   
    Object.entries(currentState).map((values, key) => {      
      if (values[1] instanceof immutable.Map ) {
        const valueFromMap = values[1].toObject();
        currentStateObj[values[0]] = JSON.stringify(valueFromMap);
      }
    })
    
    localStorage.setItem('__state', JSON.stringify(currentStateObj));
  } catch (error) {
    console.log(error);
  }

}