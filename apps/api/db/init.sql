SELECT 'CREATE DATABASE shorturl'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname= 'shorturl')\gexec