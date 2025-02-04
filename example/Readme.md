## Directus with Typesense

### 1. Run stack
``` bash
docker-compose up -d
```

### 2. Access Directus at http://localhost:8055
Login with: admin@axample.com / admin

### 3. Create a new entry in "Search Engine Configs" Collection
**Hint: Save both "Search Engine Configs" Collection and "Typesense Schema" Item and to sync typesense**

Engine Types: Typesense

Typesense URLs: http://typesense:8108

Typesense Schema:
- Status: Published
- Schema Name: users
- Collection: directus_users
- Mode: Trigger Event
- Query:
``` json
{
    "fields": [
        "id",
        "email",
        "first_name",
        "last_name",
        "role.name"
    ]
}
```
- Function Parse:
``` javascript
module.exports = function(data) {
    const escapeHtml = (text) => text ? text.replace(/(<([^>]+)>)/gi, '') : text;
    return data.map(item => ({
        id: item.id.toString(),
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        role: item.role ? item.role.name : null
    }));
};
```
- Schema:
``` json
{
    "fields": [
        {
            "name": "id",
            "type": "string"
        },
        {
            "name": "email",
            "type": "string"
        },
        {
            "name": "first_name",
            "type": "string",
            "optional": true
        },
        {
            "name": "last_name",
            "type": "string",
            "optional": true
        },
        {
            "name": "role",
            "type": "string",
            "optional": true
        }
    ],
    "token_separators": [
        "+",
        "-",
        "@",
        "."
    ]
}
```