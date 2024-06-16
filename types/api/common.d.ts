declare namespace Api {

  type ValidationErrorMapped<T> = {
    [P in keyof T]: string[]
  }

  type ValidationError<T> = ValidationErrorMapped<T> & {
    non_field_errors?: string[]
  }

  interface ExcelImportErrorDetail {
    errors: Record<string, string>[]
    key: number | string
  }

  interface ExcelImportError {
    error_type: 'ExcelImportError'
    detail: ExcelImportErrorDetail[]
  }

  type ErrorMsg = string | string[] | Record<string, any>

  interface ResponseData<T = any> {
    code: number
    data: T
    msg: ErrorMsg
  }

  interface ResponsePagination<T = any> {
    code: number
    data: {
      count: number
      next: string
      previous: string
      results: T
    }
    msg: string
  }

  interface RequestPagination {
    page?: number
    limit?: number
  }

  type PaginationQueryParams<T> = RequestPagination & Partial<T>

}
