import psycopg2

def get_db_connection():
    connect = psycopg2.connect(
        host="localhost",
        database="Lets Write",
        user="postgres",
        password="1234",
        port=5432
    )
    return connect