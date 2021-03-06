const appSocket = require('../../app');
// const directSocket = require('../../app');
const socket = require('../../app');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
// const moment = require('moment');
const moment = require('moment-timezone');
const { pocketVariables } = require('../../helpers/pocketVars');
const { adminSocket } = require('../../middleware/adminSocket');

module.exports = {
  login: async ({ username, password }) => {
    console.log("Resolver: Login...");
    // console.log('directSocket',directSocket);
    // console.log('appSocket.appSocket.io',appSocket.appSocket.io);
    // appSocket.appSocket.io.to('admin_channel').emit('admin_msg', {msg: '...login...'})
    // if (appSocket.appSocket.socket !== 'xxx') {
    //   console.log('connected to ');
      appSocket.appSocket.log('...login...')
    // }
    const user = await User.findOne({ 'username': username });
    if (!user) {
      // throw new Error('User does not exist!');
      console.log('User does not exist!');
      return{
        activityId: 0,
        role:"",
        token:"",
        tokenExpiration:0 ,
        error: 'User does not exist!'
      }
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return{
        activityId: 0,
        role:"",
        token:"",
        tokenExpiration:0 ,
        error: 'Password is incorrect!'
      }
    }

    if (user.verification.verified !== true) {

      console.log('Please  verify user 1st!');
      return{
        activityId:user.id,
        role:"",
        token:"",
        tokenExpiration:0 ,
        error: 'Please  verify user 1st!'}
    }
    const token = jwt.sign({ userId: user.id },process.env.JWT_TOKEN,{expiresIn: '4h'});

    const userLoggedIn = await User.findOneAndUpdate({_id: user.id},{loggedIn: true},{new: true, useFindAndModify: false})

    const userAttendance = user.attendance.map(x=> x = {
      date: moment(x.date).tz("America/Bogota").add(1, 'days').format('YYYY-MM-DD'),
      status: x.status
    })
    const userAttendance2 = user.attendance.map(x=> x= {
      date: x.date,
      status: x.status
    })
    const userAttendance3 = user.attendance.map(x=> x= {
      date: moment(x.date).toDate(),
      status: x.status
    })
    // console.log('today', moment());
    // console.log('foo',userAttendance);
    // console.log('foo2',userAttendance2);
    // console.log('foo2',userAttendance3);
    // console.log('loof',moment().tz("America/Bogota").format('YYYY-MM-DD'));

    const userAttendanceToday = userAttendance.filter(x => x.date === moment().tz("America/Bogota").format('YYYY-MM-DD'))

    if (userAttendanceToday.length <= 0) {
      console.log('no attendance found...');
      const attendance = {
        date: moment().tz("America/Bogota").format('YYYY-MM-DD'),
        status: 'present',
        description: 'login auto attendance',
        highlighted: false,
      };

      const user2 = await User.findOneAndUpdate(
        {_id:user._id},
        {$addToSet: {attendance: attendance}},
        {new: true, useFindAndModify: false}
      )

    } else {
      console.log('...attendance found...');
    }

    return {
      activityId: userLoggedIn.id,
      role: userLoggedIn.role,
      token: token,
      tokenExpiration: 4
    };
  },
  logout: async (args) => {
    console.log("Resolver: Logout...");
    const userLogout = await User.findOneAndUpdate({ _id: args.activityId },{loggedIn: false, clientConnected: false},{new: true, useFindAndModify: false});

    return {
      ...userLogout._doc,
      _id: userLogout.id,
      email: userLogout.contact.email ,
      name: userLogout.name,
    };
  },
  verifyInvitation: async (args) => {
    console.log("Resolver: verifyInvitation...");
    try {
      const challenge = args.challenge;
      let result;

      const preResponses = process.env.INVITECODES;
      let responses = preResponses.split(",");

      if (responses.includes(challenge)) {
        console.log('...code accecpted proceed to sign up...');
        result = 'matched';
      } else {
        console.log('...no match! check you invite code and try again...');
        result = 'noMatch'

      }

      return result;

    } catch (err) {
      throw err;
    }
  },
};
