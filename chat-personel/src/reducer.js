//L'état initial de la db, avant que l'on ajoute quelque chose à ça,
//ou avant qu'on commence. On va commencer avec un USER "NULL" au départ.

export const initialState = {
   user: null,
};

export const actionTypes = {
   SET_USER: "SET_USER",
};

const reducer = (state, action) => {
   console.log(action);
   switch (action.type) {
      case actionTypes.SET_USER:
         return {...state, 
            user: action.user,  
         };

      default:  
         return state;
   }
};

export default reducer;

