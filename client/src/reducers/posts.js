import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

// after dispatched from App.js, will handle the posts
// initial state of posts is an empty array, hence []
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case UPDATE:
            // update only the latest update post from the posts array, otherwise post without any update
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            // Redux expects that all state updates are done immutably
            // make a copy of the state first, then update the copy with the new value
            return { ...state, posts: [...state.posts, action.payload] };        
        default:
            return state;
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