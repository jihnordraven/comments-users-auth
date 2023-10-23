import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'isTrim', async: false })
export class IsTrim implements ValidatorConstraintInterface {
	validate(value: string) {
		return typeof value === 'string' && value.trim() === value
	}

	defaultMessage(args: ValidationArguments) {
		return `Value ${args.property} must be trimmed.`
	}
}
