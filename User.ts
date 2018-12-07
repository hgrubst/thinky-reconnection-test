import thinky from './thinky';

export const User = thinky.createModel('User', {
    firstName: String,
    lastName: String
})
