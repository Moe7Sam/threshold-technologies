/*
# Enable pgcrypto extension

Enables the pgcrypto extension which provides crypt() and gen_salt() functions
needed for bcrypt password hashing of the admin PIN.
*/

create extension if not exists pgcrypto;
