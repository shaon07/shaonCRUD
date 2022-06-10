import { ADD_API, DELETE_API, GET_API, UPDATE_API } from "../constant/apiConstant";

const initData = {
  posts: [],
};

const postReducer = (state = initData, action) => {
  switch (action.type) {
    case GET_API:
      return {
        posts: action.payload,
      };
    case DELETE_API:
      return {
        posts: action.payload,
      };
    case ADD_API:
      return {
        posts: [...state.posts, action.payload],
      };
    
    case UPDATE_API:
        // console.log(action.payload);
        console.log(state.posts);
        const findPost = action.payload.id -1;
        // delete state.posts[findPost];
        const newData = state.posts[findPost]=action.payload;
        // console.log([...state.posts,newData]);
        
        return {
            
            posts:[...state.posts]
        }

    default:
      return state;
  }
};

export default postReducer;
