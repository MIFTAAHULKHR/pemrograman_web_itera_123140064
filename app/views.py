from pyramid.view import view_config
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from .models import DBSession, Matakuliah

# ===== VIEW UNTUK COLLECTION (/api/matakuliah) =====

@view_config(route_name='matakuliah_collection', request_method='GET', renderer='json')
def get_all_matakuliah(request):
    """GET /api/matakuliah - Mendapatkan semua matakuliah"""
    try:
        matakuliah_list = DBSession.query(Matakuliah).all()
        return {
            'data': [mk.to_dict() for mk in matakuliah_list],
            'status': 'success',
            'count': len(matakuliah_list)
        }
    except SQLAlchemyError:
        request.response.status = 500
        return {'error': 'Database error'}

@view_config(route_name='matakuliah_collection', request_method='POST', renderer='json')
def create_matakuliah(request):
    """POST /api/matakuliah - Menambahkan matakuliah baru"""
    try:
        data = request.json_body
        
        # Validasi field yang diperlukan
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in data:
                request.response.status = 400
                return {'error': f'Field {field} diperlukan'}
        
        # Validasi tipe data
        try:
            sks = int(data['sks'])
            semester = int(data['semester'])
        except (ValueError, TypeError):
            request.response.status = 400
            return {'error': 'sks dan semester harus berupa angka'}
        
        # Buat objek baru
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=sks,
            semester=semester
        )
        
        DBSession.add(new_mk)
        DBSession.flush()
        
        request.response.status = 201  # Created
        return {
            'data': new_mk.to_dict(),
            'status': 'success',
            'message': 'Matakuliah berhasil ditambahkan'
        }
        
    except IntegrityError:
        DBSession.rollback()
        request.response.status = 400
        return {'error': 'Kode MK sudah ada'}
    except SQLAlchemyError as e:
        DBSession.rollback()
        request.response.status = 400
        return {'error': f'Database error: {str(e)}'}

# ===== VIEW UNTUK ITEM (/api/matakuliah/{id}) =====

@view_config(route_name='matakuliah_item', request_method='GET', renderer='json')
def get_matakuliah_by_id(request):
    """GET /api/matakuliah/{id} - Mendapatkan detail satu matakuliah"""
    mk_id = request.matchdict['id']
    
    try:
        matakuliah = DBSession.query(Matakuliah).filter_by(id=mk_id).first()
        if matakuliah:
            return {
                'data': matakuliah.to_dict(),
                'status': 'success'
            }
        request.response.status = 404
        return {'error': 'Matakuliah tidak ditemukan'}
    except SQLAlchemyError:
        request.response.status = 500
        return {'error': 'Database error'}

@view_config(route_name='matakuliah_item', request_method='PUT', renderer='json')
def update_matakuliah(request):
    """PUT /api/matakuliah/{id} - Mengupdate data matakuliah"""
    mk_id = request.matchdict['id']
    
    try:
        matakuliah = DBSession.query(Matakuliah).filter_by(id=mk_id).first()
        if not matakuliah:
            request.response.status = 404
            return {'error': 'Matakuliah tidak ditemukan'}
        
        data = request.json_body
        
        # Update hanya field yang disediakan
        if 'kode_mk' in data:
            matakuliah.kode_mk = data['kode_mk']
        if 'nama_mk' in data:
            matakuliah.nama_mk = data['nama_mk']
        if 'sks' in data:
            try:
                matakuliah.sks = int(data['sks'])
            except (ValueError, TypeError):
                request.response.status = 400
                return {'error': 'sks harus berupa angka'}
        if 'semester' in data:
            try:
                matakuliah.semester = int(data['semester'])
            except (ValueError, TypeError):
                request.response.status = 400
                return {'error': 'semester harus berupa angka'}
        
        DBSession.flush()
        
        return {
            'data': matakuliah.to_dict(),
            'status': 'success',
            'message': 'Matakuliah berhasil diupdate'
        }
        
    except IntegrityError:
        DBSession.rollback()
        request.response.status = 400
        return {'error': 'Kode MK sudah digunakan'}
    except SQLAlchemyError as e:
        DBSession.rollback()
        request.response.status = 400
        return {'error': f'Database error: {str(e)}'}

@view_config(route_name='matakuliah_item', request_method='DELETE', renderer='json')
def delete_matakuliah(request):
    """DELETE /api/matakuliah/{id} - Menghapus data matakuliah"""
    mk_id = request.matchdict['id']
    
    try:
        matakuliah = DBSession.query(Matakuliah).filter_by(id=mk_id).first()
        if not matakuliah:
            request.response.status = 404
            return {'error': 'Matakuliah tidak ditemukan'}
        
        DBSession.delete(matakuliah)
        DBSession.flush()
        
        return {
            'status': 'success',
            'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus'
        }
        
    except SQLAlchemyError:
        DBSession.rollback()
        request.response.status = 500
        return {'error': 'Database error'}