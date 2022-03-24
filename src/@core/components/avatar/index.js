// ** React Imports
import { forwardRef } from 'react'

// ** Third Party Components
import Proptypes from 'prop-types'
import { Badge } from 'reactstrap'
import classnames from 'classnames'

const Avatar = forwardRef((props, ref) => {
  // ** Props
  const {
    color,
    className,
    imgClassName,
    initials,
    size,
    badgeUp,
    content,
    icon,
    badgeColor,
    badgeText,
    img,
    imgHeight,
    imgWidth,
    status,
    tag: Tag,
    contentStyles,
    ...rest
  } = props

  // ** Function to extract initials from content
  const getInitials = str => {
    const results = []
    const wordArray = str.split(' ')
    wordArray.forEach(e => {
      results.push(e[0])
    })
    return results.join('')
  }

  return (
    <Tag
      className={classnames('avatar', {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge color={badgeColor ? badgeColor : 'primary'} className='badge-sm badge-up' pill>
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName
          })}
          src="data:image/png;base64,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"
          alt='avatarImg'
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size
          })}
        ></span>
      ) : null}
    </Tag>
  )
})

export default Avatar

// ** PropTypes
Avatar.propTypes = {
  imgClassName: Proptypes.string,
  className: Proptypes.string,
  src: Proptypes.string,
  tag: Proptypes.oneOfType([Proptypes.func, Proptypes.string]),
  badgeUp: Proptypes.bool,
  content: Proptypes.string,
  icon: Proptypes.node,
  contentStyles: Proptypes.object,
  badgeText: Proptypes.string,
  imgHeight: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  imgWidth: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  size: Proptypes.oneOf(['sm', 'lg', 'xl']),
  status: Proptypes.oneOf(['online', 'offline', 'away', 'busy']),
  badgeColor: Proptypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
    'warning',
    'dark',
    'light-primary',
    'light-secondary',
    'light-success',
    'light-danger',
    'light-info',
    'light-warning',
    'light-dark'
  ]),
  color: Proptypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'info',
    'warning',
    'dark',
    'light-primary',
    'light-secondary',
    'light-success',
    'light-danger',
    'light-info',
    'light-warning',
    'light-dark'
  ]),
  initials(props) {
    if (props['initials'] && props['content'] === undefined) {
      return new Error('content prop is required with initials prop.')
    }
    if (props['initials'] && typeof props['content'] !== 'string') {
      return new Error('content prop must be a string.')
    }
    if (typeof props['initials'] !== 'boolean' && props['initials'] !== undefined) {
      return new Error('initials must be a boolean!')
    }
  }
}

// ** Default Props
Avatar.defaultProps = {
  tag: 'div'
}
