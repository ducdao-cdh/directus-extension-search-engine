import { COLLECTION_TYPESENSE_SCHEMA, COLLECTION_CONFIG } from "../../../data"

export const relations = [
    {
        "collection": COLLECTION_TYPESENSE_SCHEMA,
        "field": "typesense_config",
        "related_collection": COLLECTION_CONFIG,
        "schema": {
            "constraint_name": `${COLLECTION_TYPESENSE_SCHEMA}_typesense_config_foreign`,
            "table": COLLECTION_TYPESENSE_SCHEMA,
            "column": "typesense_config",
            "foreign_key_schema": "public",
            "foreign_key_table": COLLECTION_CONFIG,
            "foreign_key_column": "id",
            "on_update": "NO ACTION",
            "on_delete": "SET NULL"
        },
        "meta": {
            "many_collection": COLLECTION_TYPESENSE_SCHEMA,
            "many_field": "typesense_config",
            "one_collection": COLLECTION_CONFIG,
            "one_field": "typesense_schema",
            "one_collection_field": null,
            "one_allowed_collections": null,
            "junction_field": null,
            "sort_field": null,
            "one_deselect_action": "nullify"
        }
    }
]