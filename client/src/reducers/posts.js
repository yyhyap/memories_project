// after dispatched from App.js, will handle the posts
// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
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