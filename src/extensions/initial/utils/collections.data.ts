import { COLLECTION_CONFIG } from "../../../data"

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
                "field": "typesence_api_key",
                "type": "text",
                "schema": {
                    "name": "typesence_api_key",
                    "table": COLLECTION_CONFIG,
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

                    "collection": COLLECTION_CONFIG,
                    "field": "typesence_api_key",
                    "special": null,
                    "interface": "input",
                    "options": {
                        "trim": true,
                        "masked": true
                    },
                    "display": "formatted-value",
                    "display_options": null,
                    "readonly": true,
                    "hidden": false,
                    "sort": 1,
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
                "field": "typesence_indexing",
                "type": "json",
                "schema": {
                    "name": "typesence_indexing",
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
                    "field": "typesence_indexing",
                    "special": [
                        "cast-json"
                    ],
                    "interface": "list",
                    "options": {
                        "fields": [
                            {
                                "field": "collection",
                                "name": "collection",
                                "type": "string",
                                "meta": {
                                    "field": "collection",
                                    "width": "full",
                                    "type": "string",
                                    "required": true,
                                    "interface": "input",
                                    "options": {
                                        "choices": null,
                                        "trim": true,
                                        "iconLeft": "backup_table"
                                    }
                                }
                            },
                            {
                                "field": "query",
                                "name": "query",
                                "type": "json",
                                "meta": {
                                    "field": "query",
                                    "width": "full",
                                    "type": "json",
                                    "required": true,
                                    "interface": "input-code",
                                    "options": {
                                        "language": "JSON",
                                        "lineWrapping": true
                                    }
                                }
                            },
                            {
                                "field": "function_parse",
                                "name": "function_parse",
                                "type": "text",
                                "meta": {
                                    "field": "function_parse",
                                    "width": "full",
                                    "type": "text",
                                    "required": true,
                                    "interface": "input-code",
                                    "options": {
                                        "language": "javascript",
                                        "lineWrapping": true,
                                        "template": "module.exports = function(data) {\n    const escapeHtml = (text) => {\n        return text ? text?.replace(/(<([^>]+)>)/gi, '') : text\n    }\n\t// Do something...\n\treturn []\n}"
                                    },
                                    "display": null
                                }
                            },
                            {
                                "field": "schema",
                                "name": "schema",
                                "type": "json",
                                "meta": {
                                    "field": "schema",
                                    "width": "full",
                                    "type": "json",
                                    "required": true,
                                    "interface": "input-code",
                                    "options": {
                                        "language": "JSON",
                                        "lineWrapping": true
                                    }
                                }
                            }
                        ],
                        "template": "Collection: {{collection}}  |  Schema: {{schema.name}}"
                    },
                    "display": "raw",
                    "display_options": null,
                    "readonly": false,
                    "hidden": false,
                    "sort": 3,
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
                "field": "typesence_urls",
                "type": "json",
                "schema": {
                    "name": "typesence_urls",
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
                    "field": "typesence_urls",
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
                                "text": "Typesence",
                                "value": "typesence"
                            },
                            {
                                "text": "Elasticsearch",
                                "value": "elasticsearch"
                            }
                        ]
                    },
                    "display": "labels",
                    "display_options": {
                        "choices": [
                            {
                                "text": "Typesence",
                                "value": "typesence"
                            },
                            {
                                "text": "Elasticsearch",
                                "value": "elasticsearch"
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
                                            "_neq": "typesence"
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
            }
        ]
    }
]
