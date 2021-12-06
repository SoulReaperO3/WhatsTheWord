import psycopg2 as pg

class Database:
    conn = None
    def __init__(self, database, user, password, host, port):
        self.conn = pg.connect(database = "whatsTheWord", user = "postgres", password = "pass123", host = "127.0.0.1", port = "5432")
        self.createTables()

    def createTables(self):
        cur = self.conn.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS USERS(userName VARCHAR(50) PRIMARY KEY NOT NULL, password VARCHAR(50) NOT NULL,\
             emailID VARCHAR(50) NOT NULL, mobileNumber NUMERIC NOT NULL)")
        cur.execute("CREATE TABLE IF NOT EXISTS SCORES(userNAME VARCHAR(50) NOT NULL,\
             SCORE NUMERIC NOT NULL DEFAULT 0, CONSTRAINT fk_scores FOREIGN KEY(userNAME) REFERENCES USERS (userNAME))")
        cur.execute("CREATE TABLE IF NOT EXISTS QUESTIONS(image BLOB NOT NULL PRIMARY KEY, answer VARCHAR(200) NOT NULL, difficulty INT NOT NULL)")
        self.conn.commit()
        cur.close()

    def authenticateUser(self, userName, password):
        cur = self.conn.cursor()
        cur.execute("SELECT password from USERS WHERE userName = %s", userName)
        passwordFromDB = cur.fetchone()
        cur.close()
        if passwordFromDB[0] == password:
            return True
        else:
            return False

    def userRegister(self, userName, password, emailID, mobileNumber):
        cur = self.conn.cursor()
        cur.execute("INSERT INTO USERS(userName, password, emailID, mobileNumber) VALUES (%s, %s, %s, %s)", userName, password, emailID, mobileNumber)
        self.conn.commit()
        cur.close()
