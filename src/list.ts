import { KeyOf }               from '@itrocks/class-type'
import { ObjectOrType }        from '@itrocks/class-type'
import { Type }                from '@itrocks/class-type'
import { typeOf }              from '@itrocks/class-type'
import { representativeOf }    from '@itrocks/class-view'
import { decorateCallback }    from '@itrocks/decorator/class'
import { decoratorOfCallback } from '@itrocks/decorator/class'
import { CollectionType }      from '@itrocks/property-type'
import { ReflectClass }        from '@itrocks/reflect'

const LIST = Symbol('list')

export function defaultListProperties<T extends object>(target: Type<T>)
{
	const properties = Array.from(new ReflectClass<T>(target).properties)
		.filter(property => !(property.type.lead instanceof CollectionType))
		.map(property => property.name)
	return (properties.length <= 5)
		? properties
		: representativeOf(target)
}

export function List<T extends object>(...properties: KeyOf<T>[])
{
	return decorateCallback<T>(LIST, target => properties.length ? properties : defaultListProperties(target))
}

export function listOf<T extends object>(target: ObjectOrType<T>)
{
	return decoratorOfCallback<T, KeyOf<T>[]>(target, LIST, target => defaultListProperties(typeOf(target)))
}
