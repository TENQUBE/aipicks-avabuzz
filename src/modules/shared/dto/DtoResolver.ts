import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'

import { DtoValidatorError } from '@/modules/shared/dto/DtoValidatorError'

export class DtoResolver {
  private static _validatorOptions = {
    forbidUnknownValues: true
  } as ValidatorOptions

  static async validate<T extends ClassConstructor<any>>(plain: object, dto: T): Promise<void> {
    try {
      if (typeof plain === 'string') {
        throw new DtoValidatorError('DTO is not object')
      }

      let validationErrors: ValidationError[] = []

      if (Array.isArray(plain)) {
        const instances = plain.map((p) => plainToInstance(dto, p))
        const validationErrorList = await Promise.all(
          instances.map((instance) => validate(instance, this._validatorOptions))
        )
        const validationErrors = validationErrorList.filter((error) => error.length > 0)

        if (validationErrors.length > 0) {
          throw new Error(this.getErrorMsg(validationErrors[0]))
        }
      } else {
        const instance = plainToInstance(dto, plain)
        validationErrors = await validate(instance, this._validatorOptions)

        if (validationErrors.length > 0) {
          throw new Error(this.getErrorMsg(validationErrors))
        }
      }
    } catch (error: any) {
      console.error('error: ', error?.message)
      throw new DtoValidatorError(error?.message || 'DTO is not valid')
    }
  }

  private static getErrorMsg(validationErrors: ValidationError[]): string {
    const [validationError] = validationErrors

    return validationError.toString()
  }
}
