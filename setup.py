from setuptools import setup, find_packages

requires = [
    'pyramid',
    'waitress',
    'alembic',
    'sqlalchemy',
    'psycopg2-binary',
    'zope.sqlalchemy',
]

setup(
    name='matakuliah_api',
    version='0.0',
    description='API Manajemen Matakuliah',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = app:main',
        ],
        # HAPUS atau KOMENTARI console_scripts yang tidak ada
        # 'console_scripts': [
        #     'init_db = app.scripts:init_db',
        # ],
    },
)