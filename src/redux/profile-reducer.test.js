import profileReducer, {addPostActionCreator} from "./profile-reducer"

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'Its ny first post', likesCount: 11},
    ],
}

test('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra.com');

    // 2.action
    let newState = profileReducer(state, action);

    // 3.expectation

    expect( newState.posts.length === 2).toBe(2)
});

test('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra.com');

    // 2.action
    let newState = profileReducer(state, action);

    // 3.expectation

    expect( newState.posts[3].message).toBe('it-kamasutra.com')
});
