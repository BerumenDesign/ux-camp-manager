import React from 'react'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { FormikProps } from 'formik'
import * as S from './proposal-form-item.styles'

export interface RadioOption {
  value: string
  label: string
}

export interface ProposalFormItemProps<T = Record<string, unknown>> {
  formik: FormikProps<T>
  name: string
  label: string
  required?: boolean
  type?: 'text' | 'textarea' | 'radio'
  maxLength?: number
  radioOptions?: RadioOption[]
  multiline?: boolean
  rows?: number
}

const ProposalFormItem = <T extends Record<string, unknown>>({
  formik,
  name,
  label,
  required = false,
  type = 'text',
  maxLength,
  radioOptions = [],
  multiline = false,
}: ProposalFormItemProps<T>) => {
  const value = String(formik.values[name] ?? '')
  const touched = formik.touched[name]
  const error = formik.errors[name]
  const hasError = touched && !!error

  const handleChange = (newValue: string) => {
    formik.setFieldValue(name, newValue)
    formik.setFieldTouched(name, true, false)
    formik.validateField(name)
  }

  const renderField = () => {
    switch (type) {
      case 'radio':
        return (
          <RadioGroup
            name={name}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          >
            <S.Radios>
              {radioOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </S.Radios>
          </RadioGroup>
        )

      case 'textarea':
        return (
          <S.StyledTextField
            fullWidth
            name={name}
            variant="outlined"
            multiline
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
            error={hasError}
            helperText={hasError ? String(error) : ''}
          />
        )

      default:
        return (
          <S.StyledTextField
            fullWidth
            name={name}
            variant="outlined"
            multiline={multiline}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
            error={hasError}
            helperText={hasError ? String(error) : ''}
          />
        )
    }
  }

  return (
    <S.FormField>
      <S.Label>
        {label} {required && <S.RequiredIcon />}
      </S.Label>

      {type === 'radio' ? (
        <S.StyledFormControl error={hasError}>
          {renderField()}
          {hasError && <S.ErrorMessage>{String(error)}</S.ErrorMessage>}
        </S.StyledFormControl>
      ) : (
        renderField()
      )}

      {maxLength && type !== 'radio' && (
        <S.CharacterCount>
          {value.length}/{maxLength}
        </S.CharacterCount>
      )}
    </S.FormField>
  )
}

export default ProposalFormItem
