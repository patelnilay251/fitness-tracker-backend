import User from '../models/user.js'

export const save = async (newUser) => {
    const user = new User(newUser);
    return user.save();
};


export const update = async (id, updatedUser) => {
    const user = User.
        findByIdAndUpdate(id, updatedUser, { new: true })
        .exec();
    return user;
};


export const get = async (id) => {
    const user = User
        .findById(id)
        .exec();
    return user;
};


export const remove = async (id) => {
    const user = User
        .findByIdAndDelete(id)
        .exec();
    return user;
}


export const search = async (params) => {
    const user = User.find(params)
        .exec();
    return user;
}

// export const login = async (params) => {

// }