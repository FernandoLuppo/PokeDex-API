import {
  pokemonIdValidationSchema,
  loginValidationSchema,
  newInfosValidationSchema,
  registerValidationSchema,
  emailRecoverPasswordValidationSchema,
  recoverPasswordValidationSchema
} from "./validationSchema/validationSchema"
import type { Request, Response, NextFunction } from "express"
import type * as yup from "yup"

export class Authenticate {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = { message: "", isError: false, error: [""] }

    try {
      await loginValidationSchema.validate(req.body, {
        abortEarly: false
      })

      next()
    } catch (err) {
      const errors: string[] = []

      ;(err as yup.ValidationError).errors.forEach(error => {
        errors.push(error)
      })

      result.isError = true
      result.error = errors
      res.status(401).send(result)
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = { message: "", isError: false, error: [""] }

    try {
      await registerValidationSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {})
      next()
    } catch (err) {
      const errors: string[] = []

      ;(err as yup.ValidationError).errors.forEach(error => {
        errors.push(error)
      })

      result.isError = true
      result.error = errors
      res.status(401).send(result)
    }
  }

  async newUserInfos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = { message: "", isError: false, error: [""] }

    try {
      await newInfosValidationSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {})
      next()
    } catch (err) {
      const errors: string[] = []

      ;(err as yup.ValidationError).errors.forEach(error => {
        errors.push(error)
      })

      result.isError = true
      result.error = errors
      res.status(401).send(result)
    }
  }

  async pokemonId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = { message: "", isError: false, error: [""] }
    let id

    if (req.body.id === undefined) {
      id = req.params
    } else {
      id = req.body
    }

    try {
      await pokemonIdValidationSchema
        .validate(id, {
          abortEarly: false
        })
        .then(() => {})
      next()
    } catch (err) {
      const errors: string[] = []

      ;(err as yup.ValidationError).errors.forEach(error => {
        errors.push(error)
      })

      result.isError = true
      result.error = errors
      res.status(401).send(result)
    }
  }

  async emailRecoverPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = { message: "", isError: false, error: [""] }

    try {
      await emailRecoverPasswordValidationSchema
        .validate(req.body, {
          abortEarly: false
        })
        .then(() => {})
      next()
    } catch (err) {
      const errors: string[] = []

      ;(err as yup.ValidationError).errors.forEach(error => {
        errors.push(error)
      })

      result.isError = true
      result.error = errors
      res.status(401).send(result)
    }
  }

  async recoverPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = { message: "", isError: false, error: [""] }

    try {
      await recoverPasswordValidationSchema
        .validate(req.body, {
          abortEarly: false
        })
        .then(() => {})
      next()
    } catch (err) {
      const errors: string[] = []

      ;(err as yup.ValidationError).errors.forEach(error => {
        errors.push(error)
      })

      result.isError = true
      result.error = errors
      res.status(401).send(result)
    }
  }
}
