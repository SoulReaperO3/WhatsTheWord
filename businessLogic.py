from database import Database

class BusinessLogic:
    userDetails = None
    db = None
    def __init__(self, userDetails, dbDetails):
        self.userDetails = userDetails
        self.db = Database(dbDetails["database"], dbDetails["user"], dbDetails["password"], dbDetails["host"], dbDetails["port"])

    def updateUserDetails(self, userName, emailID = None, score = None):
        self.userDetails["userName"] = userName
        if emailID:
            self.userDetails["emailID"] = emailID
        if score:
            self.userDetails["score"] = score

    def fetchUserDetails(self):
        pass

    def loginUser(self, userName, password):
        response = self.db.authenticateUser(userName, password)

    def userRegister(self, userName, password, emailID, mobileNumber):
        response = self.db.userRegister(userName, password, emailID, mobileNumber)
