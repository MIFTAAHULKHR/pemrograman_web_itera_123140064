from pyramid.config import Configurator
from pyramid.response import Response

def hello_world(request):
    return Response('API Matakuliah is running!')

def main(global_config, **settings):
    """Function returns a Pyramid WSGI application."""
    
    # AKTIFKAN database setup
    from .database import initialize_db
    engine = initialize_db(settings)
    
    # Import Base untuk memastikan tabel ada
    from .models import Base
    Base.metadata.create_all(engine)  # Buat tabel jika belum ada
    
    config = Configurator(settings=settings)
    
    # === PERBAIKAN UTAMA: HANYA 2 ROUTE UNTUK API ===
    # 1. Untuk operasi pada koleksi: GET semua dan POST baru
    config.add_route('matakuliah_collection', '/api/matakuliah')
    
    # 2. Untuk operasi pada item spesifik: GET by ID, PUT, DELETE
    config.add_route('matakuliah_item', '/api/matakuliah/{id}')
    
    # 3. Route untuk home page
    config.add_route('home', '/')
    
    # Add views
    config.add_view(hello_world, route_name='home')
    config.scan('.views')
    
    return config.make_wsgi_app()