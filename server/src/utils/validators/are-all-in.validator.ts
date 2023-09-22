import {
  ValidationOptions,
  ValidationArguments,
  ValidateBy,
  buildMessage,
} from 'class-validator';

export function areAllIn(
  values: unknown,
  possibleValues: readonly unknown[],
): boolean {
  return (
    Array.isArray(values) &&
    Array.isArray(possibleValues) &&
    values.every((val) => possibleValues.includes(val))
  );
}

export function AreAllIn(
  values: readonly any[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'ARE_ALL_IN',
      constraints: [values],
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          return areAllIn(value, args?.constraints[0]);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return (
            eachPrefix +
            '$property values must be one of the following values: $constraint1'
          );
        }, validationOptions),
      },
    },
    validationOptions,
  );
}
