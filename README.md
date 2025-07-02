[![npm version](https://img.shields.io/npm/v/@itrocks/list-properties?logo=npm)](https://www.npmjs.org/package/@itrocks/list-properties)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/list-properties)](https://www.npmjs.org/package/@itrocks/list-properties)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/list-properties?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/list-properties)
[![issues](https://img.shields.io/github/issues/itrocks-ts/list-properties)](https://github.com/itrocks-ts/list-properties/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# list-properties

Marks class properties to show as columns in a list/table view.

# Usage

This module extends the [@itrocks/reflect](https://github.com/itrocks-ts/reflect)
system to determine which class properties should be displayed in a list or table view.

Use the `@List()` decorator on a class to declare which properties are shown in list views.
You can also rely on default behaviour that omits many-to-many properties
or selects only representative ones when too many exist.

To enable these extensions, call `initListProperties()` once at application startup.

# API

## initListProperties

```
initListProperties(): void
```

Call this once at runtime during app initialisation.

This extends the [ReflectClass](https://github.com/itrocks-ts/reflect#ReflectClass) prototype with two new methods:
- `listProperties(): ReflectProperty[]` - returns ReflectProperty instances
- `listPropertyNames(): string[]` - returns only the names

## @List

```
@List(...properties: KeyOf<T>[])
```

Marks the given properties to be listed in a table-like UI.

If no properties are passed, a default list is inferred using:
- all non-many-to-many properties (when ≤ 5),
- otherwise only the @Representative properties.

**Parameters:**

- `properties`: the property names you want to include in list views.

**Example:**

```ts
@List('name', 'email', 'role')
class User {
	email:    string
	name:     string
	password: string
	role:     Role
}
```

## listOf

```
listOf(target: ObjectOrType<T>): string[]
```

Returns the array of property names to be used in list views, based on the @List decorator or default rules.

# Template integration

This module is used in list rendering templates to dynamically generate column headers and data cells.

The following example uses the new `ReflectClass.listProperties()` method into an
[@itrocks/template-insight](https://github.com/itrocks-ts/template-insight) template:

```html
<!--%listProperties-->
<th data-property="{name}">{@display}</th>
<!--end-->
```

These directives will iterate over the selected list properties, producing one column per entry.
This allows the UI to adapt automatically to changes in your model classes.
