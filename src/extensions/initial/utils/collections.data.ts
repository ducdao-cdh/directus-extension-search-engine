import { COLLECTION_CONFIG, COLLECTION_TYPESENSE_SCHEMA } from "../../../data"

export const collections = [
    {
        "collection": COLLECTION_CONFIG,
        "meta": {
            "collection": COLLECTION_CONFIG,
            "icon": null,
            "note": null,
            "display_template": null,
            "hidden": false,
            "singleton": true,
            "translations": null,
            "archive_field": null,
            "archive_app_filter": true,
            "archive_value": null,
            "unarchive_value": null,
            "sort_field": null,
            "accountability": "all",
            "color": null,
            "item_duplication_fields": null,
            "sort": null,
            "group": null,
            "collapse": "open",
            "preview_url": null,
            "versioning": false
        },
        "schema": {
            "schema": "public",
            "name": COLLECTION_CONFIG,
            "comment": null
        },
        fields: [
            {
                "collection": COLLECTION_CONFIG,
                "field": "id",
                "type": "integer",
                "schema": {
                    "name": "id",
                    "table": COLLECTION_CONFIG,
                    "schema": "public",
                    "data_type": "integer",
                    "is_nullable": false,
                    "generation_expression": null,
                    "default_value": `nextval('${COLLECTION_CONFIG}_id_seq'::regclass)`,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": 32,
                    "numeric_scale": 0,
                    "is_unique": true,
                    "is_primary_key": true,
                    "has_auto_increment": true,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_CONFIG,
                    "field": "id",
                    "special": null,
                    "interface": "input",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": true,
                    "hidden": true,
                    "sort": 1,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_CONFIG,
                "field": "user_updated",
                "type": "uuid",
                "schema": {
                    "name": "user_updated",
                    "table": COLLECTION_CONFIG,
                    "schema": "public",
                    "data_type": "uuid",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": "public",
                    "foreign_key_table": "directus_users",
                    "foreign_key_column": "id"
                },
                "meta": {
                    "collection": COLLECTION_CONFIG,
                    "field": "user_updated",
                    "special": [
                        "user-updated"
                    ],
                    "interface": "select-dropdown-m2o",
                    "options": {
                        "template": "{{avatar.$thumbnail}} {{first_name}} {{last_name}}"
                    },
                    "display": "user",
                    "display_options": null,
                    "readonly": true,
                    "hidden": true,
                    "sort": 2,
                    "width": "half",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_CONFIG,
                "field": "date_updated",
                "type": "timestamp",
                "schema": {
                    "name": "date_updated",
                    "table": COLLECTION_CONFIG,
                    "schema": "public",
                    "data_type": "timestamp with time zone",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_CONFIG,
                    "field": "date_updated",
                    "special": [
                        "date-updated"
                    ],
                    "interface": "datetime",
                    "options": null,
                    "display": "datetime",
                    "display_options": {
                        "relative": true
                    },
                    "readonly": true,
                    "hidden": true,
                    "sort": 3,
                    "width": "half",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_CONFIG,
                "field": "typesense_urls",
                "type": "json",
                "schema": {
                    "name": "typesense_urls",
                    "table": COLLECTION_CONFIG,
                    "schema": "public",
                    "data_type": "json",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_CONFIG,
                    "field": "typesense_urls",
                    "special": [
                        "cast-json"
                    ],
                    "interface": "list",
                    "options": {
                        "fields": [
                            {
                                "field": "url",
                                "name": "url",
                                "type": "text",
                                "meta": {
                                    "field": "url",
                                    "width": "full",
                                    "type": "text",
                                    "required": true,
                                    "interface": "input",
                                    "options": {
                                        "trim": true
                                    }
                                }
                            }
                        ]
                    },
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 2,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": "typesense_configs",
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_CONFIG,
                "field": "engine_types",
                "type": "json",
                "schema": {
                    "name": "engine_types",
                    "table": COLLECTION_CONFIG,
                    "schema": "public",
                    "data_type": "json",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_CONFIG,
                    "field": "engine_types",
                    "special": [
                        "cast-json"
                    ],
                    "interface": "select-multiple-checkbox",
                    "options": {
                        "choices": [
                            {
                                "text": "Typesense",
                                "value": "typesense"
                            }
                        ]
                    },
                    "display": "labels",
                    "display_options": {
                        "choices": [
                            {
                                "text": "Typesense",
                                "value": "typesense"
                            }
                        ]
                    },
                    "readonly": false,
                    "hidden": false,
                    "sort": 5,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_CONFIG,
                "field": "typesense_configs",
                "type": "alias",
                "schema": null,
                "meta": {

                    "collection": COLLECTION_CONFIG,
                    "field": "typesense_configs",
                    "special": [
                        "alias",
                        "no-data",
                        "group"
                    ],
                    "interface": "group-detail",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 6,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": [
                        {
                            "name": "Hide",
                            "rule": {
                                "_and": [
                                    {
                                        "engine": {
                                            "_neq": "typesense"
                                        }
                                    }
                                ]
                            },
                            "readonly": true,
                            "hidden": true,
                            "options": {
                                "start": "open"
                            }
                        }
                    ],
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_CONFIG,
                "field": "typesense_schema",
                "type": "alias",
                "schema": null,
                "meta": {
                    "collection": COLLECTION_CONFIG,
                    "field": "typesense_schema",
                    "special": [
                        "o2m"
                    ],
                    "interface": "list-o2m",
                    "options": {
                        "layout": "table",
                        "fields": [
                            "id",
                            "status",
                            "collection",
                            "schema_name",
                            "query"
                        ]
                    },
                    "display": "related-values",
                    "display_options": {
                        "template": "{{schema_name}}"
                    },
                    "readonly": false,
                    "hidden": false,
                    "sort": 4,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": "typesense_configs",
                    "validation": null,
                    "validation_message": null
                }
            }
        ]
    },
    {
        "collection": COLLECTION_TYPESENSE_SCHEMA,
        "meta": {
            "collection": COLLECTION_TYPESENSE_SCHEMA,
            "icon": null,
            "note": null,
            "display_template": null,
            "hidden": true,
            "singleton": false,
            "translations": null,
            "archive_field": "status",
            "archive_app_filter": true,
            "archive_value": "archived",
            "unarchive_value": "draft",
            "sort_field": "sort",
            "accountability": "all",
            "color": null,
            "item_duplication_fields": null,
            "sort": 1,
            "group": "search_engine_configs",
            "collapse": "open",
            "preview_url": null,
            "versioning": false
        },
        fields: [
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "id",
                "type": "integer",
                "schema": {
                    "name": "id",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "integer",
                    "is_nullable": false,
                    "generation_expression": null,
                    "default_value": `nextval('${COLLECTION_TYPESENSE_SCHEMA}_id_seq'::regclass)`,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": 32,
                    "numeric_scale": 0,
                    "is_unique": true,
                    "is_primary_key": true,
                    "has_auto_increment": true,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "id",
                    "special": null,
                    "interface": "input",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": true,
                    "hidden": true,
                    "sort": 1,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "schema_name",
                "type": "string",
                "schema": {
                    "name": "schema_name",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "character varying",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": 255,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": true,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "schema_name",
                    "special": null,
                    "interface": "input",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 8,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": true,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "status",
                "type": "string",
                "schema": {
                    "name": "status",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "character varying",
                    "is_nullable": false,
                    "generation_expression": null,
                    "default_value": "draft",
                    "is_generated": false,
                    "max_length": 255,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {
                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "status",
                    "special": null,
                    "interface": "select-dropdown",
                    "options": {
                        "choices": [
                            {
                                "text": "$t:published",
                                "value": "published",
                                "color": "var(--theme--primary)"
                            },
                            {
                                "text": "$t:draft",
                                "value": "draft",
                                "color": "var(--theme--foreground)"
                            },
                            {
                                "text": "$t:archived",
                                "value": "archived",
                                "color": "var(--theme--warning)"
                            }
                        ]
                    },
                    "display": "labels",
                    "display_options": {
                        "showAsDot": true,
                        "choices": [
                            {
                                "text": "$t:published",
                                "value": "published",
                                "color": "var(--theme--primary)",
                                "foreground": "var(--theme--primary)",
                                "background": "var(--theme--primary-background)"
                            },
                            {
                                "text": "$t:draft",
                                "value": "draft",
                                "color": "var(--theme--foreground)",
                                "foreground": "var(--theme--foreground)",
                                "background": "var(--theme--background-normal)"
                            },
                            {
                                "text": "$t:archived",
                                "value": "archived",
                                "color": "var(--theme--warning)",
                                "foreground": "var(--theme--warning)",
                                "background": "var(--theme--warning-background)"
                            }
                        ]
                    },
                    "readonly": false,
                    "hidden": false,
                    "sort": 2,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "sort",
                "type": "integer",
                "schema": {
                    "name": "sort",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "integer",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": 32,
                    "numeric_scale": 0,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "sort",
                    "special": null,
                    "interface": "input",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": true,
                    "sort": 3,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "user_created",
                "type": "uuid",
                "schema": {
                    "name": "user_created",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "uuid",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": "public",
                    "foreign_key_table": "directus_users",
                    "foreign_key_column": "id"
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "user_created",
                    "special": [
                        "user-created"
                    ],
                    "interface": "select-dropdown-m2o",
                    "options": {
                        "template": "{{avatar.$thumbnail}} {{first_name}} {{last_name}}"
                    },
                    "display": "user",
                    "display_options": null,
                    "readonly": true,
                    "hidden": true,
                    "sort": 4,
                    "width": "half",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "date_created",
                "type": "timestamp",
                "schema": {
                    "name": "date_created",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "timestamp with time zone",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "date_created",
                    "special": [
                        "date-created"
                    ],
                    "interface": "datetime",
                    "options": null,
                    "display": "datetime",
                    "display_options": {
                        "relative": true
                    },
                    "readonly": true,
                    "hidden": true,
                    "sort": 5,
                    "width": "half",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "user_updated",
                "type": "uuid",
                "schema": {
                    "name": "user_updated",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "uuid",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": "public",
                    "foreign_key_table": "directus_users",
                    "foreign_key_column": "id"
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "user_updated",
                    "special": [
                        "user-updated"
                    ],
                    "interface": "select-dropdown-m2o",
                    "options": {
                        "template": "{{avatar.$thumbnail}} {{first_name}} {{last_name}}"
                    },
                    "display": "user",
                    "display_options": null,
                    "readonly": true,
                    "hidden": true,
                    "sort": 6,
                    "width": "half",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "date_updated",
                "type": "timestamp",
                "schema": {
                    "name": "date_updated",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "timestamp with time zone",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "date_updated",
                    "special": [
                        "date-updated"
                    ],
                    "interface": "datetime",
                    "options": null,
                    "display": "datetime",
                    "display_options": {
                        "relative": true
                    },
                    "readonly": true,
                    "hidden": true,
                    "sort": 7,
                    "width": "half",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "query",
                "type": "json",
                "schema": {
                    "name": "query",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "json",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "query",
                    "special": [
                        "cast-json"
                    ],
                    "interface": "input-code",
                    "options": {
                        "template": "{\n    \"filter\": {\n        \"status\": \"published\"\n    },\n    \"fields\": [\n        \"*\"\n    ],\n    \"sort\": [\n        \"-id\"\n    ],\n    \"limit\": -1\n}",
                        "lineWrapping": true
                    },
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 9,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": true,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "schema",
                "type": "json",
                "schema": {
                    "name": "schema",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "json",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "schema",
                    "special": [
                        "cast-json"
                    ],
                    "interface": "input-code",
                    "options": {
                        "template": "{\n    \"fields\": [\n        {\n            \"name\": \"id\",\n            \"type\": \"auto\"\n        },\n        {\n            \"name\": \"thumbnail\",\n            \"type\": \"auto\",\n            \"optional\": true\n        },\n        {\n            \"name\": \"title\",\n            \"type\": \"auto\"\n        },\n        {\n            \"name\": \"slug\",\n            \"type\": \"auto\"\n        },\n        {\n            \"name\": \"date_created\",\n            \"type\": \"auto\",\n            \"optional\": true\n        },\n        {\n            \"name\": \"date_updated\",\n            \"type\": \"auto\",\n            \"optional\": true\n        }\n    ],\n    \"token_separators\": [\n        \"+\",\n        \"-\",\n        \"@\",\n        \".\"\n    ]\n}",
                        "lineWrapping": true
                    },
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 11,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": true,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "collection",
                "type": "string",
                "schema": {
                    "name": "collection",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "character varying",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": 255,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "collection",
                    "special": null,
                    "interface": "input",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 8,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": true,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "function_parse",
                "type": "text",
                "schema": {
                    "name": "function_parse",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "text",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "function_parse",
                    "special": null,
                    "interface": "input-code",
                    "options": {
                        "language": "javascript",
                        "template": "module.exports = function(data) {\n    const escapeHtml = (text) => {\n        return text ? text?.replace(/(<([^>]+)>)/gi, '') : text\n    }\n\t// Do something...\n\treturn []\n}"
                    },
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 10,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": true,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "data_indexed",
                "type": "json",
                "schema": {
                    "name": "data_indexed",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "json",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": null,
                    "numeric_scale": null,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": null,
                    "foreign_key_table": null,
                    "foreign_key_column": null
                },
                "meta": {

                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "data_indexed",
                    "special": [
                        "cast-json"
                    ],
                    "interface": "input-code",
                    "options": {
                        "lineWrapping": true
                    },
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 12,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            },
            {
                "collection": COLLECTION_TYPESENSE_SCHEMA,
                "field": "typesense_config",
                "type": "integer",
                "schema": {
                    "name": "typesense_config",
                    "table": COLLECTION_TYPESENSE_SCHEMA,
                    "schema": "public",
                    "data_type": "integer",
                    "is_nullable": true,
                    "generation_expression": null,
                    "default_value": null,
                    "is_generated": false,
                    "max_length": null,
                    "comment": null,
                    "numeric_precision": 32,
                    "numeric_scale": 0,
                    "is_unique": false,
                    "is_primary_key": false,
                    "has_auto_increment": false,
                    "foreign_key_schema": "public",
                    "foreign_key_table": "search_engine_configs",
                    "foreign_key_column": "id"
                },
                "meta": {
                    "collection": COLLECTION_TYPESENSE_SCHEMA,
                    "field": "typesense_config",
                    "special": [
                        "m2o"
                    ],
                    "interface": "select-dropdown-m2o",
                    "options": null,
                    "display": null,
                    "display_options": null,
                    "readonly": false,
                    "hidden": true,
                    "sort": 13,
                    "width": "full",
                    "translations": null,
                    "note": null,
                    "conditions": null,
                    "required": false,
                    "group": null,
                    "validation": null,
                    "validation_message": null
                }
            }
        ],
        "schema": {
            "schema": "public",
            "name": COLLECTION_TYPESENSE_SCHEMA,
            "comment": null
        }
    }

]
