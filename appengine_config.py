from gaesessions import SessionMiddleware

def webapp_add_wsgi_middleware(app):
    # 32 or longer
	app = SessionMiddleware(app, cookie_key="hi6767hfihnjgtjngyt5543DEFWDcct4vSthbfngfsfrwebhuddh")
	return app