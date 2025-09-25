'use client'

import React, {
  ChangeEvent,
  ComponentType,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { isEqual } from 'lodash'
import { Box, Typography, useTheme } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { FastField, FieldProps } from 'formik'

import * as S from './DetailItem.styles'
import ErrorText from '@/components/shared/error-text/ErrorText'

interface JobDetailsItemProps {
  isEdit: boolean
  item: any
  name: string
  label: string
  isArray?: boolean
  isParagraph?: boolean
  error?: any
  displayValue?: string
  FieldComponent?: ComponentType<any>
}

const DetailItem = ({
  isEdit,
  item,
  name,
  label,
  isParagraph = false,
  isArray = false,
  error,
  displayValue,
  FieldComponent,
}: JobDetailsItemProps) => {
  const theme = useTheme()
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  useEffect(() => {
    const adjustHeight = () => {
      textareaRefs.current.forEach((textarea) => {
        if (textarea) {
          textarea.style.height = 'auto'
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      })
    }

    adjustHeight()

    const timeoutId = setTimeout(adjustHeight, 0)

    return () => clearTimeout(timeoutId)
  }, [item, name])

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
      const textarea = event.target
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
      textareaRefs.current[index] = textarea
    },
    []
  )

  return (
    <S.EditBox isEdit={isEdit}>
      <S.TitleBox isEdit={isEdit} isArray={isArray}>
        <Typography variant="body1" color={theme.palette.gray.main}>
          {label}
        </Typography>
      </S.TitleBox>
      {isEdit ? (
        FieldComponent ? (
          <FastField name={name}>
            {({ field, form }: FieldProps) => (
              <FieldComponent field={field} form={form} error={error} />
            )}
          </FastField>
        ) : (
          <Box>
            <FastField
              name={name}
              as={isParagraph ? 'textarea' : 'input'}
              type="input"
              style={S.customStyles}
              onInput={(event: ChangeEvent<HTMLTextAreaElement>) =>
                handleInput(event, 0)
              }
              innerRef={(el: HTMLTextAreaElement) => {
                textareaRefs.current[0] = el
                if (el) {
                  el.style.height = 'auto'
                  el.style.height = `${el.scrollHeight}px`
                }
              }}
            />
            <ErrorText>{error}</ErrorText>
          </Box>
        )
      ) : isArray ? (
        <Box>
          {item.map((value: string, index: number) => (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              key={`${name}-${index}`}
            >
              <Box pt={0.4} pl={isParagraph ? 1 : 3}>
                {!isParagraph && (
                  <CircleIcon
                    sx={{
                      fontSize: '6px',
                      color: theme.palette.black.main,
                    }}
                  />
                )}
              </Box>
              <Typography
                key={index}
                variant="h5"
                color={theme.palette.black.main}
                pl={isEdit ? '0px' : '12px'}
                mt={isEdit ? '0px' : '4px'}
                display="inline"
              >
                {displayValue ? displayValue : value}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          variant="h5"
          color={theme.palette.black.main}
          pl={isEdit ? '0px' : '12px'}
          mt={isEdit ? '0px' : '4px'}
        >
          {displayValue ? displayValue : item}
        </Typography>
      )}
    </S.EditBox>
  )
}

const areEqual = (
  prevProps: JobDetailsItemProps,
  nextProps: JobDetailsItemProps
) => {
  return isEqual(prevProps, nextProps)
}

export default React.memo(DetailItem, areEqual)
