import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// after dispatched from App.js, will handle the posts
// initial state of posts is an empty array, hence []
// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
            // update only the latest update post from the posts array, otherwise post without any update
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            // Redux expects that all state updates are done immutably
            // make a copy of the state first, then update the copy with the new value
            return [...posts, action.payload];        
        default:
            return posts;
    }
}

// const reducer = (state = [], action) => {
//     switch (action.type) {
//         case 'FETCH_ALL':
//             return state;
//         case 'CREATE':
//             return state;        
//         default:
//             return state;
//     }
// }