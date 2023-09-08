import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from 'constants/app.constant'
import { useSelector } from 'react-redux'
import appConfig from 'configs/app.config'

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props) => {
    const { type, mode, gutter, className, imgClass, style, logoWidth } = props
    const { largeLogo, smallLogo, themeLargeLogo, themeSmallLogo } =
        useSelector((state) => state.locale)
    return (
        <div
            className={classNames('logo', className, gutter)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            {largeLogo && type === 'full' && mode === 'light' ? (
                <img
                    className={imgClass}
                    src={`${appConfig.apiPrefix}/media/uniqid/${largeLogo}`}
                    alt="large logo"
                />
            ) : smallLogo && type === 'streamline' && mode === 'light' ? (
                <img
                    className={imgClass}
                    src={`${appConfig.apiPrefix}/media/uniqid/${smallLogo}`}
                    alt="small logo"
                />
            ) : themeLargeLogo && type === 'full' && mode === 'dark' ? (
                <img
                    className={imgClass}
                    src={`${appConfig.apiPrefix}/media/uniqid/${themeLargeLogo}`}
                    alt="small logo"
                />
            ) : themeLargeLogo && type === 'full' && mode === 'dark' ? (
                <img
                    className={imgClass}
                    src={`${appConfig.apiPrefix}/media/uniqid/${themeLargeLogo}`}
                    alt="small logo"
                />
            ) : themeSmallLogo && type === 'streamline' && mode === 'dark' ? (
                <img
                    className={imgClass}
                    src={`${appConfig.apiPrefix}/media/uniqid/${themeSmallLogo}`}
                    alt="small logo"
                />
            ) : (
                <img
                    className={imgClass}
                    src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                    alt={`${APP_NAME} logo`}
                />
            )}
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: 'auto',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
