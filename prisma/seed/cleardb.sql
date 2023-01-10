DO
$$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public') LOOP
        EXECUTE 'DELETE FROM ' || quote_ident(r.table_name) || ' CASCADE';
    END LOOP;
END
$$;