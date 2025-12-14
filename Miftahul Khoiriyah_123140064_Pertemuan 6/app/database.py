# Tambah import create_engine
from sqlalchemy import create_engine, engine_from_config
from sqlalchemy.orm import configure_mappers
from .models import Base, DBSession

def initialize_db(settings):
    # Pastikan 'sqlalchemy.url' ada di settings
    if 'sqlalchemy.url' not in settings:
        # Fallback ke URL langsung jika tidak ada di settings
        engine = create_engine('postgresql://postgres:openpgpwd@localhost/matakuliah_db')
    else:
        engine = engine_from_config(settings, 'sqlalchemy.')
    
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    configure_mappers()
    return engine