import { ReflectClass }    from '@itrocks/reflect'
import { ReflectProperty } from '@itrocks/reflect'
import { listOf }          from './list'

export * from './list'

class ListReflectClass<T extends object> extends ReflectClass<T>
{

	listProperties()
	{
		return listOf(this.type).map(propertyName => new ReflectProperty(this, propertyName))
	}

	listPropertyNames()
	{
		return listOf(this.type)
	}

}

export function initListProperties()
{
		// @ts-ignore Being added, for use into templates (without type checking)
	ReflectClass.prototype.listProperties = ListReflectClass.prototype.listProperties
	// @ts-ignore Being added, for use into templates (without type checking)
	ReflectClass.prototype.listPropertyNames = ListReflectClass.prototype.listPropertyNames
}
