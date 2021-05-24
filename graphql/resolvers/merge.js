const DataLoader = require('dataloader');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');

const userLoader = new DataLoader(userIds => {
  return users(userIds);
});


const user = async userIds => {
  try {
    const user = await User.find({ _id: { $in: userIds } });
    users.sort((a, b) => {
      return (
        userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
      );
    });
    return user.map(singleUser => {
      return transformUser(singleUser);
    });
  } catch (err) {
    throw err;
  }
};


const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return user;
  } catch (err) {
    throw err;
  }
};


const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    name: user.name,
  };
};



exports.transformUser = transformUser;
