exports.updatedAtTrigger = (tableName) => {
    return `
        CREATE TRIGGER ${tableName}_updated_at
        BEFORE UPDATE ON "${tableName}"
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
        `
}



