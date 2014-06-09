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

import webapp2
import jinja2
import os
import re  # regex (very fast!)

from gaesessions import get_current_session
from google.appengine.ext import db


class IndividualGame(db.Model):
    id = db.IntegerProperty(db.Key)
    moveCounter = db.IntegerProperty(default=0)
    players = db.StringProperty(default="")
    isBusy = db.BooleanProperty(default=False)

JINJA_ENVIRONMENT = jinja2.Environment(
          loader=jinja2.FileSystemLoader(os.path.join(
          os.path.dirname(__file__), 'templates')),
          extensions=['jinja2.ext.autoescape'],
          autoescape=True)

class MainHandler(webapp2.RedirectHandler):
    def get(self):
        result = db.GqlQuery("SELECT * FROM IndividualGame WHERE id=1").get()
        if result == None:
            IndividualGame(id=1, moveCounter=0, players="eitanp").put()
        allGames = db.GqlQuery("SELECT * FROM IndividualGame WHERE isBusy=False").fetch(100)
        template_values = {'games': allGames}
        template = JINJA_ENVIRONMENT.get_template('online.html')
        self.response.write(template.render(template_values))


class FindGameHandler(webapp2.RedirectHandler):
    def get(self):
        #session = get_current_session()
        #user = session['user']
        #allGames = db.GqlQuery("SELECT * FROM IndividualGame WHERE moveCounter=0").fetch(100)
        self.response.write('5, 15')



app = webapp2.WSGIApplication([
    ('/online/', MainHandler),
    ('/find-online-game/', FindGameHandler)
], debug=True)