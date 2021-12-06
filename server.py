from flask import Flask, request
from businessLogic import BusinessLogic

app = Flask(__name__)

db = None
userDetails = {"userName": None, "emailID": None, "score": None}
dbDetails = {"database": "whatsTheWord", "user": "postgres",
             "password": "123", "host": "localhost", "port": "5432"}


@app.route("/")
def homePage():
    pass


@app.route("/signUP", methods=['POST'])
def userSignUP():
    request_data = request.get_json()
    print(request_data)
    userName = None
    password = None
    emailID = None
    mobileNumber = None
    response = None

    if request_data:
        if "userName" in request_data:
            userName = request_data["userName"]
        if "password" in request_data:
            password = request_data["password"]
        if "emailID" in request_data:
            emailID = request_data["emailID"]
        if "mobileNumber" in request_data:
            mobileNumber = request_data["mobileNumber"]

    if userName and password and emailID and mobileNumber:
        response = bl.userRegister(userName, password, emailID, mobileNumber)

    if response:
        print("Registered Successfully")


@app.route("/logIn", methods=['POST'])
def userLogIn():
    request_data = request.get_json()
    print(request_data)
    userName = None
    password = None
    response = None
    if request_data:
        if "userName" in request_data:
            userName = request_data["userName"]
        if "password" in request_data:
            password = request_data["password"]
    if userName and password:
        response = bl.loginUser(userName, password)
    if response:
        bl.updateUserDetails(userName)
        print("Logged in Successfully")


if __name__ == '__main__':
    bl = BusinessLogic(userDetails, dbDetails)
    app.run()
