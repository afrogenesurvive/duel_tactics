
const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type User {
    _id: ID!
    password: String
    title: String
    name: String
    role: String
    username: String
    registrationNumber: String
    employmentDate: String
    dob: String
    age: Int
    gender: String
    contact: Contact
    addresses: [Address]
    loggedIn: Boolean
    clientConnected: Boolean
    verification: Verification
    attendance: [UserAttendance]
    leave: [UserLeave]
    images: [Image]
    files: [File]
    notes: [String]
    appointments: [Appointment]
    visits: [Visit]
    reminders: [Reminder]
    activity: [Activity]
  }


  input UserInput {
    password: String
    title: String
    name: String
    role: String
    username: String
    registrationNumber: String
    employmentDate: String
    dob: String
    age: Int
    gender: String
    contactPhone: String
    contactPhone2: String
    contactEmail: String
    addressNumber: Int
    addressStreet: String
    addressTown: String
    addressCity: String
    addressParish: String
    addressCountry: String
    addressPostalCode: String
    addressPrimary: Boolean
    loggedIn: Boolean
    clientConnected: Boolean
    verificationVerified: Boolean
    verificationType: String
    verificationCode: String
    attendanceDate: String
    attendanceStatus: String
    attendanceDescription: String
    attendanceHighlighted: Boolean
    leaveType: String
    leaveStartDate: String
    leaveEndDate: String
    leaveDescription: String
    leaveHighlighted: Boolean
    imageName: String
    imageType: String
    imagePath: String
    imageHighlighted: Boolean
    fileName: String
    fileType: String
    filePath: String
    fileHighlighted: Boolean
    notes: String
    note: String
    activityDate: String
    activityRequest: String
  }


  type Activity {
    date: String
    request: String
  }
  type AuthData {
    activityId: ID!
    role: String!
    token: String
    tokenExpiration: Int!
    error: String
  }
  type TestMail {
    test: String
  }

  type RootQuery {

    getPocketVars(activityId: ID!): String

    verifyInvitation(challenge: String!): String

    login(username: String!, password: String!): AuthData!
    logout( activityId: ID!): User!
    getThisUser(activityId: ID!): User

    getAllUsers(activityId: ID!): [User]
    getUserById(activityId: ID!, userId: ID!): User
    getUsersByField(activityId: ID!, field: String!, query: String!): [User]
    getUsersByFieldRegex(activityId: ID!, field: String!, query: String!): [User]
    getUsersByAppointment(activityId: ID!, appointmentId: ID!): [User]


  }

  type RootMutation {

    createUser(userInput: UserInput!): User
    updateUserAllFields(activityId: ID!, userId: ID!, userInput: UserInput!): User
    updateUserSingleField(activityId: ID!, userId: ID!, field: String!, query: String!): User

    addUserAddress(activityId: ID!, userId: ID!, userInput: UserInput!): User
    setUserAddressPrimary(activityId: ID!, userId: ID!, userInput: UserInput!): User
    updateUserAddress(activityId: ID!, userId: ID!, userInput: UserInput!, userInput2: UserInput!): User

    addUserAttendance(activityId: ID!, userId: ID!, userInput: UserInput!): User
    toggleUserAttendanceHighlighted(activityId: ID!, userId: ID!, userInput: UserInput!): User
    updateUserAttendance(activityId: ID!, userId: ID!, userInput: UserInput!, userInput2: UserInput!): User

    addUserLeave(activityId: ID!, userId: ID!, userInput: UserInput!): User
    toggleUserLeaveHighlighted(activityId: ID!, userId: ID!, userInput: UserInput!): User
    updateUserLeave(activityId: ID!, userId: ID!, userInput: UserInput!, userInput2: UserInput!): User

    addUserImage(activityId: ID!, userId: ID!, userInput: UserInput!): User
    toggleUserImageHighlighted(activityId: ID!, userId: ID!, userInput: UserInput!): User

    addUserFile(activityId: ID!, userId: ID!, userInput: UserInput!): User
    toggleUserFileHighlighted(activityId: ID!, userId: ID!, userInput: UserInput!): User

    addUserNotes(activityId: ID!, userId: ID!, userInput: UserInput!): User
    addUserReminder(activityId: ID!, userId: ID!, reminderId: ID!): User
    addUserActivity(activityId: ID!, userId: ID!, userInput: UserInput!): User
    addUserAppointment(activityId: ID!, userId: ID!, appointmentId: ID!): User

    deleteUserById(activityId: ID!, userId: ID!): User
    deleteUserAddress(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserAttendance(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserLeave(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserImage(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserFile(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserNote(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserReminder(activityId: ID!, userId: ID!, reminderId: ID!): User

    requestPasswordReset(userInput: UserInput! ): User
    resetUserPassword(userId: ID!, userInput: UserInput!):User
    verifyUser( userInput: UserInput!): User
    userOnline(activityId: ID!, userId: ID! ): User
    userOffline(activityId: ID!, userId: ID! ): User

  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
