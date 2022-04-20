import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { components, OptionProps, SingleValueProps } from 'react-select'
import styles from './index.module.css'

// NOTE: does not support multiSelect
export function selectOptionWithIcon<OptionValue extends string>(
  iconConfig: Record<OptionValue, IconProp>
) {
  return {
    Option: ({
      children,
      ...props
    }: OptionProps<{ value: OptionValue; label: string }, false>) => (
      <components.Option {...props}>
        <FontAwesomeIcon
          icon={iconConfig[props.data.value]}
          className={styles.Icon}
        />
        {children}
      </components.Option>
    ),
    SingleValue: ({
      children,
      ...props
    }: SingleValueProps<{ value: OptionValue; label: string }, false>) => (
      <components.SingleValue {...props}>
        <FontAwesomeIcon
          icon={iconConfig[props.data.value]}
          className={styles.Icon}
        />
        {children}
      </components.SingleValue>
    ),
  }
}

export default selectOptionWithIcon
