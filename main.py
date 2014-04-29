#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import re
import time
import datetime
import cgi
import jinja2
import webapp2

from gaesessions import get_current_session
from google.appengine.ext import db


def getRandomString(length):
    # TODO get random string
    # TODO return string
    return ""


def getRandomKey():
    # TODO get random key using the previous method
    # TODO return key if doesn't exist in the db using SELECT statement
    return ""


def getRandomPassword():
    # TODO get random password and return it
    return ""


#def getRegistrationDate():
#    # TODO returns current date and time
#    return time()


'''
On user creation you must initialize user's username, user's first name.
We initialize password and notification key by using the functions:
getRandomKey and getRandomPassword that are found above.
'''
class User(db.Model):
    username = db.StringProperty(required=True)
    firstName = db.StringProperty(required=True)
    secondName = db.StringProperty()
    classString = db.StringProperty()
    school = db.StringProperty()
    email = db.StringProperty()
    gender = db.StringProperty()
    coins = db.IntegerProperty(default=0)
    notificationKey = db.StringProperty(default=getRandomKey())
    password = db.StringProperty(default=getRandomPassword())
    groupId = db.StringProperty()
    #registrationDate = db.TimeProperty(default=getRegistrationDate())
    def __str__(self):
        return str(self.username) + "#" + str(self.firstName)\
                + "#" + str(self.secondName) + "#" + str(self.classString)\
                + "#" + str(self.school) + "#" + str(self.email)\
                + "#" + str(self.gender)

    @staticmethod
    def getFictiveUser():
        return User(username='bob123', firstName='bob', secondName='pop',\
            classString='12a', school='bar-ilan', email='bob@gmail.com',\
            gender='male', password='123456', notifyKey='h3hGFeefeE33gf4eu7fbv4vr')


class Level(db.Model):
    username = db.StringProperty()
    path = db.StringProperty(default='torah')
    level = db.IntegerProperty()
    score = db.IntegerProperty()


JINJA_ENVIRONMENT = jinja2.Environment(
          loader=jinja2.FileSystemLoader(os.path.join(
          os.path.dirname(__file__), 'templates')),
          extensions=['jinja2.ext.autoescape'],
          autoescape=True)
EMAIL_REGEX = re.compile("[^@]+@[^@]+\.[^@]+")


class LoginHandler(webapp2.RedirectHandler):
    def get(self):
        # show login page using templates
        session = get_current_session()
        message = session.get('message', '')
        username = session.get('login-username', '')
        name = session.get('name', '')
        template_values = {'message': message, 'username': username, 'name': name}
        template = JINJA_ENVIRONMENT.get_template('login.html')
        self.response.write(template.render(template_values))
        session['message'] = ''

    def post(self):
        if self.request.get('submit'):
            # remove old information
            session = get_current_session()
            session['login-username'] = ''
            # get info from user
            username = self.request.get('username')
            password = self.request.get('password')
            # check if user exist in the DB
            user = db.GqlQuery("SELECT * FROM User WHERE "+\
                               "username='"+username+"'"+\
                               " and password='" + password + "'").get()
            if user is not None:
                # save info in session object
                session['username'] = user.username
                session['name'] = user.firstName
                session['isAdmin'] = False
                session['message'] = ''
                # redirect to the same page
                self.redirect("/play/")
            else:
                session['login-username'] = username
                session['message'] = 'username or password are incorrect'
                # redirect to the same page
                self.redirect("/login/")


class LogoutHandler(webapp2.RedirectHandler):
    def get(self):
        session = get_current_session()
        name = session.get('name', '')
        if name != '':
            session['username'] = ''
            session['name'] = ''
            session['isAdmin'] = ''
            session['message'] = ''
            self.response.write('bye bye ' + name + '<br>')
            self.response.write('<a href="/">return to main page</a>')
        else:
            self.redirect('/')


class RegisterHandler(webapp2.RequestHandler):
    def get(self):
        # TODO show registration page using templates
        pass

    def post(self):
        username = self.request.get('username') or ""
        firstName = self.request.get('firstName') or ""
        secondName = self.request.get('secondName') or ""
        classString = self.request.get('classString') or ""
        school = self.request.get('school') or ""
        email = self.request.get('email') or ""
        gender = self.request.get('gender') or ""
        groupId = self.request.get('groupId') or ""

        session = get_current_session()

        error = ""
        self.response.write("username: " + username + "<br>")
        self.response.write("gender: " + gender + "<br>")
        if username is "":
            error += "<li>username is missing</li>"
        elif len(username) < 6:
            error += "<li>username must contains at least 6 characters</li>"
        if firstName is "":
            error += "<li>first name is missing</li>"
        if secondName is "":
            error += "<li>second name is missing</li>"
        if classString is "":
            error += "<li>class is missing</li>"
        if school is "":
            error += "<li>school is missing</li>"
        if email is "":
            error += "<li>email is missing</li>"
        elif not EMAIL_REGEX.match(email):
            error += "<li>email address incorrect</li>"
        if gender is "":
            error += "<li>gender is missing</li>"
        elif gender not in ["male", "female"]:
            error += "<li>gender is undefined properly</li>"
        if groupId is "":
            error += "<li>group id is missing</li>"
        if error is "":
            # check if username is unique
            result = db.GqlQuery("SELECT * from User WHERE username='" + username + "'").get()
            if result is not None:
                error += "<li>username already exists</li>"
            result = db.GqlQuery("SELECT * from User WHERE email='" + email + "'").get()
            if result is not None:
                error += "<li>email address already exists</li>"
        if error is not "":
            session['message'] = error
            session['register_username'] = username
            session['register_firstName'] = firstName
            session['register_secondName'] = secondName
            session['register_classString'] = classString
            session['register_school'] = school
            session['register_email'] = email
            session['register_gender'] = gender
            session['register_group_id'] = groupId
            self.redirect("/admin/")
            return
        user = User(username=username, firstName=firstName, secondName=secondName,
                    classString=classString, school=school, email=email, gender=gender,
                    groupId=groupId)
        session['message'] = '<li>write successfully</li>'
        user.put()
        session['message'] = '<li>user was added successfully</li>'
        self.redirect("/admin/")
        return


class EmailNotify(object):
    def __init__(self, sender, title, body):
        # TODO initialize self object
        pass

    def sendEmail(self, address):
        # TODO send an email to the given address
        pass


class UserVerificationNotify(EmailNotify):
    def __init__(self, user):
        # TODO get user verification key
        # TODO build email body and email title
        # TODO body contains verification link '~/verification?key=...'
        # TODO body contains user's username and password
        # TODO initialize EmailNotify class
        pass

    def sendEmail(self):
        # TODO send an email using EmailNotify method
        pass



TEST_EMAIL_ADDRESS = 'youremail@gmail.com' # put your mail here


class TestEmail(webapp2.RequestHandler):
    def get(self):
        option = self.request.get('op') or 0  # if option wasn't given it will be 0
        if option is 0:  # first test
            notify = EmailNotify("source@host.com", "hello", "body of the message")
            notify.sendEmail(TEST_EMAIL_ADDRESS)  # put your mail here
        if option is 1:  # second test
            user = User.getFictiveUser()
            user.email = TEST_EMAIL_ADDRESS
            notify = UserVerificationNotify(user)
            notify.sendEmail()


class NotifyKeyHandler(object):
    def get(self):
        # TODO get key from the url line "~/key=121324" using request.get
        # TODO find user with the given key
        # TODO update user's coins += 50
        # TODO set on user's verification key
        pass


class AdminHandler(webapp2.RequestHandler):
    def get(self):
        users = db.GqlQuery("SELECT * FROM User ORDER BY username, firstName, secondName").fetch(100)
        session = get_current_session()
        message = session.get('message', '')
        session = get_current_session()
        username = cgi.escape(session.get('register_username', ''), quote=True)
        firstName = cgi.escape(session.get('register_firstName', ''), quote=True)
        secondName = cgi.escape(session.get('register_secondName', ''), quote=True)
        classString = cgi.escape(session.get('register_classString', ''), quote=True)
        school = cgi.escape(session.get('register_school', ''), quote=True)
        email = cgi.escape(session.get('register_email', ''), quote=True)
        gender = cgi.escape(session.get('register_gender', ''), quote=True)
        groupId = cgi.escape(session.get('register_group_id', ''), quote=True)
        template_values = {'users': users, 'message': message, 'username': username,
                           'firstName': firstName, 'secondName': secondName,
                           'classString': classString, 'school': school,
                           'email': email, 'gender': gender, 'groupId': groupId}
        template = JINJA_ENVIRONMENT.get_template('admin.html')
        self.response.write(template.render(template_values))
        session['message'] = ""
        session['register_username'] = ""
        session['register_firstName'] = ""
        session['register_secondName'] = ""
        session['register_classString'] = ""
        session['register_school'] = ""
        session['register_email'] = ""
        session['register_gender'] = ""
        session['register_group_id'] = ""

class GameHandler(webapp2.RedirectHandler):
    def get(self):
        #pass
        template_values = {}
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render(template_values))


class MainHandler(webapp2.RedirectHandler):
    def get(self):
        session = get_current_session()
        name = session.get('name', '')
        template_values = {'name': name}
        template = JINJA_ENVIRONMENT.get_template('navigation.html')
        self.response.write(template.render(template_values))


def getPasuk(book, perek, pasook):
    books = ['ifle0.xml','ifle1.xml','ifle2.xml','ifle3.xml','ifle4.xml',\
           'ifle5.xml','ifle6.xml','ifle7.xml','ifle8.xml','ifle9.xml',\
           'ifle10.xml','ifle11.xml','ifle12.xml','ifle13.xml',\
           'ifle14.xml','ifle15.xml','ifle16.xml','ifle17.xml',\
           'ifle18.xml','ifle19.xml','ifle20.xml','ifle21.xml',\
           'ifle22.xml','ifle23.xml','ifle24.xml','ifle25.xml',\
           'ifle26.xml','ifle27.xml','ifle28.xml','ifle29.xml',\
           'ifle30.xml','ifle31.xml','ifle32.xml']
    tree = books[book]
    #Find all  <FRUITS>
    pasuk = "I love torah squash"
    #pa_list = tree.getElementsByTagName('verses')[0].getElementsByTagName('verse')
    #for pa in pa_list:
    #    if pa.getElementsByTagName('chapterNumber').item(0).childNodes[0].nodeValue == perek and pa.getElementsByTagName('verseNumber').item(0).childNodes[0].nodeValue == pasook:
    #        pasuk = pa.getElementsByTagName('words').item(0).childNodes[0].nodeValue
    return pasuk


def addlife(user, life):
    foo = db.GqlQuery("UPDATE User SET life="+life+" WHERE username="+user)


def addemail(user, email):
    foo = db.GqlQuery("UPDATE User SET email="+email+" WHERE username="+user)


def addcoins(user, coins):
    foo = db.GqlQuery("UPDATE User SET coins="+coins+" WHERE username="+user)


def addlastTimeLive(user, lastTimeLive):
    foo = db.GqlQuery("UPDATE User SET lastTimeLive="+lastTimeLive+" WHERE username="+user)


def addwon(user,path,level,score):
     #foo = GqlQuery("UPDATE Level SET path='"+path+"', level='"+level+"',score='"+score+"' WHERE username="+user)
     foo1 = db.GqlQuery("SELECT * FROM Level")
     num = foo1.count()
     foo = db.GqlQuery("INSERT INTO Level values ("+num+",'"+user+"','"+path+"',"+level+","+score)


class StartLevelHandler(webapp2.RedirectHandler):
    def get(self):
        session = get_current_session()
        # get level from URL using request.get('level')
        level = int(self.request.get('level'))
        try:
            if level < 0:
                raise Exception('error level must be positive')
            # save level in session
            session['level'] = level
            # save pasuk in session
            session['level-pasuk'] = getPasuk(0, 0, level)
            self.response.write('<p>You can start playing</p>')
            self.response.write('<p>Your pasuk is: "' + session.get('level-pasuk', '') + '"</p>')
            self.response.write('<a href="../">return to main page</a>')
        except Exception:
            self.response.write('<p>error please enter valid level</p>')


class SubmitLevelHandler(webapp2.RedirectHandler):
    def get(self):
        session = get_current_session()
        # get score from URL using request.get('score')
        score = int(self.request.get('score'))
        username = session.get('username', '')
        level = session.get('level', '')
        if level is '' or username is '' or not isinstance(score, int):
            self.response.write('error missing fields while submit level')
            return
        # check if level exist
        lvl = db.GqlQuery("SELECT * FROM Level WHERE "+\
                          "username='"+username+"'"+\
                          " and level=" + str(level) + "").get()
        if lvl is not None:
            self.response.write('update level ' + str(level))
            lvl.score = max(score, lvl.score)
            lvl.put()
        else:
            # insert Level to Level DB
            self.response.write('add new level ' + str(level))
            Level(username=username, path='torah', level=level, score=score).put()
        session['level'] = ''
        session['level-pasuk'] = ''
        pass


class LeaveLevelHandler(webapp2.RedirectHandler):
    def get(self):
        # clean level data from session
        session = get_current_session()
        session['level'] = ''
        session['level-pasuk'] = ''
        pass


class LevelStatusHandler(webapp2.RedirectHandler):
    def get(self):
        # get game path from url using request.get('path')
        path = self.request.get('path') or ''
        if path is '':
            self.response.write('error please enter path0')
            return
        # request from DB the levels of user
        session = get_current_session()
        username = session.get('username', '')
        levels = db.GqlQuery("SELECT * FROM Level WHERE username='" + username + "'" +\
            " AND path='" + path + "' ORDER BY level;").fetch(18)
        description = ""
        if levels is not None and len(levels) != 0:
            description += str(levels[0].score)
            for i in range(1, len(levels)):
                description += "," + str(levels[i].score)
        self.response.write(description)
        pass


class GroupLevelHandler(webapp2.RedirectHandler):
    def get(self):
        #session = get_current_session()
        #username = session.get('username', '')
        #if username is not '': # if username found
        #    user = db.GqlQuery("SELECT * FROM User WHERE username='"+username+"';").get()
        #    group = db.GqlQuery("SELECT * FROM User where groupId='"+user.groupId+"';").fetch(100)
        #
        #    # TODO get user level
        #
        #    for groupUser in group:
        #        level = db.GqlQuery("SELECT * FROM Level WHERE username='"+
        #                            groupUser.username+"';")
        #
        #else:
        #    self.response.write('error - username log off')
        pass


class GroupScoreHandler(webapp2.RedirectHandler):
    def get(self):

        pass


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/admin/', AdminHandler),
    ('/register/', RegisterHandler),
    ('/login/', LoginHandler),
    ('/logout/', LogoutHandler),
    ('/test-email/', TestEmail),
    ('/verification/', NotifyKeyHandler),
    ('/play/', GameHandler),
    ('/start-level/', StartLevelHandler),
    ('/submit-level/', SubmitLevelHandler),
    ('/leave-level/', LeaveLevelHandler),
    ('/level-status/', LevelStatusHandler),
    ('/group-level/', GroupLevelHandler),
    ('/group-score/', GroupScoreHandler)

], debug=True)